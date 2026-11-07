import type { DefaultTheme } from 'vitepress'

import nav from './navigation/navbar'
import sidebar from './navigation/sidebar'

const themeConfig: DefaultTheme.Config = {

  logo: {
    src: '/img/shio.png',
    width: 24,
    height: 24,
  },

  nav,
  sidebar,

  outline: [2, 3],

  footer: {
    message: '<a href="/privacy/">Privacy policy</a>',
    copyright: `Copyright © ${new Date().getFullYear()} Shio`,
  },

  lastUpdated: {
    text: 'Last updated',
    formatOptions: {
      forceLocale: true,
      dateStyle: 'long',
      timeStyle: 'short',
    },
  },
}

export default themeConfig
