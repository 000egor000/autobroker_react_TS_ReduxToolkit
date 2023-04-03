import React from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from '../config.js'
import { AutoDefault } from '../assets/iconsAll.js'
import { GeneralInformation } from '../models/IGeneral_information'


type ItemProductProp = {
  data: GeneralInformation
}

const ItemProduct: React.FC<ItemProductProp> = ({ data }) => {
  let navigate = useNavigate()
  const {
    transport_name,
    year,
    imageInformation,
    transportFuel,
    transportTransmission,
    engine,
    start_price,
    lot,
  } = data

  const pathSrs =
    imageInformation.length > 0
      ? config.backRequestDoc + imageInformation[0].image_path
      : AutoDefault



  return (
    <React.Fragment>
      <div
        className="ItemElementBlock"
        onClick={() => navigate(`/details/${lot}`)}
      >
        <div className="autoInfo">
          <div className="itemInfoAuto">
            <img
              src={pathSrs}
              alt={pathSrs ? transport_name : 'PhotoDefault'}
            />
          </div>
          <div className="itemInfoAuto">
            <div className="titleBrand">
              <p>{transport_name}</p>
              <span>{year} г.в., </span>
              <span>{transportFuel.name}, </span>
              <span>{transportTransmission.name}, </span>
              <span>{engine} </span>
            </div>

            <div className="priseBlock">
              <p>Начальная цена:</p>
              <span>от {start_price} BYN</span>
            </div>
          </div>
        </div>

        <div className="numberLot">
          <p>
            <span>Лот № </span>
            <span>{lot}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ItemProduct
