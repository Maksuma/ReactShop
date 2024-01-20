import { useContext } from 'react'
import { AppContext } from '../App'

export default function CartItem({ title, imgURL, cost, removeFromCartItem }) {
	const state = useContext(AppContext)
	return (
		<>
			<div className='flex items-center border border-slate-200 p-4 gap-4 rounded-xl'>
				<img src={imgURL} alt='Sneakers' className='w-16 h-16' />
				<div className='flex flex-col flex-1'>
					<p>{title}</p>

					<div className='flex justify-between mt-2'>
						<b>{cost} руб.</b>
						<img
							className='opacity-40 cursor-pointer transition hover:opacity-100'
							src='/close.svg'
							alt='Close'
							onClick={() => {
								removeFromCartItem()
							}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
