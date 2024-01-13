/* eslint-disable no-mixed-spaces-and-tabs */
import Card from './Card'
import CardSkeleton from './CardSkeleton'

export default function CardList({
	items,
	addToCartItem,
	animationParent,
	cartItems,
	isLoading,
}) {
	return (
		<>
			<div className='grid grid-cols-4 gap-5 mt-10' ref={animationParent}>
				{isLoading
					? [...Array(10)].map(index => {
							return <CardSkeleton key={index} />
					  })
					: items.map((item, index) => {
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
