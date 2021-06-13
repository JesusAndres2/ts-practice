import PagerDS from "../data-services/pager";
import EscalationPolicyDS from "../data-services/escalation-policy";
import Pager from "../model/pager";
import EscalationPolicy from "../model/escalation-policy";
import Target from "../model/target";
import NotificationsService from "../notifications";

/**
 * For a given service, handle an Healthy event.
 * If service is healthy, do nothing.
 * If service is unhealthy: 
 *      - Set healthy and unAck
 *      - Set EP to level 0 
 * @param serviceId 
 * @returns 
 */
const handleHealthyEvent = (serviceId: number) => new Promise((resolve, reject) => {
    const pagerDS = new PagerDS();
    pagerDS.getPager(serviceId).then((pagerFound: Pager) => {
        if (pagerFound.getIsHealthy()) {
            // Service alredy healthy.
            resolve(true);
        }
        const escalationPolicyDS = new EscalationPolicyDS();
        const promises = [
            pagerDS.writePager(new Pager(serviceId, true, false)),
            escalationPolicyDS.getEscalationPolicy(serviceId)
        ];
        // TODO: No se como declarar respuestas sin el Any[]
        Promise.all(promises).then((results: any[]) => {
            const ep: EscalationPolicy = results[1];
            ep.setLastLevel(null);
            escalationPolicyDS.writeEscalationPolicy(ep).then(() => resolve(true)).catch(err => reject(err));
        }).catch(error => {
            // Error wrting/reading Pager, Ep
            reject(error)
        });
    }).catch(error => {
        // error fetching pager
        reject(error);
    });
});

/**
 * For a given service, handle an UnHealthy event.
 * If service is unhealthy, do nothing.
 * If service is healthy: 
 *      - Set unhealthy and unAck
 *      - Set EP to next level 
 * @param serviceId 
 * @returns 
 */
const handleUnHealthyEvent = (serviceId: number) => new Promise((resolve, reject) => {
    const pagerDS = new PagerDS();
    pagerDS.getPager(serviceId).then((pagerFound: Pager) => {
        if (!pagerFound.getIsHealthy()) {
            // Service alredy healthy.
            resolve(true);
        }
        const escalationPolicyDS = new EscalationPolicyDS();
        escalationPolicyDS.getEscalationPolicy(serviceId).then((ep: EscalationPolicy) => {
            ep.setNextEscalationPolicy();
            const lastLevel: Target = ep.getLastLevel();
            const nt = new NotificationsService();
            const promises = [];
            if (lastLevel.getEmail()) {
                // Notification by email
                promises.push(nt.sendEmail({ serviceId, payload: lastLevel.getEmail() }));
            } else if (lastLevel.getPhone()) {
                // else is SMS
                promises.push(nt.sendSMS({ serviceId, payload: lastLevel.getPhone() }));
            }
            promises.push(nt.sendTimerSignal({ serviceId }));
            // set service unhealthy
            promises.push(pagerDS.writePager(new Pager(serviceId, false, false)));
            // set last, the write next level
            promises.push(escalationPolicyDS.writeEscalationPolicy(ep));
            Promise.all(promises).then(() => resolve(true)).catch(err => reject(err));
        }).catch(error => reject(error));
    }).catch(error => {
        // error fetching pager.
        reject(error);
    });
});

export default {
    handleHealthyEvent,
    handleUnHealthyEvent
}