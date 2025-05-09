import React from "react"
import classNames from "classnames"

export const Skeleton = ({ className }) => {
	return (
		<div
			className={classNames("animate-pulse bg-neutral-700 rounded", className)}
		/>
	)
}
