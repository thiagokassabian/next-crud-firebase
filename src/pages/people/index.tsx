import { IPerson } from "../../interfaces"
import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import Link from "next/link"
import Button from "../../components/Button"
import Layout from "../../components/Layout"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { deletePerson, getPeople } from "../../backend/config"
import { useState } from "react"

type IPeopleProps = {
	people: IPerson[]
}

export const getServerSideProps: GetServerSideProps = async context => {
	const people = await getPeople()
	return { props: { people } }
}

const People: NextPage<IPeopleProps, any> = ({ people }: IPeopleProps) => {
	const [peopleState, setPeopleState] = useState<IPerson[]>(people)

	const handleDelete = async (id: string) => {
		console.log("deleting", id)
		await deletePerson(id)
		console.log("deleted success")
		setPeopleState(peopleState.filter(person => person.id !== id))
	}

	return (
		<Layout>
			<div className="mb-3 flex justify-end">
				<Link href="/person/add" passHref>
					<Button component="a" variant="secondary">
						Cadastrar novo
					</Button>
				</Link>
			</div>
			<table className="w-full rounded overflow-hidden table-fixed">
				<thead className="bg-slate-900 text-white">
					<tr>
						<th className="text-left py-2 px-4">ID</th>
						<th className="text-left py-2 px-4">Nome</th>
						<th className="text-left py-2 px-4">Idade</th>
						<th className="text-center py-2 px-4">Ações</th>
					</tr>
				</thead>
				<tbody>
					{peopleState.map((person, i) => (
						<tr key={person.id} className={`border-b border-slate-200 ${i % 2 === 0 ? "bg-slate-100" : ""}`}>
							<td className=" py-2 px-4">{person.id}</td>
							<td className=" py-2 px-4">{person.name}</td>
							<td className=" py-2 px-4">{person.age}</td>
							<td className=" py-2 px-4 flex gap-2 justify-center">
								<Link href={`/person/edit/${person.id}`} passHref>
									<Button component="a">
										<PencilIcon className="h-4 w-4" aria-label="Editar" />
									</Button>
								</Link>
								<Button component="button" variant="danger" onClick={() => handleDelete(person.id!)}>
									<TrashIcon className="h-4 w-4" aria-label="Excluir" />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Layout>
	)
}

export default People
