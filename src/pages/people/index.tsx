import { IPerson } from "../../interfaces"
import Button from "../../components/Button"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"

const pessoas: IPerson[] = [
	{ id: "1", name: "João", age: 20 },
	{ id: "2", name: "Pedro", age: 19 },
	{ id: "3", name: "Bia", age: 18 }
]

const People = () => {
	return (
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
				{pessoas?.map((pessoa, i) => (
					<tr key={pessoa.id} className={`border-b border-slate-200 ${i % 2 === 0 ? "bg-slate-100" : ""}`}>
						<td className=" py-2 px-4">{pessoa.id}</td>
						<td className=" py-2 px-4">{pessoa.name}</td>
						<td className=" py-2 px-4">{pessoa.age}</td>
						<td className=" py-2 px-4 flex gap-2 justify-center">
							<Button component="button">
								<PencilIcon className="h-4 w-4" aria-label="Editar" />
							</Button>
							<Button component="button" variant="danger">
								<TrashIcon className="h-4 w-4" aria-label="Excluir" />
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default People
