import { type TRestaurant } from "@/api/restaurants";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/utils/tailwind";
import { useNavigate } from "@tanstack/react-router";
import { Star, Status } from ".";

type Props = {
	from: "/";
	to: string;
	restaurant: TRestaurant;
} & React.HTMLAttributes<HTMLDivElement>;

export const RestaurantCard = ({ className, from, restaurant, to }: Props) => {
	const navigate = useNavigate({ from });
	const { toast } = useToast();

	const handleClick = () => {
		restaurant.name
			? navigate({ to, params: { restaurantId: restaurant.raw_ranking } })
			: toast({
					duration: 3000,
					variant: "destructive",
					title: "Malformed data.",
					description: "Source data was somehow invalid.",
			  });
	};

	return (
		<div
			onClick={handleClick}
			className={cn(
				"space-y-2 shadow-md p-2",
				restaurant.name &&
					"hover:scale-105 transition-transform cursor-pointer ease-out group",
				className
			)}
		>
			{restaurant.name ? (
				restaurant.photo?.images ? (
					<div className="relative h-32">
						{restaurant?.price && (
							<div className="group-hover:absolute group-hover:flex hidden h-full w-full inset-0 m-auto scale-x-0 group-hover:scale-x-100 bg-neutral-900/50 ease-out duration-300 transition-colors items-center justify-center">
								<h6 className="text-lg font-semibold text-white -skew-x-12">
									{restaurant.price}
								</h6>
							</div>
						)}
						<img
							className="h-full object-cover w-full"
							src={restaurant.photo.images.medium.url}
							alt={restaurant.name}
							loading="lazy"
						/>
					</div>
				) : null
			) : (
				<span className="h-32 w-full bg-neutral-400 text-lg text-white font-semibold flex items-center justify-center">
					Image unavailable
				</span>
			)}

			<h6 className="truncate text-sm">
				{restaurant.name || "Name unavailable"}
			</h6>

			<Star rating={restaurant?.rating ? parseInt(restaurant.rating) : 0} />
			<div className="flex items-center justify-between">
				<p className="text-xs text-neutral-500">
					{restaurant?.cuisine?.[0]?.name || "NaN"} •{" "}
					{restaurant.price_level || "$"}
				</p>
				<Status
					isOpen={
						restaurant?.is_closed !== undefined ? !restaurant.is_closed : false
					}
				/>
			</div>

			<button
				className="bg-yellow-500 hover:bg-yellow-700 transition-colors ease-out duration-300 text-sm text-white w-full p-2 uppercase disabled:bg-neutral-500"
				disabled={!restaurant.name}
			>
				Learn more
			</button>
		</div>
	);
};
