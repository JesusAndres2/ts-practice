import HttpClient from "../config/http-client-interceptors";
import OutgoingEvent from "../model/outgoing-event";
import vars from "../config/vars";

/**
 * Notifications middleware
 */
class NotificationsDS extends HttpClient {
  public constructor() {
    super(vars.baseUrls.notifications);
  }

  /**
   * Send sms notification
   * 
   * @param event: OutgoingEvent
   * @returns true if sent
   */
  public sendSMS = async (event: OutgoingEvent) => this.instance.put<boolean>(`${vars.notificationsPaths.sms}`, { id: event.serviceId, phone: event.payload });
  
  /**
   * Send email notification
   * 
   * @param event: OutgoingEvent
   * @returns true if sent
   */
  public sendEmail = async (event: OutgoingEvent) => this.instance.put<boolean>(`${vars.notificationsPaths.email}`, { id: event.serviceId, email: event.payload });;
  
  /**
   * Send timer notification
   * 
   * @param event: OutgoingEvent
   * @returns true if sent
   */
  public sendTimerSignal = async (event: OutgoingEvent) => this.instance.put<boolean>(`${vars.notificationsPaths.timer}/${event.serviceId}`);
}

export default NotificationsDS;
