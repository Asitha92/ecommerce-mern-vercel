import { Dispatch, SetStateAction } from 'react';

export type ProductDetailDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	product: Record<string, string | null> | null;
};
