type Props = {
	title: string;
	children: React.ReactNode;
};

export const DetailSection = ({ title, children }: Props) => {
	return (
		<div className="p-4 flex flex-col gap-4">
			<div className="bg-black px-6 py-1 w-full md:w-fit">
				<h4 className="text-2xl font-semibold text-white">{title}</h4>
			</div>

			{children}
		</div>
	);
};
