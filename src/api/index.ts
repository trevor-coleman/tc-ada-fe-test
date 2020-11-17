import NodesApi from './nodesApi';
import axios, { AxiosInstance } from 'axios';
import VariablesApi from './variablesApi';

/**
 * The API class handles all calls to the API. Axios instance is initialized
 * constructor and passed to each section on creation.
 */
export class Api {

  instance: AxiosInstance;
  nodes: NodesApi;
  variables: VariablesApi;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASEURL
    })
    this.nodes =  new NodesApi(this.instance);
    this.variables = new VariablesApi(this.instance);
  }
}

const api = new Api();

export default api;
