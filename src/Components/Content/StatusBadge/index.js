import clsx from "clsx"
import { ANIME_STATUS } from "../../../constants"

function StatusBadge({ position, children, status, className }) {
	return (
		<span
			className={clsx(
				"z-10 absolute p-1 m-1 text-xs",
				position,
				status && ANIME_STATUS[status] ? ANIME_STATUS[status] : "text-white",
				className
			)}
		>
			{children}
		</span>
	)
}

export default StatusBadge
