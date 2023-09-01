import { cn } from "@/utils/tailwind";

type Props = {
	isOpen: boolean;
};

export const Status = ({ isOpen }: Props) => {
	const Indicator = () => (
		<span
			className={cn(
				"h-3 w-3 block rounded-full",
				isOpen ? "bg-green-500" : "bg-red-500"
			)}
		/>
	);

	return (
		<div className="flex items-center gap-2">
			<Indicator />
			<p className="uppercase text-xs text-neutral-500">
				{!isOpen ? "Closed" : "Open now"}
			</p>
		</div>
	);
};
