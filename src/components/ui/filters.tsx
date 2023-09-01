import {
	category as categoryAtom,
	isOpen as isOpenAtom,
	limit as limitAtom,
	price as priceAtom,
	restaurantData as restaurantDataAtom,
} from "@/atoms/restaurant";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/tailwind";
import { useAtom } from "jotai";
import { Toggle } from "./toggle";

const priceValues = [
	{
		id: 1,
		value: "2000",
	},
	{
		id: 2,
		value: "4000",
	},
	{
		id: 3,
		value: "6000",
	},
	{
		id: 4,
		value: "8000",
	},
	{
		id: 5,
		value: "10000",
	},
];

export const Filters = () => {
	const [limit, setLimit] = useAtom(limitAtom);
	const [data, _] = useAtom(restaurantDataAtom);
	const [isOpen, setIsOpen] = useAtom(isOpenAtom);
	const [price, setPrice] = useAtom(priceAtom);
	const [category, setCategory] = useAtom(categoryAtom);

	const onPriceChange = (e: string) => {
		setPrice(e);
	};

	const onIsOpenChange = (e: boolean) => {
		setIsOpen(!e);
	};

	const onCategoryChange = (e: string) => {
		setCategory(e);
	};

	const handleClear = () => {
		if (price) setPrice("");
		if (limit) setLimit(8);
		if (isOpen) setIsOpen(false);
		if (category) setCategory("");
	};

	return (
		<section className="p-4 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between">
			<div className="flex flex-col sm:flex-row sm:items-center gap-4">
				<div>
					<h6 className="text-neutral-500 hidden md:block">Filter By</h6>
				</div>

				<Toggle
					aria-label="Is open"
					className="flex items-center w-fit h-fit py-2 gap-2 md:gap-4 ring-1 ring-neutral-200"
					onPressedChange={onIsOpenChange}
				>
					<span
						className={cn(
							"block h-2.5 w-2.5 rounded-full",
							isOpen ? "bg-green-500" : "ring-1 ring-neutral-500"
						)}
					/>

					<p className="text-sm font-normal">Is Open</p>
				</Toggle>

				<Select onValueChange={onPriceChange}>
					<SelectTrigger className="w-[180px] shadow-none">
						<SelectValue placeholder="Price" />
					</SelectTrigger>

					<SelectContent>
						{priceValues.map((val) => (
							<SelectItem key={val.id} value={val.value}>
								Under ${val.value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select onValueChange={onCategoryChange}>
					<SelectTrigger className="w-[180px] shadow-none">
						<SelectValue placeholder="Categories" />
					</SelectTrigger>

					<SelectContent className="overflow-y-auto max-h-44">
						{[
							...new Set(
								data
									?.map((dt) => [
										...new Set(dt.cuisine?.map((cui) => cui.name)),
									])
									.reduce((accumulator, currentArray) => {
										return accumulator.concat(currentArray);
									}, [])
							),
						].map((item) => (
							<SelectItem key={item} value={item}>
								{item}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{(price || limit > 8 || isOpen || category) && (
				<button
					className="uppercase ring-red-500 ring py-2 px-8 transition-colors ease-out duration-300 hover:bg-red-500 hover:text-white text-red-500 text-sm"
					onClick={handleClear}
				>
					Clear
				</button>
			)}
		</section>
	);
};
