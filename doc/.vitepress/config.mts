import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "冷筱华的有限迷宫",
  description: "玩家手册",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'Koishi', link: 'https://koishi.chat/zh-CN/' },
      { text: '海豹', link: 'https://dice.weizaima.com/' }
    ],

    sidebar: [
      {
        text: '插件列表',
        items: [
          { text: '海豹插件列表', link: '/sealdice_menu' },
          { text: 'Koishi插件列表', link: '/Koishi_menu' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shakugannosaints/' }
    ]
  }
})
