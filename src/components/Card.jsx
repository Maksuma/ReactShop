export default function Card({
	title,
	imageUrl,
	price,
	isAdded,
	isFavorite,
	addToCart,
	removeFromCart,
	addToFavorite,
	removeFromFavorite,
}) {
	return (
		<>
			<div className='relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl'>
				<img
					className='absolute top-8 left-8'
					src={isFavorite ? '/like-2.svg' : '/like-1.svg'}
					alt='Like'
					onClick={() => {
						if (isFavorite) {
							isFavorite = false
							removeFromFavorite()
						} else {
							isFavorite = true
							addToFavorite()
						}
					}}
				/>
				<img src={imageUrl} alt='sneaker' />
				<p className='mt-2'>{title}</p>
				<div className='flex justify-between mt-3'>
					<div className='flex flex-col'>
						<span className='text-slate-400'>Цена:</span>
						<b>{price} руб.</b>
					</div>
					<img
						src={isAdded ? '/checked.svg' : '/plus.svg'}
						alt='Add or remove'
						onClick={() => {
							if (isAdded) {
								removeFromCart()
								isAdded = false
							} else {
								addToCart()
								isAdded = true
							}
						}}
					/>
				</div>
			</div>
		</>
	)
}
