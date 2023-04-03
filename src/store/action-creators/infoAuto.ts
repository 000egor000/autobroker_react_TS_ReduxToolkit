import { getRequest, postRequest } from '../../base/api-request.js'
import {
  getTransportArray,
  // getFuelArray,
  // getTransmissionArray,
  // getDriveArray,
  // getHighlightArray,
  getFuelArray,
  getPagination,
  getLoaderStatus,
  getError,
} from '../reducers/toolkitSliceData'
import { getSearchData } from '../../store/reducers/toolkitSliceSearch'

const addAsyncTransport = (page: number, limit: number) => {
  return async (dispatch: any) => {
    dispatch(getLoaderStatus(true))
    getRequest(
      `/api/v1/order/transport-auto/sale?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          'access_token'
        )}`,
      }
    )
      .then((res) => {
        dispatch(getTransportArray(res.general_information))
        dispatch(getPagination(res.pagination))

        dispatch(getLoaderStatus(false))
        dispatch(getError(''))
      })

      .catch((err) => {
        dispatch(getError('Что-то пошло не так!'))
        dispatch(getTransportArray([]))
        // dispatch(getPagination({}))
        dispatch(getLoaderStatus(false))
      })
  }
}

const addAsyncFilterInfo = () => {
  return async (dispatch: any) => {
    dispatch(getLoaderStatus(true))
    getRequest(`/api/v1/order/transport-auto/filter`, {
      Authorization: `Bearer ${window.sessionStorage.getItem('access_token')}`,
    })
      .then((res) => {
        const { code, status, ...data } = res
        const {
          transportDrive,
          transportHighlight,
          transportTransmission,
          ...dataSearch
        } = data
        console.log(data)

        dispatch(getFuelArray(data))
        dispatch(getSearchData(dataSearch))

        dispatch(getLoaderStatus(false))
        dispatch(getError(''))
      })

      .catch((err) => {
        dispatch(getError('Что-то пошло не так!'))
        dispatch(getTransportArray([]))
        // dispatch(getPagination({}))
        dispatch(getLoaderStatus(false))
      })
  }
}

// const addAsyncFuels = () => {
//   return async (dispatch: any) => {
//     dispatch(getLoaderStatus(true))
//     getRequest(`/api/v1/transport-fuel`, {
//       Authorization: `Bearer ${window.sessionStorage.getItem('access_token')}`,
//     })
//       .then((res) => {
//         dispatch(getFuelArray(res.transportFuels))

//         dispatch(getLoaderStatus(false))
//         dispatch(getError(''))
//       })

//       .catch((err) => {
//         dispatch(getError('Что-то пошло не так!'))
//         dispatch(getLoaderStatus(false))
//       })
//   }
// }
// const addAsyncTransmission = () => {
//   return async (dispatch: any) => {
//     dispatch(getLoaderStatus(true))
//     getRequest(`/api/v1/transport-transmission`, {
//       Authorization: `Bearer ${window.sessionStorage.getItem('access_token')}`,
//     })
//       .then((res) => {
//         dispatch(getTransmissionArray(res.transportTransmissions))

//         dispatch(getLoaderStatus(false))
//         dispatch(getError(''))
//       })

//       .catch((err) => {
//         dispatch(getError('Что-то пошло не так!'))
//         dispatch(getLoaderStatus(false))
//       })
//   }
// }

// const addAsyncDrive = () => {
//   return async (dispatch: any) => {
//     dispatch(getLoaderStatus(true))
//     getRequest(`/api/v1/transport-drive`, {
//       Authorization: `Bearer ${window.sessionStorage.getItem('access_token')}`,
//     })
//       .then((res) => {
//         dispatch(getDriveArray(res.transportDrives))

//         dispatch(getLoaderStatus(false))
//         dispatch(getError(''))
//       })

//       .catch((err) => {
//         dispatch(getError('Что-то пошло не так!'))
//         dispatch(getLoaderStatus(false))
//       })
//   }
// }

// const addAsyncHighlight = () => {
//   return async (dispatch: any) => {
//     dispatch(getLoaderStatus(true))
//     getRequest(`/api/v1/transport-highlight`, {
//       Authorization: `Bearer ${window.sessionStorage.getItem('access_token')}`,
//     })
//       .then((res) => {
//         dispatch(getHighlightArray(res.transportHighlights))

//         dispatch(getLoaderStatus(false))
//         dispatch(getError(''))
//       })

//       .catch((err) => {
//         dispatch(getError('Что-то пошло не так!'))
//         dispatch(getLoaderStatus(false))
//       })
//   }
// }

const goAsyncToBackLink = () => {
  return async (dispatch: any) => {
    dispatch(getLoaderStatus(true))
    postRequest('/api/v1/user/logout')
      .then(() => {
        dispatch(getLoaderStatus(false))
        dispatch(getError(''))
        window.sessionStorage.clear()
        window.location.reload()
      })
      .catch(() => {
        dispatch(getLoaderStatus(false))
        dispatch(getError('Что-то пошло не так!'))
      })
  }
}

const getAsyncinfoUsers = (token: string | undefined) => {
  return async (dispatch: any) => {
    dispatch(getLoaderStatus(true))
    getRequest('/api/v1/user/information', {
      Authorization: `Bearer ${token}`,
    })
      .then((res) => {
        if (+res.user.active === 0) {
          window.sessionStorage.clear()
          dispatch(getLoaderStatus(false))
          dispatch(getError('Пользователь заблокирован!'))
        } else {
          window.sessionStorage.setItem('access_token', String(token))
          dispatch(getLoaderStatus(false))
          dispatch(getError(''))
        }
      })
      .catch(() => {
        dispatch(getError('Ошибка доступа!'))
        dispatch(getLoaderStatus(false))
      })
  }
}

const getAsyncinfoSearch = (token: any) => {
  return async (dispatch: any) => {
    dispatch(getLoaderStatus(true))
    postRequest('/api/v1/order/transport-auto/sale/search', {
      Authorization: `Bearer ${token}`,
      ...token,
    })
      .then((res) => {
        dispatch(getLoaderStatus(false))
        dispatch(getTransportArray(res.general_information))
        dispatch(getPagination(res.pagination))

        dispatch(getError(''))
      })
      .catch(() => {
        dispatch(getLoaderStatus(false))
        dispatch(getTransportArray([]))
      })
  }
}

type logInTokensParamsType = {
  token_type: string
  expires_in: string
  refresh_token: string
  access_token: string
}
const logInTokens = ({
  token_type,
  expires_in,
  refresh_token,
  access_token,
}: logInTokensParamsType) => {
  window.sessionStorage.setItem('token_type', token_type)
  window.sessionStorage.setItem('expires_in', expires_in)
  window.sessionStorage.setItem('refresh_token', refresh_token)
  window.sessionStorage.setItem('access_token', access_token)
  document.cookie = `access_token = ${access_token};`
}
type AutorizationParamsType = {
  username: string | number
  password: string | number
}
const autorizationAsync = (params: AutorizationParamsType) => {
  return async (dispatch: any) => {
    dispatch(getLoaderStatus(true))
    postRequest('/api/v1/user/login', params)
      .then((res) => {
        logInTokens(res)
        dispatch(getLoaderStatus(false))
        dispatch(getError(''))
      })
      .catch((err) => {
        dispatch(getLoaderStatus(false))
        dispatch(getError('Что-то пошло не так c авторизацией!'))
        dispatch(getError(''))
      })
  }
}
export {
  addAsyncTransport,
  // addAsyncFuels,
  // addAsyncTransmission,
  // addAsyncDrive,
  // addAsyncHighlight,
  addAsyncFilterInfo,
  autorizationAsync,
  goAsyncToBackLink,
  getAsyncinfoUsers,
  getAsyncinfoSearch,
}
