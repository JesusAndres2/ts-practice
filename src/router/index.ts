import * as R from "ramda";
import PagerRouter from "./pager";
import TargetRouter from  "./target";
import IncomingEvent from "../model/incoming-event";


/**
 * Figure out event and allocate it with its handler
 * 
 * @param {IncomingEvent} event
 * @returns 
 *  services responses
 */
export default async (event: IncomingEvent) => {
    console.info(`Looking for a router handler for event: ${event.route} ${event.action} ${event.serviceId} ${event.payload ? ` and payload: ${event.payload}` : ""}`);
    const allRoutes = [...PagerRouter, ...TargetRouter];

    const routeFound = R.find(
        ({ route, action }) => route === event.route && action === event.action
    )(allRoutes);

    if (!routeFound) {
        console.error("No route match");
        throw new Error("No matching route");
    }
    console.info(`Route handler found for serviceId ${event.serviceId}. Executing it`)

    return routeFound.handler(event);
};
