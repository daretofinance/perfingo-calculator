import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";
import icon from "astro-icon";
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), 
                react(), 
                icon(),
                partytown({
                  config: {
                    forward: ['dataLayer.push'],
                  }
                })
              ]
});