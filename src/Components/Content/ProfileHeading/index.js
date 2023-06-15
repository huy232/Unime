import { dateConvert } from "../../../Utilities/dateConvert"

function ProfileHeading({ user, lang }) {
	return (
		<div className="w-full flex justify-center flex-col items-center duration-200 ease-in-out transition-all">
			<h1 className="font-black my-1">
				{lang === "vi" ? "THÔNG TIN CÁ NHÂN" : "YOUR PROFILE"}
			</h1>
			<div className="max-w-[600px] flex flex-col w-full bg-gray-700/20 shadow-gray-700/20 p-4 rounded sm:flex-row">
				<div className="flex flex-col justify-center items-center mx-1">
					<img
						className="rounded-full"
						src={user.user_metadata.avatar_url}
						alt="User avatar"
					/>
					<p className="font-bold">{user.user_metadata.full_name}</p>
				</div>
				<div className="flex flex-col mx-2 w-full">
					<div className="flex flex-col">
						<label className="uppercase tracking-wide my-1 pt-1">Email</label>
						<input
							className="text-[#ccc] border-none bg-[#404246] p-2 text-[13px] rounded"
							type="text"
							disabled
							placeholder={user.user_metadata.email}
						/>
					</div>
					<div className="flex flex-col">
						<label className="uppercase tracking-wide my-1 pt-1">
							{lang === "vi" ? "Mạng xã hội" : "Social"}
						</label>
						<input
							className="text-[#ccc] border-none bg-[#404246] p-2 text-[13px] rounded uppercase"
							type="text"
							disabled
							placeholder={user.app_metadata.provider}
						/>
					</div>
					<div className="flex flex-col">
						<label className="uppercase tracking-wide my-1 pt-1">
							{lang === "vi" ? "Ngày gia nhập" : "Joined"}
						</label>
						<input
							type="text"
							className="text-[#ccc] border-none bg-[#404246] p-2 text-[13px] rounded"
							disabled
							placeholder={dateConvert(user.created_at)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileHeading
