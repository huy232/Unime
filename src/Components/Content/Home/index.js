import useDocumentTitle from "../DocumentTitleHook"
import { useAuth } from "../../../Contexts/auth"
import HomeENG from "../HomeENG"
import HomeVI from "../HomeVI"

function Home({ instance }) {
	const { language } = useAuth()

	useDocumentTitle(language !== "eng" ? "Trang chủ - Unime" : "HOME - Unime")

	return (
		<>{language !== "eng" ? <HomeVI instance={instance} /> : <HomeENG />}</>
	)
}

export default Home
