'use client';
import { StarIcon } from 'lucide-react';
import { RatingsProps } from './types';

function Ratings({ rating }: RatingsProps) {
	return [1, 2, 3, 4, 5].map((star: number) => (
		<StarIcon
			key={star}
			className={`w-5 h-5 ${star <= rating ? 'fill-yellow-500' : 'fill-black'}`}
		/>
	));
}

export default Ratings;
