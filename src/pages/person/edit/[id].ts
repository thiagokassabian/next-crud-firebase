import { getPerson } from "../../../backend/config";
import PersonForm from "../../../components/PersonForm";

export default PersonForm;

export async function getServerSideProps({ params }: { params: { id: string; }; }) {
	const person = await getPerson(params.id);

	return {
		props: { person: { ...person, id: params.id } }
	};
}