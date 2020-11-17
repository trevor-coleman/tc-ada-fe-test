
import { AxiosResponse, AxiosInstance } from 'axios';
import AApiSection from './AApiSection';
import { DbNode } from '../store/nodes/types';

/**
 * Class containing methods for accessing the nodes api
 */
export default class NodesApi extends AApiSection{
  constructor(axios: AxiosInstance) {super(axios);}

  /**
   * Returns array of DbNodes nodes suitable for display in the sidebar.
   * Throws an error if the call was unsuccessful.
   * @return {Promise<DbNode[]>}
   */
  async find(): Promise<DbNode[]> {
    const response: AxiosResponse<DbNode[]> = await this.axios.get("/nodes");
    return response.data;
  }

  /**
   * Gets node with specified id.
   *  - Returns array with single member.
   *  - Returns empty array if no match.
   * Throws an error if the call was unsuccessful.
   * @param {string} id
   * @return {Promise<DbNode>}
   */
  async findById(id: number): Promise<DbNode[]> {
    const response: AxiosResponse<DbNode[]> = await this.axios.get(`/nodes/${id}`);
    return response.data;
  }

  /**
   * Searches for nodes that match query.
   * - Returns an array of nodes matching the query.
   * - Returns an empty array if none match.
   * Throws an error if the call was unsuccessful.
   * @param {string} query
   * @return {Promise<DbNode[]>}
   */
  async search(query: string): Promise<DbNode[]> {
    const response: AxiosResponse<DbNode[]> = await this.axios.post("/nodes/search", {query});
    return response.data;
  }
}
