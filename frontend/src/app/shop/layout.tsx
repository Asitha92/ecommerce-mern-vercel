import CheckAuthentication from '@/utils/checkAuth/CheckAuthentication';
import ShoppingHeader from './header';
import { ShoppingViewLayoutProps } from './types';

function ShoppingLayout({ children }: ShoppingViewLayoutProps) {
	return (
		<CheckAuthentication>
			<div className="flex flex-col overflow-hidden bg-white">
				{/* common header */}
				<ShoppingHeader />
				<div className="flex flex-col w-full">
					<main>{children}</main>
				</div>
			</div>
		</CheckAuthentication>
	);
}

export default ShoppingLayout;
