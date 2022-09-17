import Skeleton from "@mui/material/Skeleton"

function DescriptionSkeleton() {
	return (
		<>
			<Skeleton variant="text" animation="wave" sx={{ bgcolor: "grey.900" }} />
		</>
	)
}

export default DescriptionSkeleton
