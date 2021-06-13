import vars from "../config/vars"
import IncomingEvent from "../model/incoming-event";
import PagerService from "../services/pager";
export default [
    {
        route: `${vars.incomingRoutes.pager}`,
        action: `${vars.incomingActions.setHealthy}`,
        handler: async (event: IncomingEvent) => {
            try {
                const { serviceId } = event;
                console.info(`Setting service: ${serviceId} healthy`);
                await PagerService.handleHealthyEvent(serviceId);
                console.info(`Set service: ${serviceId} healthy`);
                return true;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }, {
        route: `${vars.incomingRoutes.pager}`,
        action: `${vars.incomingActions.setUnHealthy}`,
        handler: async (event: IncomingEvent) => {
            try {
                const { serviceId } = event;
                console.info(`Setting service: ${serviceId} to unhealthy`);
                await PagerService.handleUnHealthyEvent(serviceId);
                console.info(`Set service: ${serviceId} to unhealthy`);
                return true;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }]