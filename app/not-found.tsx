import { InfoBlock } from '@/components/shared'

export default function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Page not found"
				text="Please check that the address you entered is correct or try again later."
				imageUrl="/assets/images/not-found.png"
			/>
		</div>
	)
}
