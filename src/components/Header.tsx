import React, { useState } from 'react'
import { UserIcon } from '../assets/iconsAll'

import { Link } from 'react-router-dom'

import { goAsyncToBackLink } from '../store/action-creators/infoAuto'
import { useAppDispatch } from '../hook/redux'
import Authorization from '../components/Authorization'

const Header: React.FC = () => {
	const accessToken = window.sessionStorage.getItem('access_token')

	const dataTargetLink = `https://client.autobroker.by/auth_data/${sessionStorage.getItem(
		'access_token'
	)}`
	const dispatch = useAppDispatch()

	const [showValid, setShowValid] = useState(false)

	const controlUsersValid = () => {
		if (accessToken) {
			return (
				<a href={dataTargetLink} target='_blank' rel='noreferrer'>
					Вернуться в платформу
				</a>
			)
		} else {
			return <span>Войти</span>
		}
	}

	const controlLink = () => setShowValid(accessToken ? false : true)

	const dataChange = (val: boolean) => setShowValid(val)

	return (
		<div className='headerBlock'>
			<Authorization state={showValid} dataChange={dataChange} />

			<div className='innerHeader'>
				<div className='logoItem'>
					<Link to='/'>
						<span>LOGO</span>
					</Link>

					<h3>Аукцион автомобилей</h3>
				</div>
				<div className='infoItem'>
					<a className='phoneNumber' href='tel:+375 (29) 000-00-00'>
						+375 (29) 000-00-00
					</a>
					<div className='userElement' onClick={() => controlLink()}>
						<img className='iconUser' src={UserIcon} alt='' />
						<span className='entrance'>{controlUsersValid()}</span>
						{accessToken && <button onClick={() => dispatch(goAsyncToBackLink())}>Выход</button>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
