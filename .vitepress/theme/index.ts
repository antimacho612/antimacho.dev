// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress';
import Layout from './Layout.vue';
import Primevue from 'primevue/config';

import Badge from './components/global/Badge.vue';

// import 'the-new-css-reset/css/reset.css';

import './styles/index.scss';

// import 'primevue/resources/themes/lara-dark-purple/theme.css';

// import './styles/variables.scss';

import './styles/components/custom-block.scss';
import './styles/components/vp-doc.scss';
import './styles/components/vp-code.scss';
import './styles/components/vp-code-group.scss';

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('Badge', Badge);
    app.use(Primevue, { ripple: true });
  },
} satisfies Theme;
