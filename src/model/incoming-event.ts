/**
 * Represents the incoming event interface.
 * 4 possible values:
 * 1 - Set ACK from Web
 * 2 - Set Pager service Healthy from web
 * 3 - Set Alarm from Monitoring
 * 4 - Timeout from timer event
 */
export default interface IncomingEvent {
    serviceId: number,
    route: string,
    action: string,
    payload?: string | null
};