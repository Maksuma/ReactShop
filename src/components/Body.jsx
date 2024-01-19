import { useContext } from 'react'
import { AppContext } from '../App'
import CardList from './CardList'

export default function Body() {
	const state = useContext(AppContext)
	return (
		<>
			<div className='p-10'>
				<div className='flex flex-col flex-wrap lg:flex-row justify-between items-center mb-8'>
					<h2 className='text-3xl font-bold mb-8 lg:mb-0'>Все кроссовки</h2>
					<div className='flex flex-wrap flex-col md:flex-row gap-4'>
						<div className='relative items-center'>
							<img
								src='/search.svg'
								alt='search'
								className='absolute left-4 top-3'
							/>
							<input
								value={state.searchValue}
								type='text'
								className='border rounded-md outline-none focus:border-gray-400 py-2 pl-11 pr-4'
								placeholder='Поиск...'
								onInput={e => state.setSearchValue(e.target.value)}
							/>
							{state.searchValue && (
								<img
									src='/close.svg'
									alt='Close'
									className='absolute top-[5px] right-2'
									onClick={() => state.setSearchValue('')}
								/>
							)}
						</div>
						<select
							className='py-2 px-3 border outline-none rounded-md'
							onChange={state.onChangeSelect}
						>
							<option value={'name'}>По названию</option>
							<option value={'price'}>По цене(меньше)</option>
							<option value={'-price'}>По цене(больше)</option>
						</select>
					</div>
				</div>
				<CardList />
			</div>
		</>
	)
}
