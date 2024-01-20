import { useAutoAnimate } from '@formkit/auto-animate/react'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Body from './components/Body'
import Drawer from './components/Drawer'
import Favorites from './components/Favorites'
import Header from './components/Header'
export const AppContext = createContext({})
export default function App() {
	const [data, setData] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [favorites, setFavorites] = useState([])
	const [cartOpened, setCartOpened] = useState(false)
	const [sortBy, setSortBy] = useState('name')
	const [searchValue, setSearchValue] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [totalPrice, setTotalPrice] = useState(0)
	const [animationParent] = useAutoAnimate()
	const Api = 'https://35bd06a011b4a137.mokky.dev'

	useEffect(() => {
		const fetchData = async () => {
			try {
				const itemsData = await axios.get(`${Api}/items`)
				const cartData = await axios.get(`${Api}/cart`)
				const favoriteData = await axios.get(`${Api}/favorites`)
				setCartItems(cartData.data)
				setFavorites(favoriteData.data)
				setData(itemsData.data)
				setTotalPrice(
					cartData.data.reduce((acc, item) => {
						return acc + item.price
					}, 0)
				)
				setIsLoading(false)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		const filterFetchData = async () => {
			try {
				setIsLoading(true)
				const params = {
					sortBy: sortBy,
				}

				if (searchValue) {
					params.title = `*${searchValue}*`
				}
				const itemsData = await axios.get(`${Api}/items`, { params })
				setData(itemsData.data)
				setIsLoading(false)
			} catch (err) {
				console.error(err)
			}
		}
		filterFetchData()
	}, [sortBy, searchValue])

	const onChangeSelect = e => {
		setSortBy(e.target.value)
	}

	const addToCartItem = async obj => {
		try {
			const params = {
				card_id: obj.id,
			}
			await axios.post(`${Api}/cart`, {
				card_id: obj.id,
				title: obj.title,
				imageUrl: obj.imageUrl,
				price: obj.price,
			})
			const serverObj = (await axios.get(`${Api}/cart`, { params })).data[0]
			setCartItems(prev => [...prev, serverObj])
			setTotalPrice(prev => prev + obj.price)
		} catch (err) {
			console.error(err)
		}
	}

	const isItemAdded = id => {
		return cartItems.some(item => item.card_id === id)
	}

	const isItemFavorite = id => {
		return favorites.some(item => item.favorite_id === id)
	}

	const removeFromCartItem = async obj => {
		try {
			await axios.delete(`${Api}/cart/${obj.id}`)
			setCartItems(prev => prev.filter(item => item.id !== obj.id))
			setTotalPrice(prev => prev - obj.price)
		} catch (err) {
			console.error(err)
		}
	}

	const removeFromCardsList = async obj => {
		try {
			const idInCart = cartItems.find(item => item.card_id === obj.id)
			await axios.delete(`${Api}/cart/${idInCart.id}`)
			setCartItems(prev => prev.filter(item => item.card_id !== obj.id))
			setTotalPrice(prev => prev - obj.price)
		} catch (err) {
			console.error(err)
		}
	}

	const addFavorite = async obj => {
		try {
			const params = {
				favorite_id: obj.id,
			}

			await axios.post(`${Api}/favorites`, {
				favorite_id: obj.id,
				title: obj.title,
				imageUrl: obj.imageUrl,
				price: obj.price,
			})
			const serverObj = (await axios.get(`${Api}/favorites`, { params }))
				.data[0]
			setFavorites(prev => [...prev, serverObj])
		} catch (err) {
			console.error(err)
		}
	}

	const removeFavorite = async obj => {
		try {
			const idInFavorites = favorites.find(
				item => item.favorite_id === obj.favorite_id
			)
			await axios.delete(`${Api}/favorites/${idInFavorites.id}`)
			setFavorites(prev =>
				prev.filter(item => item.favorite_id !== obj.favorite_id)
			)
		} catch (err) {
			console.error(err)
		}
	}

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<>
					{cartOpened && (
						<Drawer
							onClose={() => setCartOpened(false)}
							removeFromCartItem={removeFromCartItem}
						/>
					)}
					<div className='bg-white m-auto mt-14'>
						<Header onOpen={() => setCartOpened(true)} />
						<Body />
					</div>
				</>
			),
		},
		{
			path: '/favorites',
			element: (
				<>
					{cartOpened && (
						<Drawer
							onClose={() => setCartOpened(false)}
							removeFromCartItem={removeFromCartItem}
						/>
					)}
					<div className='bg-white m-auto mt-14'>
						<Header onOpen={() => setCartOpened(true)} />
						<Favorites />
					</div>
				</>
			),
		},
	])

	return (
		<AppContext.Provider
			value={{
				isItemAdded,
				cartItems,
				addToCartItem,
				removeFromCartItem,
				removeFromCardsList,
				data,
				favorites,
				setFavorites,
				addFavorite,
				removeFavorite,
				isItemFavorite,
				onChangeSelect,
				isLoading,
				animationParent,
				searchValue,
				setSearchValue,
				totalPrice,
				setTotalPrice,
			}}
		>
			<RouterProvider router={router} />
		</AppContext.Provider>
	)
}
