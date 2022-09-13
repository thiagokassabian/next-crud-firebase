import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import Button from "../components/Button"
import Layout from "../components/Layout"
import People from "./people"

const Home: NextPage = () => {
	return (
		<Layout>
			<div className="mb-3 flex justify-end">
				<Link href="/person" passHref>
					<Button component="a" variant="secondary">
						Cadastrar novo
					</Button>
				</Link>
			</div>
			<People />
		</Layout>
	)
}

export default Home
