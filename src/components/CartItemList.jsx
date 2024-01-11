import CartItem from './CartItem'

export default function CartItemList({ cartItems, removeFromCartItem }) {
	return (
		<>
			<div className='flex flex-1 flex-col gap-5 overflow-auto'>
				{cartItems.map((item, index) => {
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
