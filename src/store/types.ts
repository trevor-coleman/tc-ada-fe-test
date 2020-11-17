/**
 * Interface describing an object that holds information about an API Request.
 */
export interface ApiRequestInfo {
  status: ApiRequestStatus,
  message: string|null,
  id: string|null,
}

export enum ApiRequestStatus {
  Idle,
  Pending,
  Fulfilled,
  Rejected,
}

export const FulfilledApiRequest:ApiRequestInfo = {
  status:ApiRequestStatus.Fulfilled,
  message: null,
  id: null,
}

export const InitialApiRequest: ApiRequestInfo = {
  status: ApiRequestStatus.Idle,
  message: null,
  id: null,
}
