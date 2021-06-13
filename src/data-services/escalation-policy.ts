import HttpClient from "../config/http-client-interceptors";
import vars from "../config/vars";
import EscalationPolicy from '../model/escalation-policy';

/**
 * Data Service for an Escalation Policy
 */
class EscalationPolicyDS extends HttpClient {
  public constructor() {
    super(vars.baseUrls.dataServices);
  }

  /**
   * Get an escalation policy for a given id
   * @param serviceId 
   * @returns EscalationPolicy
   */
  public getEscalationPolicy = async (serviceId: number) => this.instance.get<EscalationPolicy>(`${vars.dataServicePaths.escalationPolicy}/${serviceId}`);
  
  /**
   * Update an escalation policy
   * @param policy: EscalationPolicy
   * @returns EscalationPolicy
   */
  public writeEscalationPolicy = async (policy: EscalationPolicy) => this.instance.post(`${vars.dataServicePaths.escalationPolicy}`, policy);
}

export default EscalationPolicyDS;
