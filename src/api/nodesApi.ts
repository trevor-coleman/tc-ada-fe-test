import { Node } from '../store/nodes';
import { AxiosResponse, AxiosInstance } from 'axios';
import AApiSection from './AApiSection';

export default class NodesApi extends AApiSection{
  constructor(axios: AxiosInstance) {super(axios);}

  /**
   * Returns a shallow list of nodes suitable for display in the sidebar.
   * Throws an error if the call was unsuccessful.
   * @return {Promise<Node[]>}
   */
  async find(): Promise<Node[]> {
    const response: AxiosResponse<Node[]> = await this.axios.get("/nodes");
    return response.data;
  }

  /**
   * Gets node with specified id.
   *  - Returns array with single member.
   *  - Returns empty array if no match.
   * Throws an error if the call was unsuccessful.
   * @param {string} id
   * @return {Promise<Node>}
   */
  async findById(id: string): Promise<Node[]> {
    const response: AxiosResponse<Node[]> = await this.axios.get(`/nodes/${id}`);
    return response.data;
  }

  /**
   * Searches for nodes that match query.
   * - Returns an array of nodes matching the query.
   * - Returns an empty array if none match.
   * Throws an error if the call was unsuccessful.
   * @param {string} query
   * @return {Promise<Node[]>}
   */
  async search(query: string): Promise<Node[]> {
    const response: AxiosResponse<Node[]> = await this.axios.post("/nodes/search", {query});
    return response.data;
  }
}
