import React from 'react'
interface Props {
	className?: string
}
export const RequiredSymbol: React.FC<Props> = ({ className }) => {
	return <span className="text-[#FE0000]">*</span>
}
