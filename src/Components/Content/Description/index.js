import { useState, useRef, useLayoutEffect } from "react"

const ClampedDiv = ({ children }) => {
	const [open, setOpen] = useState(false)
	const ref = useRef(null)
	const [showLink, setShowLink] = useState(false)
	const [textClass, setTextClass] = useState("line-clamp-5")

	useLayoutEffect(() => {
		if (ref.current && ref.current.clientHeight < ref.current.scrollHeight) {
			setShowLink(true)
		}
	}, [ref])

	return (
		<div className="container">
			<div className={`${textClass}`}>
				<p ref={ref} dangerouslySetInnerHTML={{ __html: children }} />
			</div>
			{showLink && (
				<button
					onClick={() => {
						setOpen(!open)
						setTextClass(open ? "line-clamp-5" : "line-clamp-none")
					}}
					className="p-[4px] bg-black/80 my-2 flex ml-auto hover:opacity-80 duration-200 rounded"
				>
					{open ? "Rút gọn" : "Xem thêm"}
				</button>
			)}
		</div>
	)
}

export default ClampedDiv
