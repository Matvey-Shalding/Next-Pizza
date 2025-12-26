import React from 'react'
interface Props {
	className?: string
	text?:string
}
export const ErrorMessage: React.FC<Props> = ({ className,text }) => {
	return <div className='text-[#FE0000] text-sm'>{text}</div>
}
