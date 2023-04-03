import React from 'react'

import { Loop } from '../assets/iconsAll'
import styled from 'styled-components'
const Input = styled.input`
  max-width: 500px;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  margin: 10px 0;
  font-size: 16px;
  font-weight: 400;
  color: #949494;
  line-height: 18px;
  outline: none;
`

const Button = styled.button`
  border: none;
  color: inherit;
  position: absolute;
  right: 5px;
  padding: 10px;
  width: 40px;
  height: 40px;
  background-color: #e6ebff;
  cursor: pointer;
`

const Search: React.FC<any> = ({ changeValue, dataSearch, searchParams }) => {
  const searchRequest = (e: any) => {
    e.preventDefault()
    return e.keydown === 13 && searchParams()
  }



  return (
    <div className="SearchBlock">
      <div className="SearchInner">
        <div className="customInput">
          <form onSubmit={searchRequest}>
            <Input
              placeholder="Поиск"
              value={dataSearch ? dataSearch.search : ''}
              onChange={(e) =>
                changeValue({ ...dataSearch, search: e.target.value })
              }
            />
            <Button onClick={() => searchParams()}>
              <img src={Loop} alt="search" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Search
