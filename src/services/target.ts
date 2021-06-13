import PagerDS from "../data-services/pager";
import EscalationPolicyDS from "../data-services/escalation-policy";
import Pager from "../model/pager";
import EscalationPolicy from "../model/escalation-policy";
import Target from "../model/target";
import NotificationsService from "../notifications";

/**
 * Handle ack for a given service.
 * If Pager is healthy, do nothing
 * If pager is Unhealthy but ack: do nothing.
 * If pager is Unhealthy and unAck:
 *      - Update pager and set Ack to true
 * @param serviceId 
 * @returns 
 */
const handleAck = (serviceId: number) =>
    new Promise((resolve, reject) => {
        const pagerDS = new PagerDS();
        pagerDS.getPager(serviceId).then((pagerFound: Pager) => {
            if (pagerFound.getIsHealthy() || pagerFound.getAlertAcknowledged()) {
                // Service alredy healthy or alert Acknowledged
                resolve(true);
            }
            pagerDS.writePager(new Pager(pagerFound.getId(), pagerFound.getIsHealthy(), true)).then(() => resolve(true)).catch(error => reject(error));
        }).catch(error => {
            // error fetching pager.
            reject(error);
        });
    });

/**
 * For a given service, handle timeout.
 * If service is Healthy or Ack, do nothing.
 * Else:
 *  - set next EP
 *  - Send notifications
 * @param serviceId 
 * @returns 
 */
const handleTimeout = (serviceId: number) =>
    new Promise((resolve, reject) => {
        const pagerDS = new PagerDS();
        pagerDS.getPager(serviceId).then((pagerFound: Pager) => {
            if (pagerFound.getIsHealthy() || pagerFound.getAlertAcknowledged()) {
                // Service alredy healthy or alert Acknowledged
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
                promises.push(nt.sendTimerSignal({serviceId}));
                // set last, the write next level
                promises.push(escalationPolicyDS.writeEscalationPolicy(ep));
                Promise.all(promises).then(() => resolve(true)).catch(err => reject(err))

            }).catch(error => {
                // error fetching EP
                reject(error);
            })
        }).catch(error => {
            // error fetching pager.
            reject(error);
        });
    });

export default {
    handleAck,
    handleTimeout
};