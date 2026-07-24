import { createInertiaApp } from '@inertiajs/vue3';

const appName = import.meta.env.VITE_APP_NAME || 'Archon';

createInertiaApp({
    title: (title: string) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#CB9F53',
    },
});
