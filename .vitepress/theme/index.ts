import type { Theme } from 'vitepress';
import Layout from './Layout.vue';
import Primevue from 'primevue/config';
import Badge from './components/global/Badge.vue';
import Key from './components/global/Key.vue';
import KeyCombination from './components/global/KeyCombination.vue';
import LinkCard from './components/global/LinkCard.vue';
import './styles/index.scss';

export default {
  Layout,
  enhanceApp({ app }) {
    // Global Components
    app.component('Badge', Badge);
    app.component('Key', Key);
    app.component('KeyCombination', KeyCombination);
    app.component('LinkCard', LinkCard);

    // Prime Vue
    app.use(Primevue, { ripple: true });
  },
} satisfies Theme;
