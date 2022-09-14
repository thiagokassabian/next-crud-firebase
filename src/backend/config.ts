import { IPerson } from '../interfaces';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where, WithFieldValue, DocumentData, QueryDocumentSnapshot, getDoc, SnapshotOptions } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// Firestore data converter
const peopleConverter = {
	toFirestore: (person: WithFieldValue<IPerson>): DocumentData => {
		return { name: person.name, age: person.age };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IPerson => {
		const data = snapshot.data(options);
		return { id: snapshot.id, name: data.name, age: data.age };
	}
};

const peopleCollection = collection(db, 'people').withConverter(peopleConverter);

export const getPeople = async (): Promise<IPerson[]> => {
	const peopleSnapshot = await getDocs(peopleCollection);
	const peopleList = peopleSnapshot.docs.map(doc => doc.data());
	return peopleList;
};

export const getPerson = async (id: string): Promise<IPerson> => {
	const docRef = doc(db, "people", id);
	const docSnap = await getDoc(docRef);
	return docSnap.data() as IPerson;
};

export const addPerson = async (person: IPerson): Promise<IPerson> => {
	const docRef = await addDoc(peopleCollection, person);
	return { ...person, id: docRef.id };
};

export const updatePerson = async (id: string, person: IPerson): Promise<IPerson> => {
	const personDoc = doc(peopleCollection, id);
	await updateDoc(personDoc, person);
	return { ...person, id };
};

export const deletePerson = async (id: string): Promise<void> => {
	const personDoc = doc(peopleCollection, id);
	return await deleteDoc(personDoc);
};