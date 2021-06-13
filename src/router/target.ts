import vars from "../config/vars"
import IncomingEvent from "../model/incoming-event";
import TargetService from "../services/target";
export default [
    {
        route: `${vars.incomingRoutes.target}`,
        action: `${vars.incomingActions.ack}`,
        handler: async (event: IncomingEvent) => {
            try {
                const { serviceId } = event;
                console.info(`Received ACK of EP for service: ${serviceId}`);
                await TargetService.handleAck(serviceId);
                console.info(`Processed ACK of EP for service: ${serviceId}`);
                return true;
            } catch (error) {
                throw error;
            }
        }
    }, {
        route: `${vars.incomingRoutes.target}`,
        action: `${vars.incomingActions.timeout}`,
        handler: async (event: IncomingEvent) => {
            try {
                const { serviceId } = event;
                console.info(`Received EP timeout for service: ${serviceId}`);
                await TargetService.handleTimeout(serviceId);
                console.info(`Processed EP timeout for service: ${serviceId}`);
                return true;
            } catch (error) {
                throw error;
            }
        }
    }]