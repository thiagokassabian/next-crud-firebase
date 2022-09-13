import Person from "../add";

export default Person;

export async function getServerSideProps({ params }: { params: { id: string; }; }) {
	// const person = await userService.getById(params.id);
	console.log(params.id);

	return {
		props: {}
	};
}