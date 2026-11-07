import type { HeadConfig } from 'vitepress'

const headConfig: HeadConfig[] = [
  ['meta', { name: 'darkreader-lock' }],
  ['meta', { name: 'theme-color', content: '#0d1520' }],
  ['meta', { name: 'msapplication-TileColor', content: '#0d1520' }],
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  ['link', { rel: 'icon', type: 'image/x-icon', href: '/img/shio.png' }],
  ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/shio.png' }],
  ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/shio.png' }],
  ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  ['link', { rel: 'mask-icon', href: '/img/shio.png', color: '#7b9cbf' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/shio.png' }],
  ['meta', { name: 'twitter:card', content: 'summary' }],
  ['meta', { name: 'twitter:site', content: '@shio' }],
  ['meta', { name: 'twitter:creator', content: '@shio' }],
  ['meta', { property: 'og:site_name', content: 'Shio' }],
  ['meta', { property: 'og:description', content: 'Discover and read manga, webtoons, comics, and more – easier than ever on your Android device.' }],
  ['meta', { property: 'og:locale', content: 'en_US' }],
  ['meta', { property: 'og:type', content: 'website' }],
]

export default headConfig
