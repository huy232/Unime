import { DiscussionEmbed } from "disqus-react"
import { MAINSITE } from "../../../constants"

function CommentSection({
	animeId,
	animeTitle,
	language,
	headingTitle,
	route,
	shortname,
}) {
	const disqusShortname = shortname
	const disqusConfig = {
		url: `${MAINSITE}/${route}/${animeId}`,
		identifier: `${animeId}-comment`,
		title: animeTitle,
		language: language,
	}
	return (
		<div className="article-container px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36">
			<h4 className="font-black">{headingTitle}</h4>
			<p className="inline-block text-white/50 border-l-[6px] border-white/70 p-[4px] bg-white/10 text-sm my-[8px]">
				{language === "vi" && (
					<>
						<i>*Lưu ý</i>: Tài khoản để bình luận <strong>khác với</strong> tài
						khoản đăng nhập
					</>
				)}
				{language === "en_US" && (
					<>
						<i>*Note</i>: The account used for comments{" "}
						<strong>is different from</strong> the account that uses for login
					</>
				)}
			</p>
			<DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
		</div>
	)
}

export default CommentSection
