import { CategoryWithProducts } from '@/@types/CategoryWithProducts'
import { cn } from '@/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import { Categories, Container } from '..'

export function TopBar({
	className,
	categories
}: {
	className?: string
	categories: CategoryWithProducts[]
}) {
	return (
		<div
			className={cn(
				className,
				'sticky top-0 bg-white py-5 z-10 shadow-lg shadow-black/5'
			)}
		>
			<Container className="flex items-center justify-between">
				<Categories categories={categories} />
				<div
					className="
						inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer"
				>
					<ArrowUpDown size={16} />
					<span className="font-bold">Sorting:</span>
					<span className="text-primary font-bold">Popular</span>
				</div>
			</Container>
		</div>
	)
}
