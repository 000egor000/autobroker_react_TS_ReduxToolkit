const dataValueFilter = [
	{
		id: 1,
		title: 'Кузов',
	},
	{
		id: 2,
		title: 'Марка',
	},
	{
		id: 3,
		title: 'Тип двигателя',
	},
	{
		id: 4,
		title: 'Год выпуска',
	},
	{
		id: 5,
		title: 'Тип КПП',
	},
	{
		id: 6,
		title: 'Объем двигателя',
	},
	{
		id: 7,
		title: 'Пробег',
	},
	{
		id: 8,
		title: 'Привод',
	},
	{
		id: 9,
		title: 'Состояние',
	},
	{
		id: 10,
		title: 'Ключи',
	},
]
const dataLinkInfo = [
	{ title: 'Реквизиты компании', link: '' },
	{ title: 'Пользовательское соглашение', link: '' },
	{ title: 'Положение о конфиденциальности', link: '' },
	{ title: 'Прейскурант', link: '' },
]

const dataParams = [
	{
		id: 1,
		title: 'client_secret',
		option: [
			{ id: 1, data: '4RHHhzfnwGIkW4LfJeB4a0ZUxEP1NarWDRZpTjXO' },
			{ id: 2, data: 'Wl7e9mmh0fynhhW5Uqy88yrHHmlqFgiF1ywgDgBK' },
		],
	},
	{
		id: 2,
		title: 'echo_key',
		option: [
			{ id: 1, data: '46bc884436548e12bb05' },
			{ id: 2, data: '8f07b6b68cba727124ea' },
		],
	},
	{
		id: 3,
		title: 'client_id',
		option: [
			{ id: 1, data: 2 },
			{ id: 2, data: 4 },
		],
	},
	{
		id: 4,
		title: 'backRequest',
		option: [
			{ id: 1, data: 'https://autoru.neonface.by' },
			{ id: 2, data: 'https://api.autobroker.by' },
		],
	},
	{
		id: 5,
		title: 'backRequestDoc',
		option: [
			{ id: 1, data: 'https://autoru.neonface.by/public' },
			{ id: 2, data: 'https://api.autobroker.by' },
		],
	},
]

const dataAccessRightsDefault = [
	{ id: 1, title: 'Тип двигателя', valId: [] },
	{ id: 2, title: 'Тип КПП', valId: [] },
	{ id: 3, title: 'Привод', valId: [] },
	{ id: 4, title: 'Состояние', valId: [] },
]

const dataValueKeysDefault = [
	{ id: 1, title: 'Да', status: false, value: true },
	{ id: 2, title: 'Нет', status: false, value: false },
]

const timeBlockDefault = {
	second: 0,
	minute: 10,
	hours: 10,
	day: 15,
}

let data = new Date()
let year = data.getFullYear()
export {
	dataValueFilter,
	dataLinkInfo,
	dataParams,
	year,
	dataAccessRightsDefault,
	dataValueKeysDefault,
	timeBlockDefault,
}
