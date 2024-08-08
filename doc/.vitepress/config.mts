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

    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      '/Koishi/': [
        {
          text: 'Koishi',
          items: [
            { text: '去看海豹', link: '/sealdice/sealdice_menu' },
            { text: 'DungerCrafter', link: '/Koishi/DungeonCrafter' },
            { text: '没有别的啦！', link: 'https://ak.hypergryph.com/' }
          ]
        }
      ],
       // 当用户位于 `config` 目录时，会显示此侧边栏
       '/sealdice/': [
        {
          text: 'sealdice',
          items: [
            { text: '去看Koishi', link: '/Koishi/Koishi_menu' },
            { text: 'GPTScript', link: '/sealdice/GPTscripts' },
            { text: '5eSpells', link: '/sealdice/5eSpells' },
            { text: 'runCode', link: '/sealdice/runCode' },
            { text: '可开关复读机', link: '/sealdice/repeater' },
            { text: '没有别的啦！', link: 'https://ak.hypergryph.com/'}
          ]
         }
       ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shakugannosaints/' }
    ]
  }
})
