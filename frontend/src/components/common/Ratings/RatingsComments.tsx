'use client';
import { Button } from '@/components';
import { StarIcon } from 'lucide-react';
import { RatingCommentsProps } from './types';

function RatingCommentsComponent({
	rating,
	handleRatingChange,
}: RatingCommentsProps) {
	return [1, 2, 3, 4, 5].map((star: number) => (
		<Button
			key={star}
			className={`p-2 rounded-full transition-colors ${
				star <= rating
					? 'text-yellow-500 hover:bg-black'
					: 'text-black hover:bg-primary hover:text-primary-foreground'
			}`}
			variant="outline"
			size="icon"
			onClick={() => handleRatingChange(star)}
		>
			<StarIcon
				className={`w-6 h-6 ${
					star <= rating ? 'fill-yellow-500' : 'fill-black'
				}`}
			/>
		</Button>
	));
}

export default RatingCommentsComponent;
