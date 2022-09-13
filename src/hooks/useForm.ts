import { useState } from "react";

const useForm = <T>(initialValues: T) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		});
	};

	const handleSubmit = (callback: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		callback();
		setLoading(false);
	};

	return { values, errors, isSubmitting, handleChange, handleSubmit };
};

export default useForm;
