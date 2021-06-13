import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as R from "ramda";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> { }
}

abstract class HttpClient {
  // Protect instance. It can not be instantiated by this abstract class
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  /**
   * Destructure http response to data
   * @param param0 
   * @returns 
   */
  private _handleResponse = ({ data }: AxiosResponse) => data;

  /**
   * handle http errors
   * @param error 
   */
  protected _handleError = (error: any) => {
    if (error && R.hasPath(["response", "status"]) && R.hasPath(["response", "data", "errors"])) {
      console.error(
        `Error with axios interceptor. Response status: ${error.response.status} and reason: ${JSON.stringify(error.response.data.errors)}`
      );
    } else {
      console.error(
        `Unexpected Error with axios interceptor. Raw error stack trace: ${error}`
      );
    }
    Promise.reject(error)
  };
};

export default HttpClient;
