import { TRestaurant } from "@/api/restaurants";
import {
	category as categoryAtom,
	isOpen as isOpenAtom,
	limit as limitAtom,
	price as priceAtom,
	restaurantData as restaurantDataAtom,
} from "@/atoms/restaurant";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { RestaurantCard, Skeleton } from "..";

type Props = {
	data: {
		isError: boolean;
		isLoading: boolean;
	};
};

export const List = ({ data: { isError, isLoading } }: Props) => {
	const [restaurantData, ___] = useAtom(restaurantDataAtom);
	const [limit, setLimit] = useAtom(limitAtom);
	const [price, _] = useAtom(priceAtom);
	const [isOpen, __] = useAtom(isOpenAtom);
	const [category, ____] = useAtom(categoryAtom);

	const onFilter = useCallback(
		(val: TRestaurant) => {
			let itemMaxPrice = parseInt(
				val?.price?.split("-")[1]?.replace(/,/g, "")?.split("$")[1],
				10
			);
			let condition = true;

			if (price) {
				condition = condition && itemMaxPrice < parseInt(price);
				if (!category) return condition;
			}

			if (category) {
				condition =
					condition && val?.cuisine?.map((val) => val.name).includes(category);
				return condition;
			}

			return true;
		},
		[price, category]
	);

	const filteredData = restaurantData
		.slice(0, limit)
		.filter(onFilter)
		.sort((a, b) => {
			if (isOpen) {
				if (!a.is_closed && b.is_closed === undefined) return -1;
				if (a.is_closed === undefined && !b.is_closed) return 1;
			} else {
				if (!a.is_closed && b.is_closed === undefined) return 1;
				if (a.is_closed === undefined && !b.is_closed) return -1;
			}

			return 0;
		});

	const onLoadMore = () => {
		setLimit((prevState) =>
			prevState + 8 < 30 ? prevState + 8 : prevState + 30 - prevState
		);
	};

	return (
		<section className="p-4 flex flex-col gap-4">
			<div className="flex flex-col">
				<h5 className="text-xl font-semibold gap-1 inline-flex">
					All Restaurants
					{!isLoading ? (
						filteredData ? (
							<span>({filteredData.length})</span>
						) : (
							""
						)
					) : null}
				</h5>
				{limit ? <p className="text-xs">Limit set to {limit}</p> : null}
			</div>

			{!isError ? (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
						{!isLoading
							? restaurantData?.length
								? filteredData.map((rest) => (
										<RestaurantCard
											key={rest.raw_ranking}
											restaurant={rest}
											from="/"
											to="/restaurants/$restaurantId"
										/>
								  ))
								: ""
							: Array.from([1, 2, 3, 4, 5, 6, 7, 8], (val) => ({
									id: val,
									value: val,
							  })).map((item) => (
									<div key={item.id} className="flex flex-col p-2 space-y-2">
										<Skeleton className="h-32 w-full" />
										<Skeleton className="h-5 w-full" />
										<Skeleton className="h-2.5 w-32" />
										<Skeleton className="h-2.5 w-full" />
										<Skeleton className="h-10 w-full" />
									</div>
							  ))}
					</div>
					{!isLoading
						? filteredData
							? 30 - limit > 0 && (
									<button
										className="uppercase self-center w-fit py-2 px-6 text-sm text-blue-500 ring ring-blue-500 transition-colors ease-out duration-300 hover:text-white hover:bg-blue-500"
										onClick={onLoadMore}
									>
										Load more
									</button>
							  )
							: null
						: null}
				</>
			) : (
				<h2 className="text-3xl font-semibold text-center">
					Something went wrong...
				</h2>
			)}
		</section>
	);
};
