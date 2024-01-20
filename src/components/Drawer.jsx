import { useContext } from 'react'
import { AppContext } from '../App'
import BackButton from './BackButton'
import CartItemList from './CartItemList'

export default function Drawer({ onClose, removeFromCartItem }) {
	const state = useContext(AppContext)
	return (
		<>
			<div className='fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70'></div>
			<div className='flex flex-col fixed top-0 right-0 h-full w-96 bg-white z-20 p-8'>
				<div className='flex items-center gap-5 mb-8'>
					<BackButton onClose={onClose} />
					<h2 className='font-bold text-2xl'>Корзина</h2>
				</div>
				{state.cartItems.length === 0 ? (
					<div className='flex flex-1 justify-center flex-col items-center'>
						<img
							src='/package-icon.png'
							alt='package'
							className='mb-4 w-32 h-32'
						/>
						<h2 className='font-bold text-xl mb-2'>Корзина пустая :(</h2>
						<p className='text-center text-slate-400 mb-3'>
							Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
						</p>
						<button
							className='flex items-center justify-center w-full py-3 rounded-xl bg-lime-400 text-white  hover:bg-lime-300 transition'
							onClick={onClose}
						>
							<img
								src='/arrow-next.svg'
								alt='back'
								className='mr-2 rotate-180'
							/>
							Вернуться назад
						</button>
					</div>
				) : (
					<>
						<CartItemList removeFromCartItem={removeFromCartItem} />
						<div className='flex flex-col gap-4 mt-7'>
							<div className='flex justify-between items-center gap-2'>
								<span>Итого:</span>
								<b>{state.totalPrice} руб.</b>
							</div>
							<button className='w-full py-3 rounded-xl bg-lime-400 text-white disabled:bg-slate-300 hover:bg-lime-300 active:bg-lime-500 transition'>
								Оформить заказ
							</button>
						</div>
					</>
				)}
			</div>
		</>
	)
}
