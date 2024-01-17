import { useContext } from 'react'
import { AppContext } from '../App'
import CartItem from './CartItem'

export default function CartItemList({ removeFromCartItem }) {
	const state = useContext(AppContext)
	return (
		<>
			<div
				className='flex flex-1 flex-col gap-5 overflow-auto'
				ref={state.animationParent}
			>
				{state.cartItems.map((item, index) => {
					return (
						<CartItem
							key={index}
							title={item.title}
							imgURL={item.imageUrl}
							cost={item.price}
							removeFromCartItem={() => removeFromCartItem(item)}
						/>
					)
				})}
			</div>
		</>
	)
}
