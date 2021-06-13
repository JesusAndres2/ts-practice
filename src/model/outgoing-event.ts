/**
 * Represents the outgoing event interface.
 * 3 possible values:
 * 1 - Send Email
 * 2 - Send SMS
 * 3 - Send Timeout
 */
 export default interface OutgoingEvent {
    serviceId: number,
    payload?: string | null
};