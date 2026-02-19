import { useUserStore } from '@/stores/useUserStore';
import type { App, Plugin } from 'vue';
import type { Router } from 'vue-router';
import { RouteNames } from '@/router';

interface AuthPluginOptions {
    router: Router;
}

const authPlugin: Plugin = {
    install(app: App, options: AuthPluginOptions) {

        const { router } = options;
        const userStore = useUserStore();

        router.beforeResolve(async (to) => {
            if (to.meta.requiresAuth) {
                if (!userStore.isLoggedIn) {
                    return {
                        name: RouteNames.Login,
                    };
                }
            }
        });
    }
};

export default authPlugin;