import { AxiosInstance } from 'axios';

/**
 * Abstract class that contains the Axios instance.
 *
 * Api sections all inherit from this class.
 */
export default abstract class AApiSection {
  axios:AxiosInstance;
  protected constructor(axiosInstance:AxiosInstance) {
    this.axios=axiosInstance;
  }
}
