import AApiSection from './AApiSection';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Node } from '../store/nodes';

export default class VariablesApi extends AApiSection {
  constructor(axios:AxiosInstance) {super(axios);}

  /**
   * Returns all variable data.
   * @return {Promise<Node[]>}
   */

  async find(): Promise<Node[]> {
    const response: AxiosResponse<Node[]> = await this.axios.get("/nodes");
    return response.data;
  }

}
