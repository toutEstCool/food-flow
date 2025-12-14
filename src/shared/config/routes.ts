export const AppRoutes = {
    HOME: 'home',
    FAVORITES: 'favorites',
    PROFILE: 'profile',
    NOT_FOUND: 'not_found'
} as const;

export type AppRoutesType = typeof AppRoutes[keyof typeof AppRoutes];

export const getRouteHome = () => '/';
export const getRouteFavorites = () => '/favorites';
export const getRouteProfile = () => '/profile';

export const RoutePath: Record<AppRoutesType, string> = {
    [AppRoutes.HOME]: getRouteHome(),
    [AppRoutes.FAVORITES]: getRouteFavorites(),
    [AppRoutes.PROFILE]: getRouteProfile(),
    [AppRoutes.NOT_FOUND]: '*'
};
