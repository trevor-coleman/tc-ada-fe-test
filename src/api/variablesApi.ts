import AApiSection from './AApiSection';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Variable } from '../store/variables';

export default class VariablesApi extends AApiSection {
  constructor(axios:AxiosInstance) {super(axios);}

  /**
   * Returns all variable data.
   * @return {Promise<Variable[]>}
   */

  async find(): Promise<Variable[]> {
    const response: AxiosResponse<Variable[]> = await this.axios.get("/variables");
    return response.data;
  }

}
