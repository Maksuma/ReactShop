import Card from './Card'

export default function CardList({ items, addToCartItem, animationParent }) {
	return (
		<>
			<div className='grid grid-cols-4 gap-5 mt-10' ref={animationParent}>
				{items.map((item, index) => {
					return (
						<Card
							key={index}
							title={item.title}
							imageUrl={item.imageUrl}
							price={item.price}
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
