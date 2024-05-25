import apiClient from "./apiClient";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

function post({ url, params, onSuccess, onError }) {
  apiClient
    .post(url, params)
    .then((result) =>
      onSuccess ? onSuccess(result.data) : console.debug(result.data)
    )
    .catch((error) => (onError ? onError(error) : console.error(error)));
}

function get({ url, query, onSuccess, onError }) {
  apiClient
    .get(url, query)
    .then((result) =>
      onSuccess ? onSuccess(result.data) : console.debug(result.data)
    )
    .catch((error) => (onError ? onError(error) : console.error(error)));
}

export function onFetchItemsLoad({ onSuccess }) {
  get({ url: "/todo-item/all", onSuccess });
}

export function onSubmitItemAdd({ item, onSuccess, onError }) {
  post({ url: "/todo-item/new", params: item, onSuccess, onError });
}

export function onSubmitItemChange({ item, onSuccess, onError }) {
  post({ url: "/todo-item/update", params: item, onSuccess, onError });
}

export function onSubmitItemDelete({ item, onSuccess, onError }) {
  console.debug("item delete");
  post({ url: "/todo-item/delete", params: item, onSuccess, onError });
}
