
export const routeLoaders = {
    home: () => import("@/pages/home").then((module) => ({ default: module.HomePage })),
    favorites: () => import("@/pages/favorites").then((module) => ({ default: module.FavoritesPage })),
    profile: () => import("@/pages/profile").then((module) => ({ default: module.ProfilePage })),
};

export const prefetchRoutes = () => {
    // Preload routes after a short delay to prioritize initial render
    setTimeout(() => {
        Object.values(routeLoaders).forEach((loader) => {
            try {
                loader();
            } catch (error) {
                console.error("Failed to preload route:", error);
            }
        });
    }, 2000);
};
