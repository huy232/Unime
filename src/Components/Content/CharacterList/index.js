import { COLORLIST } from "../../../constants"
import Image from "../Image"

function CharacterList({ characters }) {
	return (
		<>
			<h4 className="font-black pt-4">CHARACTERS</h4>
			<div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full py-4 [&>div]:max-lg:shrink-0 [&>div]:max-lg:flex overflow-y-scroll h-[500px]">
				{characters.map((character, i) => (
					<div className="min-h-28" key={character.id || character.name}>
						<div className="flex bg-[#0D0D0D] h-full w-full">
							<div className="w-1/3">
								<Image
									className="h-full aspect-[2/3] duration-500 ease-in-out "
									src={character.image || ""}
									alt={character.name.full || character.name}
									loading="lazy"
								/>
							</div>
							<div className="mx-2 flex flex-col w-2/3">
								<p
									className="text-lg font-bold"
									style={{ color: COLORLIST[i] }}
								>
									{character.name.full || character.name}
								</p>
								<p
									className="font-semibold mt-2 text-sm"
									style={{ color: "rgb(188 188 188 / 70%)" }}
								>
									{character.role}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default CharacterList
