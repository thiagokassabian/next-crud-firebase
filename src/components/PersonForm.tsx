import Link from "next/link"
import { useRouter } from "next/router"
import { addPerson, updatePerson } from "../backend/config"
import useForm from "../hooks/useForm"
import { IPerson } from "../interfaces"
import Button from "./Button"
import Input from "./Input"
import Layout from "./Layout"

interface IPersonProps {
	person: IPerson
}

const PersonForm = (props: IPersonProps) => {
	const { person } = props
	const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<IPerson>(person || { name: "", age: 0 })
	const id = person?.id
	const router = useRouter()

	const submit = async () => {
		const data = { ...values, age: Number(values.age) }
		if (!person) {
			console.log("add", data)
			addPerson(data).then(result => {
				console.log("add success", result)
				router.push("/people")
			})
		} else {
			delete data.id
			console.log("update", data)
			updatePerson(id!, data).then(result => {
				console.log("update success", result)
				router.push("/people")
			})
		}
	}

	return (
		<Layout>
			<form onSubmit={handleSubmit(submit)}>
				{id && (
					<div className="mb-3">
						<Input label="ID" name="id" value={id} readonly />
					</div>
				)}
				<div className="mb-3">
					<Input label="Nome" name="name" value={values.name} onChange={handleChange} />
				</div>
				<div className="mb-3">
					<Input type="number" label="Idade" name="age" value={values.age.toString()} onChange={handleChange} />
				</div>
				<div className="flex justify-end gap-2">
					<Button component="button" variant="primary">
						Enviar
					</Button>
					<Link href="/people">
						<Button component="button" variant="danger">
							Cancelar
						</Button>
					</Link>
				</div>
			</form>
		</Layout>
	)
}

export default PersonForm
