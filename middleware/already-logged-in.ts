export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser();

    const toast = useToast();

    // redirect the user to the login page
    if (user) {
        return navigateTo({
            path: '/home',
        })
    }
})