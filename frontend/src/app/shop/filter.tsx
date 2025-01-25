import React, { Fragment, ReactNode } from 'react';
import { filterOptions } from './config';
import { FilterSubOption, ProductFilterProps } from './types';
import { Checkbox, Separator } from '@/components';

function ProductFilter({ filters = {}, handleFilters }: ProductFilterProps) {
	return (
		<div className="bg-background rounded-lg shadow-sm hidden lg:block">
			<div className="p-4 border-b">
				<h2 className="text-lg font-extrabold">Filters</h2>
			</div>
			<div className="p-4 space-y-4">
				{Object.keys(filterOptions).map((keyItem: string): ReactNode => {
					return (
						<Fragment key={keyItem}>
							<div>
								<h3 className="text-base font-bold">{keyItem}</h3>
								<div className="grid gap-2 mt-2">
									{filterOptions[keyItem as keyof typeof filterOptions].map(
										(option: FilterSubOption): ReactNode => {
											return (
												<label
													key={option.id}
													className="text-sm flex items-center gap-2 font-medium"
												>
													<Checkbox
														checked={
															// retaining filter options even refreshing page
															(filters &&
																Object.keys(filters).length > 0 &&
																filters[keyItem] &&
																filters[keyItem].includes(option.id)) ||
															false
														}
														onCheckedChange={() =>
															handleFilters(keyItem, option.id)
														}
													/>
													{option.label}
												</label>
											);
										}
									)}
								</div>
							</div>
							<Separator />
						</Fragment>
					);
				})}
			</div>
		</div>
	);
}

export default ProductFilter;
