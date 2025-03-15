import {get, post} from './util.tsx'

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
