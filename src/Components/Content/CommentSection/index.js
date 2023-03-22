import { useEffect, useState } from "react"
import { supabase } from "../../../supabaseClient"

function CommentSection({ animeId }) {
	const [commentData, setCommentData] = useState([])

	useEffect(() => {
		const getComment = async () => {
			const { data, error } = await supabase
				.from("sce_comments")
				.select()
				.eq("topic", `${animeId}`)
		}

		getComment()
	}, [animeId])

	return <div></div>
}

export default CommentSection
