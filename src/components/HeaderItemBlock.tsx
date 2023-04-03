import React, { useEffect, useState } from 'react'
import { ArrowDownLine, ArrowUpLine } from '@rsuite/icons'
import { useAppSelector } from '../hook/redux'
import { RangeSlider, InputNumber, InputGroup } from 'rsuite'
import {
  dataValueFilter,
  year,
  dataAccessRightsDefault,
  dataValueKeysDefault,
} from '../const'
import 'rsuite/dist/rsuite.min.css'

const HeaderItemBlock: React.FC<any> = ({
  changeValue,
  dataSearch,
  dataStorage,
  searchParams,
}) => {
  type DataAccessRightsType = {
    id: number
    title: string
    valId: Array<number>
  }
  type DataValueType = {
    id: number
    title: string
    status: any
    value: boolean
  }
  type isCheckedValue = {
    id: number
    title: string
  }

  type controlBlockType = {
    id: number
    title: string
  }

  type handleAccessRightsType = {
    title: string
    id: number
  }

  const [currentClickId, setCurrentClickId] = useState<number[]>([])
  const [dataAccessRights, setDataAccessRights] = useState<
    DataAccessRightsType[]
  >(dataAccessRightsDefault)

  const [dataValueKeys, setDataValueKeys] =
    useState<DataValueType[]>(dataValueKeysDefault)

  const { initialTitile } = useAppSelector((state) => state.toolkitSliceData)

  useEffect(() => {
    const initialValue = JSON.parse(dataStorage)

    const statusValue = (val: string): any => {
      switch (val) {
        case 'fist':
          return initialValue.keys[0] === true || initialValue.keys[0] === ''
            ? true
            : false

        case 'second':
          return initialValue.keys[0] === false || initialValue.keys[0] === ''
            ? true
            : false

        default:
          return false
      }
    }

    if (initialValue) {
      setDataAccessRights([
        {
          id: 1,
          title: 'Тип двигателя',
          valId: initialValue.transportFuel,
        },
        {
          id: 2,
          title: 'Тип КПП',
          valId: initialValue.transportTransmission,
        },
        {
          id: 3,
          title: 'Привод',
          valId: initialValue.transportDrive,
        },
        {
          id: 4,
          title: 'Состояние',
          valId: initialValue.transportHighlight,
        },
      ])

      setDataValueKeys([
        {
          id: 1,
          title: 'Да',
          status: statusValue('fist'),
          value: true,
        },
        {
          id: 2,
          title: 'Нет',
          status: statusValue('second'),
          value: false,
        },
      ])
    }
  }, [dataStorage])

  const contolClickBlock = (val: number) =>
    currentClickId.includes(val)
      ? setCurrentClickId([])
      : setCurrentClickId([val])

  const dropBlockView = (val: number) =>
    currentClickId.includes(val) ? true : false

  const changeValueKeys = (id: number) => {
    let resultValue
    const res = dataValueKeys.map((el) =>
      el.id === id ? { ...el, status: !el.status } : el
    )

    const paramsChange = res.filter((el: any) => el.status === true)

    const resultEnd = (val: any) => {
      setDataValueKeys(res)
      changeValue(val)
      searchParams(val)
    }

    if (paramsChange.length > 0) {
      if (paramsChange.length === 2) {
        resultValue = { keys: [''] }
      } else {
        resultValue = { keys: [paramsChange[0].value] }
      }
    } else {
      resultValue = { keys: [null] }
    }
    resultEnd(resultValue)
  }

  const handleAccessRights = ({ title, id }: handleAccessRightsType) => {
    const findArray = dataAccessRights.find((el) => el.title === title)

    if (findArray) {
      let filtered = findArray.valId.filter((e: any) => +id === +e)
      const resultEnd = (val: any) => {
        const result = {
          transportFuel: val[0].valId,
          transportTransmission: val[1].valId,
          transportDrive: val[2].valId,
          transportHighlight: val[3].valId,
        }
        setDataAccessRights(val)
        changeValue(result)
        searchParams(result)
      }

      if (filtered.length > 0) {
        let removeAccessRights = findArray.valId.filter((e: any) => e !== id)
        const res = dataAccessRights.map((el: any) =>
          el.title === title ? { ...el, valId: removeAccessRights } : el
        )

        resultEnd(res)
      } else {
        const res = dataAccessRights.map((el: any) =>
          el.title === title ? { ...el, valId: [...findArray.valId, id] } : el
        )

        resultEnd(res)
      }
    }
  }

  const isChecked = ({ title, id }: isCheckedValue): boolean => {
    const findArray = dataAccessRights.find((el: any) => el.title === title)
    let filtered = []

    if (findArray) filtered = findArray.valId.filter((e: any) => e === id)

    let bool = filtered.length > 0 ? true : false
    return bool
  }

  const controlBlock = ({ id, title }: controlBlockType) => {
    switch (id) {
      case 1:
        return (
          <li>
            <label>
              <span className="titleCheck">{1}</span>
              <input type="checkbox" />
            </label>
          </li>
        )
      case 2:
        return (
          <li>
            <label>
              <span className="titleCheck">{1}</span>
              <input type="checkbox" />
            </label>
          </li>
        )
      case 3:
        return initialTitile.transportFuel.map((el: any) => (
          <li key={el.id}>
            <label>
              <span className="titleCheck">{el.name}</span>
              <input
                checked={isChecked({ title, id: +el.id })}
                value={el.id}
                type="checkbox"
                onChange={(e) => {
                  handleAccessRights({ title, id: +el.id })
                }}
              />
            </label>
          </li>
        ))
      case 4:
        return (
          <li>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', marginBottom: '10px' }}>
                <InputGroup size="sm">
                  <InputNumber
                    value={dataSearch.year[0]}
                    min={+dataSearch.year[0]}
                    max={+dataSearch.year[1]}
                    onChange={(value) => {
                      if (value >= 1917) {
                        const result = {
                          year: [+value, dataSearch.year[1]],
                        }
                        changeValue(result)
                        searchParams(result)
                      }
                    }}
                  />
                  <InputGroup.Addon style={{ textAlign: 'center' }}>
                    -
                  </InputGroup.Addon>
                  <InputNumber
                    value={dataSearch.year[1]}
                    min={+dataSearch.year[0]}
                    max={+dataSearch.year[1]}
                    onChange={(value) => {
                      if (year >= value) {
                        const result = {
                          year: [dataSearch.year[0], +value],
                        }
                        changeValue(result)
                        searchParams(result)
                      }
                    }}
                  />
                </InputGroup>
              </div>
              <div style={{ width: '100%' }}>
                <RangeSlider
                  onChange={(value) => changeValue({ year: value })}
                  value={dataSearch.year}
                  min={+dataSearch.year[0]}
                  step={1}
                  max={+dataSearch.year[1]}
                  progress
                  onChangeCommitted={(value) => searchParams({ year: value })}
                />
              </div>
            </label>
          </li>
        )
      case 5:
        return initialTitile.transportTransmission.map((el: any) => (
          <li key={el.id}>
            <label>
              <span className="titleCheck">{el.name}</span>
              <input
                checked={isChecked({ title, id: +el.id })}
                value={el.id}
                type="checkbox"
                onChange={(e) => {
                  handleAccessRights({ title, id: +el.id })
                }}
              />
            </label>
          </li>
        ))
      case 6:
        return (
          <li>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', marginBottom: '10px' }}>
                <InputGroup size="sm">
                  <InputNumber
                    value={+dataSearch.engine[0]}
                    min={+dataSearch.engine[0]}
                    max={+dataSearch.engine[1]}
                    onChange={(value) => {
                      if (value >= 0) {
                        const result = {
                          engine: [+value, +dataSearch.engine[1]],
                        }
                        changeValue(result)
                        searchParams(result)
                      }
                    }}
                  />
                  <InputGroup.Addon style={{ textAlign: 'center' }}>
                    -
                  </InputGroup.Addon>
                  <InputNumber
                    value={+dataSearch.engine[1]}
                    min={+dataSearch.engine[0]}
                    max={+dataSearch.engine[1]}
                    onChange={(value) => {
                      if (value <= 10000) {
                        const result = {
                          engine: [+dataSearch.engine[0], +value],
                        }
                        changeValue(result)
                        searchParams(result)
                      }
                    }}
                  />
                </InputGroup>
              </div>
              <div style={{ width: '100%' }}>
                <RangeSlider
                  onChange={(value) => changeValue({ engine: value })}
                  value={dataSearch.engine}
                  min={+dataSearch.engine[0]}
                  step={1}
                  max={+dataSearch.engine[1]}
                  progress
                  onChangeCommitted={(value) => searchParams({ engine: value })}
                />
              </div>
            </label>
          </li>
        )
      case 7:
        return (
          <li>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', marginBottom: '10px' }}>
                <InputGroup size="sm">
                  <InputNumber
                    value={dataSearch.odometer[0]}
                    min={+dataSearch.odometer[0]}
                    max={+dataSearch.odometer[1]}
                    onChange={(value) => {
                      if (value >= 0) {
                        const result = {
                          odometer: [+value, dataSearch.odometer[1]],
                        }
                        changeValue(result)
                        searchParams(result)
                      }
                    }}
                  />
                  <InputGroup.Addon style={{ textAlign: 'center' }}>
                    -
                  </InputGroup.Addon>
                  <InputNumber
                    value={dataSearch.odometer[1]}
                    min={+dataSearch.odometer[0]}
                    max={+dataSearch.odometer[1]}
                    onChange={(value) => {
                      if (value <= 10000) {
                        const result = {
                          odometer: [dataSearch.odometer[0], +value],
                        }
                        changeValue(result)
                        searchParams(result)
                      }
                    }}
                  />
                </InputGroup>
              </div>
              <div style={{ width: '100%' }}>
                <RangeSlider
                  onChange={(value) => changeValue({ odometer: value })}
                  value={dataSearch.odometer}
                  min={+dataSearch.odometer[0]}
                  step={1}
                  max={+dataSearch.odometer[1]}
                  progress
                  onChangeCommitted={(value) =>
                    searchParams({ odometer: value })
                  }
                />
              </div>
            </label>
          </li>
        )
      case 8:
        return initialTitile.transportDrive.map((el: any) => (
          <li key={el.id}>
            <label>
              <span className="titleCheck">{el.name}</span>
              <input
                checked={isChecked({ title, id: +el.id })}
                value={el.id}
                type="checkbox"
                onChange={(e) => {
                  handleAccessRights({ title, id: +el.id })
                }}
              />
            </label>
          </li>
        ))
      case 9:
        return initialTitile.transportHighlight.map((el: any) => (
          <li key={el.id}>
            <label>
              <span className="titleCheck">{el.name}</span>
              <input
                checked={isChecked({ title, id: +el.id })}
                value={el.id}
                type="checkbox"
                onChange={(e) => {
                  handleAccessRights({ title, id: +el.id })
                }}
              />
            </label>
          </li>
        ))
      case 10:
        return dataValueKeys.map((el) => {
          return (
            <li key={el.id}>
              <label>
                <span className="titleCheck">{el.title}</span>
                <input
                  checked={el.status}
                  type="checkbox"
                  onChange={() => {
                    changeValueKeys(el.id)
                  }}
                />
              </label>
            </li>
          )
        })
      default:
        return null
    }
  }
  return (
    <div className="headerItem">
      <div className="innerHeaderItem">
        {dataValueFilter.map((el) => {
          return (
            <ul className="groupTitleNum" key={el.id}>
              <li onClick={() => contolClickBlock(el.id)}>
                <span>{el.title}</span>
                <span>
                  {dropBlockView(el.id) ? <ArrowUpLine /> : <ArrowDownLine />}
                </span>
              </li>
              {dropBlockView(el.id) && (
                <ul className="dropBlock">
                  {controlBlock({ title: el.title, id: el.id })}
                </ul>
              )}
            </ul>
          )
        })}
      </div>
    </div>
  )
}
export default HeaderItemBlock
