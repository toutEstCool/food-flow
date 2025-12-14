
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { RoutePath } from "@/shared/config/routes";
import { App } from "@/App";
import { routeLoaders } from "./loader";


const HomePage = lazy(routeLoaders.home);
const FavoritesPage = lazy(routeLoaders.favorites);
const ProfilePage = lazy(routeLoaders.profile);


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: RoutePath.home,
                element: <HomePage />,
            },
            {
                path: RoutePath.favorites,
                element: <FavoritesPage />,
            },
            {
                path: RoutePath.profile,
                element: <ProfilePage />,
            },
        ],
    },
]);
