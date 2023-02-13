import React, { useState, useEffect } from "react"
import { FileUploader } from "react-drag-drop-files"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import AnimeImageSearchLayout from "../AnimeImageSearchLayout"
import LoadingSpin from "react-loading-spin"
import useDocumentTitle from "../../Hooks/useDocumentTitle"

const fileTypes = ["JPG", "PNG", "JPEG"]

function AnimeImageSearch() {
	const [file, setFile] = useState(null)
	const [preview, setPreview] = useState(null)
	const [text, setText] = useState("")
	const [loading, setLoading] = useState(false)
	const [toggle, setToggle] = useState(true)
	const [searchResult, setSearchResult] = useState({})

	useEffect(() => {
		// create the preview

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(preview)
	}, [preview])

	const handleChange = async (e) => {
		const objectUrl = URL.createObjectURL(e)
		setPreview(objectUrl)
		setFile(e)
	}

	const handleSubmit = async (file) => {
		try {
			setLoading(true)
			if (typeof file === "object") {
				const formData = new FormData()
				formData.append("file", file)
				const response = await axios({
					method: "post",
					url: "https://api.trace.moe/search?anilistInfo&cutBorders",
					data: formData,
					headers: { "Content-Type": "image/jpeg" },
				})
				URL.revokeObjectURL(preview)
				setPreview(null)
				setFile(null)
				setSearchResult(response.data)
			} else {
				const response = await axios({
					method: "post",
					url: `https://api.trace.moe/search?anilistInfo&cutBorders&url=${encodeURIComponent(
						`${text}`
					)}`,
				})
				setText("")
				setSearchResult(response.data)
			}
			setLoading(false)
			setToggle(false)
		} catch (error) {
			setText("")
			setFile(null)
			setPreview(null)
			setLoading(false)
			setToggle(true)
			console.log(error)
		}
	}

	const handleRemoveImage = async () => {
		setFile(null)
		setPreview(null)
	}

	useDocumentTitle("Anime image search - UNIME")

	return (
		<>
			{!toggle && (
				<AnimeImageSearchLayout
					searchResult={searchResult}
					setToggle={setToggle}
				/>
			)}

			{toggle ? (
				<>
					<div>
						<h1 className="font-black">Search Anime by Scene</h1>
						<div className="flex flex-col items-center mb-[12px]">
							<p>
								The anime image you inserted will tell you which anime and
								episode it belongs to
							</p>
							<p>
								<i>
									Note:{" "}
									<b>
										Search results are not 100% accurate. Only works with anime
										in-scene episode, not with anime wallpaper, etc.
									</b>
								</i>
							</p>
						</div>
					</div>
					{preview ? (
						<div className="flex justify-center items-center">
							{!loading ? (
								<div className="flex flex-col justify-center items-center">
									<div className="w-[320px] h-100 rounded relative">
										<div>
											<img
												className="relative"
												src={preview}
												alt="object-scale-down"
												loading="lazy"
											/>
											<FontAwesomeIcon
												icon={faTrash}
												className="absolute bg-[#474747eb] p-[6px] rounded-full right-[10px] top-[10px] hover:opacity-80 cursor-pointer duration-200 ease-in-out"
												onClick={() => handleRemoveImage()}
											/>
										</div>
									</div>
									<div className="flex justify-between">
										<label className="cursor-pointer hover:opacity-80 duration-200 ease-in-out bg-[#4b4b4b] p-[6px] rounded m-[6px]">
											Other image?
											<FileUploader
												handleChange={(e) => handleChange(e)}
												name="file"
												types={fileTypes}
												multiple={false}
												maxSize={25}
												classes="image-search-upload hidden"
											/>
										</label>
										<button
											className="cursor-pointer hover:opacity-80 duration-200 ease-in-out bg-[#8f4747] p-[6px] rounded m-[6px]"
											onClick={() => handleSubmit(file)}
											id="image-search-btn"
											aria-label="Image search button"
										>
											SEARCH
										</button>
									</div>
								</div>
							) : (
								<div className="block w-[100vw] mt-[50px] text-center">
									<LoadingSpin primaryColor="red" />
								</div>
							)}
						</div>
					) : (
						<div className="flex justify-center items-center">
							{!loading ? (
								<div className="flex flex-col justify-center items-center">
									<FileUploader
										handleChange={(e) => handleChange(e)}
										name="file"
										types={fileTypes}
										multiple={false}
										maxSize={25}
										classes="image-search-comp w-[320px] h-[280px]"
										label="Drag and drop or insert your anime image here"
									/>
									<div className="flex items-center">
										<span>OR</span>
										<input
											type="text"
											className="rounded p-[6px] text-[#000] mx-[6px]"
											placeholder="URL image"
											value={text}
											onChange={(e) => setText(e.target.value)}
										/>
										<button
											className="cursor-pointer hover:opacity-80 duration-200 ease-in-out p-[6px] rounded my-[6px] ml-auto mr-[6px] bg-[#8f4747]"
											onClick={() => handleSubmit(text)}
											id="url-search-btn"
											aria-label="URL search button"
										>
											URL search
										</button>
									</div>
								</div>
							) : (
								<div className="block w-[100vw] mt-[50px] text-center">
									<LoadingSpin primaryColor="red" />
								</div>
							)}
						</div>
					)}
				</>
			) : (
				""
			)}
		</>
	)
}

export default AnimeImageSearch
