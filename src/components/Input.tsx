interface InputProps {
	readonly?: boolean
	label: string
	name: string
	type?: "text" | "number"
	value: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
	const { label, name, type = "text", value, onChange, readonly } = props

	return (
		<>
			<label htmlFor={name} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				readOnly={readonly}
				className="mt-1 block w-full shadow border border-gray-300 rounded p-2"
			/>
		</>
	)
}

export default Input
