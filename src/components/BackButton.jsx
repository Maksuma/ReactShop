export default function BackButton({ onClose }) {
	return (
		<svg
			onClick={onClose}
			className='rotate-180 opacity-30 cursor-pointer transition hover:-translate-x-1 hover:opacity-100'
			width='16'
			height='14'
			viewBox='0 0 16 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1 7H14.7143'
				stroke='black'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8.71436 1L14.7144 7L8.71436 13'
				stroke='black'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
