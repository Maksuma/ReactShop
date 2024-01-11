/* eslint-disable no-unused-vars */
import { useAutoAnimate } from '@formkit/auto-animate/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CardList from './CardList'
import Drawer from './Drawer'
import Header from './Header'

export default function Body() {
	const [data, setData] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [cartOpened, setCartOpened] = useState(false)
	const [sortBy, setSortBy] = useState('title')
	const [searchValue, setSearchValue] = useState('')
	const [animationParent] = useAutoAnimate()

	const fetchFavorites = async () => {
		try {
			const res = await axios.get(
				'https://35bd06a011b4a137.mokky.dev/Favorites'
			)
			setData(res.data)
		} catch (err) {
			console.error(err)
		}
	}

	const onChangeSelect = e => {
		setSortBy(e.target.value)
	}

	const addToCartItem = async obj => {
		try {
			if (cartItems.find(item => item.id === obj.id)) {
				setCartItems(prev => prev.filter(item => item.id !== obj.id))
			} else {
				// const res = await axios.post('/cart', obj)
				setCartItems(prev => [...prev, obj])
			}
		} catch (err) {
			console.error(err)
		}
	}

	const removeFromCartItem = async obj => {
		try {
			// const res = await axios.delete('/cart', {
			// 	params: {
			// 		id: obj.id,
			// 	},
			// })
			setCartItems(prev => prev.filter(item => item.id !== obj.id))
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		const getFetch = async () => {
			try {
				const params = {
					sortBy: sortBy,
				}

				if (searchValue) {
					params.title = `*${searchValue}*`
				}

				const res = await axios.get(
					`https://35bd06a011b4a137.mokky.dev/items`,
					{
						params,
					}
				)
				setData(res.data)
			} catch (err) {
				console.error(err)
			}
		}
		getFetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortBy, searchValue])

	return (
		<>
			{cartOpened && (
				<Drawer
					cartItems={cartItems}
					onClose={() => setCartOpened(false)}
					removeFromCartItem={removeFromCartItem}
				/>
			)}
			<div className='bg-white w-4/5 m-auto mt-14 shadow-xl rounded-xl'>
				<Header onOpen={() => setCartOpened(true)} />
				<div className='p-10'>
					<div className='flex justify-between items-center'>
						<h2 className='text-3xl font-bold mb-8'>Все кроссовки</h2>
						<div className='flex gap-4'>
							<div className='relative items-center'>
								<img
									src='/search.svg'
									alt='search'
									className='absolute left-4 top-3'
								/>
								<input
									value={searchValue}
									type='text'
									className='border rounded-md outline-none focus:border-gray-400 py-2 pl-11 pr-4'
									placeholder='Поиск...'
									onInput={e => setSearchValue(e.target.value)}
								/>
								{searchValue && (
									<img
										src='/close.svg'
										alt='Close'
										className='absolute top-[5px] right-2'
										onClick={() => setSearchValue('')}
									/>
								)}
							</div>
							<select
								className='py-2 px-3 border outline-none rounded-md'
								onChange={onChangeSelect}
							>
								<option value={'name'}>По названию</option>
								<option value={'price'}>По цене(меньше)</option>
								<option value={'-price'}>По цене(больше)</option>
							</select>
						</div>
					</div>
					<CardList
						cartItems={cartItems}
						animationParent={animationParent}
						addToCartItem={addToCartItem}
						items={data}
					/>
				</div>
			</div>
		</>
	)
}
