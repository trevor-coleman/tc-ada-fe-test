export enum ApiRequestStatus {
  Idle,
  Pending,
  Fulfilled,
  Rejected,
}

export interface ApiRequestInfo {
  status: ApiRequestStatus,
  message: string|null,
  id: string|null,
}

export const FulfilledApiRequest:ApiRequestInfo = {
  status:ApiRequestStatus.Fulfilled,
  message: null,
  id: null,
}
