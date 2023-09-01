import { cn } from "@/utils/tailwind";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className }: Props) => {
	return (
		<div className={cn("animate-pulse block bg-neutral-400", className)} />
	);
};
