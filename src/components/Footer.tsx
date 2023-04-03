import React from 'react'
import { dataLinkInfo, year } from '../const'
import { dataImgGroup } from '../assets/iconsAll'

const Footer: React.FC = () => {
  return (
    <div className="footerItem">
      <div className="footer-inner">
        <div className="itemFotter">
          <div className="groupTitle">
            <div className="leftPlace">
              <span style={{ margin: '0 5px' }}>{year}</span>
              <span>Company name Все права защищены</span>
            </div>
            <div className="rightPlace">
              <span>LOGO</span>
            </div>
          </div>
        </div>
        <div className="itemFotter">
          <ul className="groupPayIcon">
            {dataImgGroup.map((el) => (
              <li key={el}>
                <img src={el} alt="icons" />
              </li>
            ))}
          </ul>
        </div>
        <div className="itemFotter">
          <ul className="groupLink">
            {dataLinkInfo.map((el) => (
              <li key={el.title}>
                <span>{el.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Footer
