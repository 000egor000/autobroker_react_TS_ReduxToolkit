import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GeneralInformation } from '../../models/IGeneral_information'
import { TransportTransmission } from '../../models/ITransportTransmissions'

import { TransportDrive } from '../../models/ITransportDrives'
import { TransportFuel } from '../../models/ITransportFuel'
import { TransportHighlight } from '../../models/ITransportHighlight'

import { Pagination } from '../../models/IPagination'

type InitialInnerType = {
  general_information: GeneralInformation[]
  initialTitile: any
  pagination: Pagination
  usersInfo: {}
  loader: boolean
  error: string
}

const initialState: InitialInnerType = {
  general_information: [],
  initialTitile: {
    engine: [],
    keys: [],
    odometer: [],
    transportDrive: [],
    transportFuel: [],
    transportHighlight: [],
    transportTransmission: [],
    year: [],
  },

  pagination: { total_results: 0, page: 0 },
  usersInfo: {},
  loader: false,
  error: '',
}

const toolkitSlice = createSlice({
  name: 'toolkitSliceData',
  initialState,
  reducers: {
    getTransportArray(state, actions: PayloadAction<[]>) {
      state.general_information = actions.payload
    },
    getPagination(state, actions: PayloadAction<Pagination>) {
      state.pagination = actions.payload
    },
    getFuelArray(state, actions: PayloadAction<[]>) {
      state.initialTitile = actions.payload
    },

    getUsersUnfo(state, actions: PayloadAction<object>) {
      state.usersInfo = actions.payload
    },
    getLoaderStatus(state, actions: PayloadAction<boolean>) {
      state.loader = actions.payload
    },
    getError(state, actions: PayloadAction<string>) {
      state.error = actions.payload
    },
  },
})
export default toolkitSlice.reducer
export const {
  getTransportArray,
  getPagination,
  getUsersUnfo,
  getLoaderStatus,
  getError,
  getFuelArray,
} = toolkitSlice.actions
