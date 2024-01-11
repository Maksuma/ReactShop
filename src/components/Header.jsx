export default function Header({ onOpen }) {
	return (
		<header className='flex justify-between border-b border-slate-300 px-8 pb-5'>
			<div className='flex items-center gap-4'>
				<img src='/logo.png' alt='logo' className='w-10' />
				<div>
					<h2 className='text-xl font-bold uppercase'>Shop</h2>
					<p className='text-slate-400'>Магазин чего-либо</p>
				</div>
			</div>

			<ul className='flex items-center gap-10'>
				<li className='flex items-center gap-3 cursor-pointer' onClick={onOpen}>
					<img src='/cart.svg' alt='Cart' />
					<b>1234 руб.</b>
				</li>

				<li className='flex items-center gap-3 cursor-pointer'>
					<img src='/heart.svg' alt='Heart' />
					<b>Закладки</b>
				</li>

				<li className='flex items-center gap-3 cursor-pointer'>
					<img src='/profile.svg' alt='Profile' />
					<b>Профиль</b>
				</li>
			</ul>
		</header>
	)
}
