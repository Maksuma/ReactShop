import { useState } from 'react'
import ContentLoader from 'react-content-loader'

export default function Card({
	id,
	title,
	imageUrl,
	price,
	onPlus,
	added = false,
	loading = false,
}) {
	const [isFavorite, setIsFavorite] = useState(false)
	const [isAdded, setIsAdded] = useState(false)

	return (
		<>
			<div className='relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl'>
				{loading ? (
					<ContentLoader
						className='top-0 left-0 w-full h-full'
						speed={2}
						width={200}
						height={250}
						viewBox='0 0 200 250'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
					>
						<rect x='0' y='0' rx='10' ry='10' width='200' height='170' />
						<rect x='0' y='180' rx='5' ry='5' width='180' height='10' />
						<rect x='0' y='200' rx='5' ry='5' width='120' height='10' />
						<rect x='0' y='229' rx='5' ry='5' width='80' height='20' />
						<rect x='167' y='219' rx='5' ry='5' width='30' height='30' />
					</ContentLoader>
				) : (
					<>
						<img
							className='absolute top-8 left-8'
							src={isFavorite ? '/like-2.svg' : '/like-1.svg'}
							alt='Like'
							onClick={() => {
								setIsFavorite(!isFavorite)
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
								alt='Add'
								onClick={() => {
									onPlus({ id, title, price, imageUrl })
									setIsAdded(!isAdded)
								}}
							/>
						</div>
					</>
				)}
			</div>
		</>
	)
}
