import HttpClient from "../config/http-client-interceptors";
import vars from "../config/vars";
import Pager from '../model/pager';

/**
 * Data Service for a pager
 */
class PagerDS extends HttpClient {
  public constructor() {
    super(vars.baseUrls.dataServices);
  }

  /**
   * get a pager for a given id
   * @param serviceId: number
   * @returns Pager
   */
  public getPager = async (serviceId: number) => this.instance.get<Pager>(`${vars.dataServicePaths.pager}/${serviceId}`);
  
  /**
   * Updates a Pager
   * @param service: Pager
   * @returns Pager
   */
  public writePager = async (service: Pager) => this.instance.post(`${vars.dataServicePaths.pager}`, service);
}

export default PagerDS;
