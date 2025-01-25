import Image from 'next/image';
import { accountImage } from '@/assets';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import Orders from './orders';
import Address from './address';

function ShoppingAccount() {
	return (
		<div className="flex flex-col">
			<div className="relative h-[300px] w-full overflow-hidden">
				<Image
					src={accountImage}
					alt={'account image'}
					priority
					className="object-cover object-center w-full h-full"
				/>
			</div>
			<div className="container mx-auto grid grid-cols-1 gap-8 py-8">
				<div className="flex flex-col rounded-lg border shadow-sm bg-background p-6">
					<Tabs defaultValue="orders">
						<TabsList>
							<TabsTrigger value="orders">Orders</TabsTrigger>
							<TabsTrigger value="address">Address</TabsTrigger>
						</TabsList>
						<TabsContent value="orders">
							<Orders />
						</TabsContent>
						<TabsContent value="address">
							<Address />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default ShoppingAccount;
