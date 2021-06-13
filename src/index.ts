import IncomingEvent from "./model/incoming-event";
import Router from "./router";

/**
 * Entry point
 */
export default async (event: IncomingEvent) => {
    try {
        await Router(event);
    } catch (error) {
        console.error(`Error handling incoming event: ${event.action} ${event.route} ${event.serviceId}`);
    }
}