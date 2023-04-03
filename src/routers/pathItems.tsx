import DetailsPageProduct from '../views/DetailsPageProduct'
import MainPage from '../views/MainPage'
import NamePath from './namePath'

const pathItems = [
	{ path: NamePath.DEFAULT, element: <MainPage /> },
	{
		path: NamePath.DETAILS_ID,
		element: <DetailsPageProduct />,
	},
	{
		path: NamePath.AUTH_DATA_TOKEN,
		element: <MainPage />,
	},
]
export { pathItems }
