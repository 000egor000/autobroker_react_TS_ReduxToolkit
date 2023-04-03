import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'

import namePath from './namePath'
import {pathItems} from './pathItems'

function RoutesItem() {
	return (
		<Routes>
			<Route path={namePath.DEFAULT} element={<Layout />}>
				{pathItems.map(({ element, path }:any) => (
					<Route key={element} path={path} element={element} />
				))}
			</Route>
		</Routes>
	)
}

export default RoutesItem
