/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/auth/new-verification",
    "/reset-password",
    '/new-password',
    '/restaurants'
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /*.
 * @type {string[]}
 */
export const authRoutes = [
    '/sign-in',
    '/sign-up',
    '/error',
    // '/restaurants',
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/restaurants"