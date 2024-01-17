import { useAutoAnimate } from '@formkit/auto-animate/react'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import Body from './components/Body'
import Drawer from './components/Drawer'
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
				setIsLoading(false)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		console.log('cartItems', cartItems)
	}, [cartItems])

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
			console.log('serverObj', serverObj)
			setCartItems(prev => [...prev, serverObj])
		} catch (err) {
			console.error(err)
		}
	}

	const isItemAdded = id => {
		return cartItems.some(item => item.card_id === id)
	}

	const removeFromCartItem = async obj => {
		try {
			console.log(obj)
			await axios.delete(`${Api}/cart/${obj.id}`)
			setCartItems(prev => prev.filter(item => item.id !== obj.id))
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<AppContext.Provider
			value={{
				isItemAdded,
				cartItems,
				addToCartItem,
				removeFromCartItem,
				data,
				favorites,
				setFavorites,
				onChangeSelect,
				isLoading,
				animationParent,
				searchValue,
				setSearchValue,
			}}
		>
			{cartOpened && (
				<Drawer
					onClose={() => setCartOpened(false)}
					removeFromCartItem={removeFromCartItem}
				/>
			)}
			<div className='bg-white w-4/5 m-auto mt-14 shadow-xl rounded-xl'>
				<Header onOpen={() => setCartOpened(true)} />
				<Body />
			</div>
		</AppContext.Provider>
	)
}
