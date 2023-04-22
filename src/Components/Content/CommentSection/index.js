import { DiscussionEmbed } from "disqus-react"
import { MAINSITE } from "../../../constants"

function CommentSection({
	itemId,
	itemTitle,
	language,
	headingTitle,
	route,
	shortname,
}) {
	const disqusShortname = shortname
	const disqusConfig = {
		url: `${MAINSITE}/${route}/${itemId}`,
		identifier: `${itemId}-comment`,
		title: itemTitle,
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
			<p className="inline-block text-white/50 border-l-[6px] border-white/70 p-[4px] bg-white/10 text-sm my-[8px]">
				{language === "vi" && (
					<>
						<strong>Người dùng ẩn danh</strong> sử dụng để bình luận sẽ cần phê
						duyệt của quản trị viên để hiển thị bình luận (để ngăn bot spam và
						các hình ảnh không phù hợp, v.v.). Nếu bạn muốn bình luận tự do, xin
						vui lòng đăng nhập.
					</>
				)}
				{language === "en_US" && (
					<>
						The <strong>anonymous user</strong> that uses to comment will need
						admin approval to display the comment (to prevent bot spam and
						inappropriate images, etc.). If you want to comment freely, please
						login.
					</>
				)}
			</p>
			<DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
		</div>
	)
}

export default CommentSection
