import { getItemDetail, getItems } from "./itemsManager"

export const getDataForContext = (url, query) => {

  if(url.includes('/items/')) {
    return getItemDetail(url.replace('/items/', ''))
  } else if(url.includes('/items?')) {
    return getItems(query.search)
  } else {
    return Promise.resolve()
  }
}