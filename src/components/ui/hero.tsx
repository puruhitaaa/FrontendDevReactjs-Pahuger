export const Hero = () => {
	return (
		<section className="md:h-44 flex justify-between items-center p-4">
			<div className="flex flex-col gap-5">
				<h1 className="text-3xl font-semibold">Restaurants</h1>
				<p className="max-w-lg text-sm">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut iure
					repudiandae earum suscipit, velit quidem non corrupti tenetur sapiente
					distinctio dolorem laboriosam optio totam praesentium assumenda ipsa
					consectetur enim fugiat.
				</p>
			</div>

			<img
				alt="restaurant"
				className="h-24 hidden md:block"
				src="https://rb.gy/3ylrp"
				loading="eager"
			/>
		</section>
	);
};
