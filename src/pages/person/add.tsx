import Button from "../../components/Button"
import Input from "../../components/Input"
import Layout from "../../components/Layout"
import useForm from "../../hooks/useForm"
import { IPerson } from "../../interfaces"

interface IPersonProps {
	person: IPerson
}

const Person = (props: IPersonProps) => {
	const { person } = props
	const isAddMode = !person
	const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<IPerson>({
		name: "",
		age: 0
	})
	const id = person?.id

	const submit = async () => {
		console.log(values)
	}

	return (
		<Layout>
			<form onSubmit={handleSubmit(submit)}>
				{id && (
					<div className="mb-3">
						<Input label="ID" name="id" value={id} />
					</div>
				)}
				<div className="mb-3">
					<Input label="Nome" name="name" value={values.name} onChange={handleChange} />
				</div>
				<div className="mb-3">
					<Input type="number" label="Idade" name="age" value={values.age.toString()} onChange={handleChange} />
				</div>
				<div className="flex justify-end">
					<Button component="button" variant="primary">
						Enviar
					</Button>
				</div>
			</form>
		</Layout>
	)
}

export default Person
