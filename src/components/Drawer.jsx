import BackButton from './BackButton'
import CartItemList from './CartItemList'

export default function Drawer({ onClose, cartItems }) {
	return (
		<>
			<div className='fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70'></div>
			<div className='flex flex-col fixed top-0 right-0 h-full w-96 bg-white z-20 p-8'>
				<div className='flex items-center gap-5 mb-8'>
					<BackButton onClose={onClose} />
					<h2 className='font-bold text-2xl'>Корзина</h2>
				</div>

				<CartItemList cartItems={cartItems} />

				<div className='flex flex-col gap-4 mt-7'>
					<div className='flex justify-between items-center gap-2'>
						<span>Итого:</span>
						<b>12990 руб.</b>
					</div>
					<button className='w-full py-3 rounded-xl bg-lime-400 text-white disabled:bg-slate-300 hover:bg-lime-300 active:bg-lime-500 transition'>
						Оформить заказ
					</button>
				</div>
			</div>
		</>
	)
}
