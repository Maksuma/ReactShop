import Card from './Card'

export default function CardList({
	items,
	addToCartItem,
	animationParent,
	cartItems,
}) {
	return (
		<>
			<div className='grid grid-cols-4 gap-5 mt-10' ref={animationParent}>
				{items.map((item, index) => {
					return (
						<Card
							key={index}
							id={item.id}
							title={item.title}
							imageUrl={item.imageUrl}
							price={item.price}
							added={cartItems.includes(item.id)}
							onPlus={obj => {
								addToCartItem(obj)
							}}
						/>
					)
				})}
			</div>
		</>
	)
}
