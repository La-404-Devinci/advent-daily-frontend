import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Calendrier de l\'avent',
                short_name: 'Calendrier',
                description: 'Gagne des points en participant à des défis organisés par différentes associations au pôle Léonard de Vinci.',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#1D4ED8',
                "icons": [
                    {
                        "src": "/pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "/pwa-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "/pwa-maskable-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "maskable"
                    },
                    {
                        "src": "/pwa-maskable-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ],
                scope: '/',
                orientation: 'portrait',
                lang: 'fr-FR',
            },
        }),
    ],
});