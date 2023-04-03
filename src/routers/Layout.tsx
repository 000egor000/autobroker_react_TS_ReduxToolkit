import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Layout() {
	return (
		<div className='Layout'>
			<Header />

			<div className='Layout-inner'>
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}

export default Layout
