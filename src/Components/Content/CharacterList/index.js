import { COLORLIST } from "../../../constants"
import Image from "../Image"

function CharacterList({ characters }) {
	return (
		<>
			<h4 className="font-black pt-4 font-bebas-neue text-3xl">CHARACTERS</h4>
			<div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full py-4 [&>div]:max-lg:shrink-0 [&>div]:max-lg:flex overflow-y-scroll max-h-[500px] scrollbar-hide">
				{characters.map((character, i) => (
					<div
						className="flex bg-[#0D0D0D] w-full"
						key={(character.id || character.name) + i}
					>
						<div className="aspect-[2/3] h-[90px]">
							<Image
								className="h-full w-full duration-500 ease-in-out rounded"
								src={character.image || ""}
								alt={
									character?.name?.full ||
									character?.name ||
									"Anonymous character"
								}
								loading="lazy"
							/>
						</div>
						<div className="mx-2 flex flex-col w-full">
							<p className="text-lg font-bold" style={{ color: COLORLIST[i] }}>
								{character?.name?.full ||
									character?.name ||
									"Anonymous character"}
							</p>
							<p
								className="font-semibold mt-2 text-sm"
								style={{ color: "rgb(188 188 188 / 70%)" }}
							>
								{character.role}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default CharacterList
