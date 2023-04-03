import React from 'react'

import { Pagination as PaginationValue } from '../models/IPagination'

type PaginationProp = {
	data: PaginationValue
	page: number
	changePage: Function
	limit: number
}

const Pagination: React.FC<PaginationProp> = ({ data, page, changePage, limit }) => {
	const { total_results, prev_page, next_page } = data
	let i = 1

	const searchLastPage = () => {
		if (i * limit < total_results) {
			i++
			searchLastPage()
		} else {
			return i
		}
		return i
	}

	return (
		<div className='paginationBlock' style={{ display: limit <= total_results ? 'flex' : 'none' }}>
			{prev_page && (
				<div
					className='backPag'
					onClick={() => {
						changePage(page - 1)
					}}
				>
					Предыдущая
				</div>
			)}

			<div className='numberLink'>
				<ul>
					{prev_page && <li onClick={() => changePage(page - 1)}>{page - 1}</li>}

					<li style={{ background: '#cedcff' }}>{page}</li>

					{next_page && (
						<React.Fragment>
							<li onClick={() => changePage(page + 1)}>{page + 1}</li>

							<div style={{ display: next_page === searchLastPage() ? 'none' : 'flex' }}>
								<li>...</li>
								<li onClick={() => changePage(searchLastPage())}>{searchLastPage()}</li>
							</div>
						</React.Fragment>
					)}
				</ul>
			</div>
			{next_page && (
				<div className='nextPag' onClick={() => changePage(page + 1)}>
					Cледующая
				</div>
			)}
		</div>
	)
}
export default Pagination
