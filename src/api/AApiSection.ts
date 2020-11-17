import { AxiosInstance } from 'axios';

/**
 * Abstract class that contains the Axios instance.
 */
export default abstract class AApiSection {
  axios:AxiosInstance;
  protected constructor(axiosInstance:AxiosInstance) {
    this.axios=axiosInstance;
  }
}
