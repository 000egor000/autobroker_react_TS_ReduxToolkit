import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { year } from '../../const'

type SearchType = {
  body: Array<number | string>
  brand: Array<number | string>
  transportFuel: Array<number | string>
  year: Array<number | string>
  transportTransmission: Array<number | string>
  engine: Array<number | string>
  odometer: Array<number | string>
  transportDrive: Array<number | string>
  transportHighlight: Array<number | string>
  keys: boolean | string
  search: string
}

type InitialInnerType = {
  search: SearchType
}

const initialState: InitialInnerType = {
  search: {
    body: [],
    brand: [],
    transportFuel: [],
    year: [],
    transportTransmission: [],
    engine: [],
    odometer: [],
    transportDrive: [],
    transportHighlight: [],
    keys: '',
    search: '',
  },
}

const toolkitSlice = createSlice({
  name: 'toolkitSliceData',
  initialState,
  reducers: {
    getSearchData(state, actions: PayloadAction<SearchType>) {
      state.search = actions.payload
    },
  },
})
export default toolkitSlice.reducer
export const { getSearchData } = toolkitSlice.actions
