import React from "react"
import errorStep1 from "../../../Utilities/img/error-step-1.webp"
import errorStep2 from "../../../Utilities/img/error-step-2.webp"
import "./errorload.css"
import Image from "../Image"

function ErrorLoad() {
	return (
		<div className="error-load w-[80vw] max-lg:w-full flex items-center flex-col overflow-y-scroll">
			<p className="">
				Oops, error, the provider for this episode currently is not available,
				might to another change provider then
			</p>
			<div>
				<div>
					<p className="font-black my-1">Step 1: Back to the INFO</p>
					<Image src={errorStep1} alt="Error step 1" />
				</div>
				<div>
					<p className="font-black my-1">
						Step 2: Choose another provider, <i>suggest:</i> <b>ZORO</b>
					</p>
					<Image src={errorStep2} alt="Error step 2" />
				</div>
			</div>
		</div>
	)
}

export default ErrorLoad
