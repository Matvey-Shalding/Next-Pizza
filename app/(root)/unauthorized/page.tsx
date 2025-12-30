import { InfoBlock } from '@/components/shared'

export default function UnauthorizedPage() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Access Denied"
				text="Only authenticated users can view this page"
				imageUrl="/assets/images/lock.png"
			/>
		</div>
	)
}
