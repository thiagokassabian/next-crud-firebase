// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '../../interfaces';

type Data = {
	name: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<IPerson>
) {
	if (req.method === 'POST') {
		// Process a POST request
		const { name, age } = req.body;
		res.status(200).json({ name, age });
	} else {
		// Handle any other HTTP method
		res.status(200).json({ id: '1', name: 'John Doe', age: 30 });
	}
}