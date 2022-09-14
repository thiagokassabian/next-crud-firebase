import Link from "next/link"
import { addPerson, updatePerson } from "../../backend/config"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Layout from "../../components/Layout"
import useForm from "../../hooks/useForm"
import { IPerson } from "../../interfaces"

interface IPersonProps {
	person: IPerson
}

const PersonForm = ({ person }: IPersonProps) => {
	const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<IPerson>(person || { name: "", age: 0 })
	const id = person?.id

	const submit = async () => {
		const data = { ...values, age: Number(values.age) }
		if (!person) {
			console.log("adding", data)
			const addedPerson = await addPerson(data)
			console.log("add success", addedPerson)
		} else {
			console.log("updating", data)
			const updatedPerson = await updatePerson(id!, data)
			console.log("update success", updatedPerson)
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
