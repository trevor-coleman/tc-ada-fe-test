import { AxiosInstance } from 'axios';

export default abstract class AApiSection {
  axios:AxiosInstance;
  protected constructor(axiosInstance:AxiosInstance) {
    this.axios=axiosInstance;
  }
}
