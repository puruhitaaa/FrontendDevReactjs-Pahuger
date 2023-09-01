import { restaurantData as restaurantDataAtom } from "@/atoms/restaurant";
import { Star } from "@/components";
import { DetailSection } from "@/components/ui";
import { BaseLayout } from "@/layouts/BaseLayout";
import { useParams } from "@tanstack/react-router";
import { useAtom } from "jotai";

export function RestaurantDetail() {
	const { restaurantId } = useParams({ from: "/" });
	const [data, _] = useAtom(restaurantDataAtom);

	const restaurantDetail = data.find((val) => val.raw_ranking === restaurantId);

	return (
		<BaseLayout>
			<div>
				<section>
					<div className="h-64 relative">
						<img
							className="h-full w-full object-cover"
							src={restaurantDetail?.photo.images.large.url}
							alt={restaurantDetail?.name}
						/>
						<div className="h-full w-full inset-0 m-0 flex flex-col items-center justify-center absolute bg-black/50 gap-4">
							<h1 className="text-2xl text-center md:text-4xl font-semibold text-white">
								{restaurantDetail?.name}
							</h1>

							<Star
								className="h-5 w-5"
								rating={parseInt(restaurantDetail?.rating!)}
							/>

							<span className="text-xs md:text-sm text-center bg-white font-semibold p-2">
								{restaurantDetail?.address}
							</span>
						</div>
					</div>
				</section>

				<section className="container mx-auto">
					<DetailSection title="Related">
						<div className="p-4 gap-4 flex flex-col">
							<div className="flex md:items-center flex-col sm:flex-row gap-4 text-sm w-full">
								<p className="font-semibold">Link:</p>
								<a
									className="text-blue-500 max-w-sm truncate w-full"
									href={restaurantDetail?.web_url}
									target="_blank"
									rel="noreferrer noopener"
								>
									{restaurantDetail?.web_url}
								</a>
							</div>
							<div className="flex md:items-center flex-col sm:flex-row gap-4 text-sm w-full">
								<p className="font-semibold">Timezone:</p>
								<p className="max-w-sm truncate w-full">
									{restaurantDetail?.timezone}
								</p>
							</div>
						</div>
					</DetailSection>

					<DetailSection title="Story">
						<p className="text-neutral-600 md:p-4">
							{restaurantDetail?.description}
						</p>
					</DetailSection>

					{restaurantDetail?.cuisine?.length ? (
						<DetailSection title="Categories">
							<div className="flex items-center gap-4 w-full md:pl-4 pr-4 py-4 overflow-auto">
								{restaurantDetail?.cuisine?.map((cuis) => (
									<span
										className="text-neutral-600 hover:scale-105 transition-transform text-sm lg:text-base bg-white shadow-md rounded-full px-6 py-2"
										key={cuis.key}
									>
										{cuis.name}
									</span>
								))}
							</div>
						</DetailSection>
					) : null}
				</section>
			</div>
		</BaseLayout>
	);
}
