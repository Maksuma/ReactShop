import { useContext } from 'react'
import { AppContext } from '../App'
import Card from './Card'
import CardSkeleton from './CardSkeleton'

export default function Favorites() {
	const state = useContext(AppContext)
	return (
		<div className='p-10'>
			<div className='flex flex-col flex-wrap lg:flex-row justify-between items-center mb-8'>
				{!state.isLoading && state.favorites.length === 0 && (
					<>
						<h1 className='flex justify-center font-bold text-2xl text-center'>
							Таких кроссовок нет :(
						</h1>
					</>
				)}
				<div
					className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 '
					ref={state.animationParent}
				>
					{state.isLoading || state.favorites === undefined
						? [...Array(12)].map((obj, index) => {
								return <CardSkeleton key={index} />
						  })
						: state.favorites.map((item, index) => {
								return (
									<Card
										key={index}
										id={item.id}
										title={item.title}
										imageUrl={item.imageUrl}
										price={item.price}
										isAdded={state.isItemAdded(item.id)}
										isFavorite={state.isItemFavorite(item.id)}
										addToFavorite={() => {
											state.addFavorite(item)
										}}
										removeFromFavorite={() => {
											state.removeFavorite(item)
										}}
										addToCart={() => {
											state.addToCartItem(item)
										}}
										removeFromCart={() => {
											state.removeFromCardsList(item)
										}}
									/>
								)
						  })}
				</div>
			</div>
		</div>
	)
}
