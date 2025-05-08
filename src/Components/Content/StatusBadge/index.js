import clsx from "clsx"
import { ANIME_STATUS } from "../../../constants"

function StatusBadge({ position, children, status, className }) {
	const normalizedStatus = status?.replace(/\s+/g, "_").toUpperCase()
	const statusClass = normalizedStatus && ANIME_STATUS[normalizedStatus]
	return (
		<span
			className={clsx(
				"z-10 absolute p-1 m-1 text-xs",
				position,
				statusClass || "text-white",
				className
			)}
		>
			{children}
		</span>
	)
}

export default StatusBadge
