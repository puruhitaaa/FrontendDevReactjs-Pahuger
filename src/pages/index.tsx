import { fetchRestaurants, type TRestaurantList } from "@/api/restaurants";
import { restaurantData as restaurantDataAtom } from "@/atoms/restaurant";
import { Filters, Hero, List } from "@/components/ui";
import { BaseLayout } from "@/layouts/BaseLayout";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

export function Home() {
	const [_, setRestaurantData] = useAtom(restaurantDataAtom);
	const { isError, isLoading } = useQuery<TRestaurantList>({
		queryKey: ["restaurants"],
		queryFn: () => fetchRestaurants({ url: "/restaurants/list" }),
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			setRestaurantData(data);
		},
	});

	return (
		<BaseLayout>
			<div className="container mx-auto w-full divide-y divide-neutral-200">
				<Hero />
				<Filters />
				<List data={{ isError, isLoading }} />
			</div>
		</BaseLayout>
	);
}
