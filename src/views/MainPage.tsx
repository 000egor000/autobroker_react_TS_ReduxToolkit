import HeaderItemBlock from '../components/HeaderItemBlock'
import Search from '../components/Search'
import ItemProduct from '../components/ItemProduct'
import Pagination from '../components/Pagination'
import { getRequest, postRequest } from '../base/api-request.js'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  addAsyncTransport,
  // addAsyncFuels,
  // addAsyncTransmission,
  // addAsyncDrive,
  // addAsyncHighlight,
  addAsyncFilterInfo,
  getAsyncinfoUsers,
  getAsyncinfoSearch,
} from '../store/action-creators/infoAuto'

import { getSearchData } from '../store/reducers/toolkitSliceSearch'

import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAppDispatch, useAppSelector } from '../hook/redux'

const MainPage: React.FC = () => {
  type ChangeValueType = {
    transportDrive: Array<number>
    transportFuel: Array<number>
    transportHighlightval: Array<number>
    transportTransmission: Array<number>
  }

  const { search } = useAppSelector((state) => state.toolkitSliceSearch)
  const { token } = useParams()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const currentUrl = window.location.pathname.split('/')[1]
  const dataStorage = window.sessionStorage.getItem('searchParams')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { general_information, pagination, error, initialTitile } =
    useAppSelector((state) => state.toolkitSliceData)
  console.log(search)

  useEffect(() => {
    dataStorage
      ? dispatch(getAsyncinfoSearch(JSON.parse(dataStorage)))
      : dispatch(addAsyncTransport(page, 20))
  }, [])

  useEffect(() => {
    dispatch(addAsyncFilterInfo())
  }, [dispatch])

  useEffect(() => {
    if (currentUrl === 'auth_data') {
      dispatch(getAsyncinfoUsers(token))
    }
    if (error !== 'Ошибка доступа!') navigate('/')
  }, [token, currentUrl, error])

  const changePage = (val: number, limit: number) => {
    setPage(val)
    dispatch(addAsyncTransport(val, limit))
  }
  const changeValue = (val: ChangeValueType) => {
    const resultParams = { ...search, ...val }
    window.sessionStorage.setItem('searchParams', JSON.stringify(resultParams))

    dispatch(getSearchData(resultParams))
  }

  const searchParams = (val: ChangeValueType) => {
    const resultParams = { ...search, ...val }
    dispatch(getAsyncinfoSearch(resultParams))
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Search
        dataSearch={search}
        changeValue={changeValue}
        searchParams={searchParams}
      />
      <div className="mainBlock">
        <div className="innerMain">
          <div className="leftItem">
            <HeaderItemBlock
              dataSearch={search}
              changeValue={changeValue}
              searchParams={searchParams}
              dataStorage={dataStorage}
            />
          </div>
          <div className="rightItem">
            {general_information.length > 0 ? (
              general_information.map((el) => (
                <React.Fragment key={el.id}>
                  <ItemProduct data={el} />
                </React.Fragment>
              ))
            ) : (
              <p style={{ textAlign: 'center', fontSize: '18px' }}>
                Нет данных!
              </p>
            )}

            <Pagination
              data={pagination}
              page={page}
              limit={limit}
              changePage={changePage}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default MainPage
