import apiClient from "./apiClient";

export function post({ url, params, onSuccess, onError }) {
    apiClient
      .post(url, params)
      .then((result) =>
        onSuccess ? onSuccess(result.data) : console.debug(result.data)
      )
      .catch((error) => (onError ? onError(error) : console.error(error)));
  }
  
export function get({ url, query, onSuccess, onError }) {
    apiClient
      .get(url, query)
      .then((result) =>
        onSuccess ? onSuccess(result.data) : console.debug(result.data)
      )
      .catch((error) => (onError ? onError(error) : console.error(error)));
  }
  