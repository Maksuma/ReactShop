import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'

export default function Header({ onOpen }) {
	const state = useContext(AppContext)
	return (
		<header className='flex max-[910px]:flex-col justify-between border-b border-slate-300 px-8 pb-5'>
			<Link to='/'>
				<div className='flex  max-[910px]:justify-center max-[910px]:mb-5 items-center gap-4'>
					<img src='/logo.png' alt='logo' className='w-10' />
					<div>
						<h2 className='text-xl font-bold uppercase'>Shop</h2>
						<p className='text-slate-400'>Магазин чего-либо</p>
					</div>
				</div>
			</Link>

			<ul className='flex max-[910px]:justify-center items-center gap-10'>
				<li className='flex items-center gap-3 cursor-pointer' onClick={onOpen}>
					<img src='/cart.svg' alt='Cart' />
					<b>{state.totalPrice} руб.</b>
				</li>
				<Link to='/favorites'>
					<li className='flex items-center gap-3 cursor-pointer'>
						<img src='/heart.svg' alt='Heart' />
						<b>Закладки</b>
					</li>
				</Link>

				<li className='flex items-center gap-3 cursor-pointer'>
					<img src='/profile.svg' alt='Profile' />
					<b>Профиль</b>
				</li>
			</ul>
		</header>
	)
}
