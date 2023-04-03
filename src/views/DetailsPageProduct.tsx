import React, { useState, useEffect } from 'react'

import Search from '../components/Search'
import { useParams } from 'react-router-dom'
import { Breadcrumb } from 'rsuite'
import { UserIcon, AutoDefault } from '../assets/iconsAll'
import { config } from '../config'
import { timeBlockDefault } from '../const'

import { useAppDispatch, useAppSelector } from '../hook/redux'
import { addAsyncTransport } from '../store/action-creators/infoAuto'
import { GeneralInformation, ImageInformation } from '../models/IGeneral_information'

import Authorization from '../components/Authorization'

const DetailsPageProduct: React.FC = () => {
	const { id } = useParams()


	const [timeBlock, setTimeBlock] = useState(timeBlockDefault)

	const [dataFind, setDataFind] = useState<any>({})
	const currentAccessToken = window.sessionStorage.getItem('access_token')
	const [showValid, setShowValid] = useState(false)
	const [offerPrise, setOfferPrise] = useState('')
	const [currentClick, setCurrentClick] = useState<any>({})
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(20)

	const timeFuncSecond = () => {
		let a = timeBlock.second
		let timerSecond = setInterval(() => {
			if (timeBlock.day > 0) {
				if (a === 61) {
					a = 0
					setTimeBlock({ ...timeBlock, second: 60 })
				} else {
					setTimeBlock({ ...timeBlock, second: 60 - a++ })
				}
			} else {
				clearInterval(timerSecond)
				setTimeBlock({ second: 0, minute: 0, hours: 0, day: 0 })
			}
		}, 1000)
	}

	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(addAsyncTransport(page, limit))
	}, [])

	const { general_information } = useAppSelector((state) => state.toolkitSliceData)
	useEffect(() => {
		if (general_information.length > 0) {
			const findArray = general_information.find((el) => el.lot === id)

			if (findArray) {
				setCurrentClick(findArray.imageInformation[0])

				setDataFind(findArray)
			}
		}
	}, [general_information])

	const timeFuncMinute = () => {
		if (timeBlock.second === 0) {
			if (timeBlock.minute > 0) return setTimeBlock({ ...timeBlock, second: timeBlock.minute - 1 })
			else return setTimeBlock({ ...timeBlock, minute: 60 })
		} else {
			return null
		}
	}

	const timeFuncHours = () => {
		if (timeBlock.minute === 60 && timeBlock.second === 0) {
			if (timeBlock.hours > 0) return setTimeBlock({ ...timeBlock, hours: timeBlock.hours - 1 })
			else return setTimeBlock({ ...timeBlock, minute: 24 })
		} else {
			return null
		}
	}

	const timeFuncDay = () => {
		if (timeBlock.hours === 0) {
			if (timeBlock.day > 0) return setTimeBlock({ ...timeBlock, day: timeBlock.day - 1 })
		} else {
			return null
		}
	}

	useEffect(() => {
		timeFuncDay()
	}, [timeBlock.hours])

	useEffect(() => {
		timeFuncHours()
	}, [timeBlock.minute])

	useEffect(() => {
		timeFuncMinute()
	}, [timeBlock.second])

	useEffect(() => {
		timeFuncSecond()
	}, [])

	const viewContentFunc = (val: any) => {

		const dataAutoInfo = [
			{ title: 'Объем двигателя:', content: val.engine ? val.engine : '' },
			{
				title: 'Топливо:',
				content: val.transportFuel ? val.transportFuel.name : '',
			},
			{
				title: 'Привод:',
				content: val.transportDrive ? val.transportDrive.name : '',
			},
			{
				title: 'Тип КПП:',
				content: val.transportTransmission ? val.transportTransmission.name : '',
			},
			{ title: 'Пробег:', content: val.odometer ? val.odometer : '' },
			{ title: 'Ключи:', content: val.keys ? (val.keys ? 'да' : 'нет') : '' },

			{
				title: 'Состояние:',
				content: val.transportHighlight ? val.transportHighlight.name : '',
			},
			{
				title: 'Тип двигателя:',
				content: val.transportFuel ? val.transportFuel.name : '',
			},

			{ title: 'Год выпуска:', content: val.year ? val.year : '' },
			{ title: 'Порт погрузки', content: val.port ? val.port.name : '' },
			{ title: 'Комплектация:', content: val.equipment ? val.equipment : '' },
		]

		// const currentData = statusDrop ? dataAutoInfo : dataAutoInfo.slice(0, 8)
		const currentData = dataAutoInfo

		return currentData.map(
			(el) =>
				el.content && (
					<label key={el.title}>
						<span className='titleParams'>{el.title}</span>
						<span>{el.content}</span>
					</label>
				)
		)
	}

	const controlRhotoBlock = () => {
		const boolean: Boolean =
			dataFind.hasOwnProperty('imageInformation') && dataFind.imageInformation.length > 0

		const dataChange = (val: boolean) => setShowValid(val)
		return (
			<div className='partsOne'>
				<div className='mainPhoto'>
					<Authorization state={showValid} dataChange={dataChange} />
					<img
						src={
							currentClick && boolean
								? config.backRequestDoc + currentClick.image_path
								: AutoDefault
						}
						alt=''
					/>
				</div>

				{boolean && (
					<div className='detailsPhoto'>
						<ul>
							{dataFind.id &&
								dataFind.imageInformation.map((el: ImageInformation) => (
									<li key={el.id}>
										<img
											src={config.backRequestDoc + el.image_path}
											alt=''
											onClick={() => setCurrentClick(el)}
										/>
									</li>
								))}
						</ul>
					</div>
				)}
			</div>
		)
	}

	return (
		<React.Fragment>
			<Search />
			<div className='breadcrumb'>
				<Breadcrumb>
					<Breadcrumb.Item href='/'>Главная</Breadcrumb.Item>
					<Breadcrumb.Item active>{dataFind.transport_name}</Breadcrumb.Item>
				</Breadcrumb>
			</div>

			<div className='mainBlock'>
				<div className='innerDetails'>
					<div className='topPlace'>
						{controlRhotoBlock()}
						<div className='partsTwo'>
							<div className='groupInfoAutoTitle'>
								<p className='numberLot'>
									<span>Лот №</span>
									<span>{dataFind.lot}</span>
								</p>
								<h3>{dataFind.transport_name}</h3>
							</div>

							<div className='groupInfoAuto'>
								{dataFind.id && viewContentFunc(dataFind)}

								{/* <div className='dropContent' onClick={() => setStatusDrop(!statusDrop)}>
									<p>
										{statusDrop ? 'свернуть' : 'доп.информация'}

										<span>{statusDrop ? <ArrowUpLine /> : <ArrowDownLine />}</span>
									</p>
								</div> */}
							</div>
						</div>
					</div>
					<div className='bottomPlace'>
						<div className='partsThree'>
							<h2>Похожие лоты: </h2>

							<ul className='similarGroupAuto'>
								<li>
									<img src={AutoDefault} alt='' />
									<div className='titleInfo'>
										<p className='titileAuto'>Tesla Model 3 Standard Range</p>
										<p>от 68 000.00 BYN</p>
									</div>
								</li>
								<li>
									<img src={AutoDefault} alt='' />
									<div className='titleInfo'>
										<p className='titileAuto'>Tesla Model 3 Standard Range</p>
										<p>от 68 000.00 BYN</p>
									</div>
								</li>

								<li>
									<img src={AutoDefault} alt='' />
									<div className='titleInfo'>
										<p className='titileAuto'>Tesla Model 3 Standard Range</p>
										<p>от 68 000.00 BYN</p>
									</div>
								</li>
								<li>
									<img src={AutoDefault} alt='' />
									<div className='titleInfo'>
										<p className='titileAuto'>Tesla Model 3 Standard Range</p>
										<p>от 68 000.00 BYN</p>
									</div>
								</li>
							</ul>
						</div>
						<div className='partsFour'>
							<div className='offerPrise'>
								{!currentAccessToken && (
									<React.Fragment>
										<div className='partsElement'>
											<p>Для размещения ставки вам необходимо авторизоваться:</p>
											<button onClick={() => setShowValid(true)}>
												<span>
													<img src={UserIcon} alt='' />
													ВОЙТИ
												</span>
											</button>
										</div>
										<div className='lineParts' />
									</React.Fragment>
								)}

								<div className='partsElement'>
									<div className='groupBlockPrise'>
										<p className='invitePrise'>Начальная цена:</p>
										<span>от {dataFind.start_price} BYN</span>
										<p className='invitePrise'>шаг:</p>
										<span>от {dataFind.step_price} BYN</span>
										{currentAccessToken && (
											<div className='inputGroupPrise'>
												<p>Предложить свою ставку:</p>
												<div className='itemInput'>
													<div className='blockItem'>
														<div className='customInput'>
															<input
																value={offerPrise}
																onChange={(e) => {
																	let value = e.target.value
																	value = value.replace(/\D/gi, '')
																	return setOfferPrise(value)
																}}
															/>
															<span>BYN</span>
														</div>
													</div>

													<div className='blockItem'>
														<button>ПРЕДЛОЖИТЬ</button>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className='timeParts'>
								<p>Время окончания торгов:</p>
								<div className='viewTimeBlock'>
									<div className='itemPartsTime' style={{ marginRight: '40px' }}>
										<span>{timeBlock.day}</span>
										<span className='lowerTitle'>дней</span>
									</div>
									<div className='itemPartsTime'>
										<span>{timeBlock.hours}</span>
										<span className='lowerTitle'>часов</span>
									</div>
									<div className='pointHelp'>
										<div className='itemPoint'></div>
										<div className='itemPoint'></div>
									</div>
									<div className='itemPartsTime'>
										<span>{timeBlock.minute}</span>
										<span className='lowerTitle'>минут</span>
									</div>
									<div className='pointHelp'>
										<div className='itemPoint'></div>
										<div className='itemPoint'></div>
									</div>
									<div className='itemPartsTime'>
										<span>{timeBlock.second}</span>
										<span className='lowerTitle'>секунд</span>
									</div>
								</div>
							</div>
							<div className='timeParts timeParts--setting'>
								<div className='titleTop'>
									<p> Цена Buy it now</p>
									<div className='blockItem'>
										<div className='customInput'>
											<span>$</span>
											<span>{dataFind.now_price ? dataFind.now_price : 0}</span>
											<span> USD</span>
										</div>
									</div>
								</div>

								<div className='itemInput'>
									<div className='blockItem'>
										<button>ПРЕДЛОЖИТЬ</button>
									</div>
								</div>
							</div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}
export default DetailsPageProduct
