type Props = {
	children: React.ReactNode;
};

export function BaseLayout({ children }: Props) {
	return <main className="min-h-screen bg-neutral-100">{children}</main>;
}
