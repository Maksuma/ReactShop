import ContentLoader from 'react-content-loader'

export default function CardSkeleton() {
	return (
		<div className='relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl'>
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
		</div>
	)
}
