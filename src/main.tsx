import { Toaster } from "@/components/ui/toaster";
import { Home } from "@/pages";
import { RestaurantDetail } from "@/pages/restaurant-detail";
import "@/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	Outlet,
	Route,
	Router,
	RouterContext,
	RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

export const queryClient = new QueryClient();

const routerContext = new RouterContext<{
	queryClient: typeof queryClient;
}>();

const rootRoute = routerContext.createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<Outlet />
		</QueryClientProvider>
	),
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
});

const restaurantDetailRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/restaurants/$restaurantId",
	component: RestaurantDetail,
});

const routeTree = rootRoute.addChildren([indexRoute, restaurantDetailRoute]);

const router = new Router({
	routeTree,
	defaultPreload: "intent",
	context: { queryClient },
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
		<Toaster />
	</React.StrictMode>
);
