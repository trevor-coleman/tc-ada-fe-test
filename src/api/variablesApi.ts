import AApiSection from './AApiSection';
import { AxiosInstance, AxiosResponse } from 'axios';
import { DbNode } from '../store/nodes';

export default class VariablesApi extends AApiSection {
  constructor(axios:AxiosInstance) {super(axios);}

  /**
   * Returns all variable data.
   * @return {Promise<DbNode[]>}
   */

  async find(): Promise<DbNode[]> {
    const response: AxiosResponse<DbNode[]> = await this.axios.get("/nodes");
    return response.data;
  }

}
