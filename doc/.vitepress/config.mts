import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "冷筱华的有限迷宫",
  description: "玩家手册",
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'Koishi', link: 'https://koishi.chat/zh-CN/' },
      { text: '海豹', link: 'https://dice.weizaima.com/' },
      { text: '塞壬唱片', link: 'https://monster-siren.hypergryph.com/' }
    ],

    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      '/Koishi/': [
        {
          text: 'Koishi',
          items: [
            { text: '去看海豹', link: '/sealdice/sealdice_menu' },
            { text: 'DungerCrafter', link: '/Koishi/DungeonCrafter' },
            { text: '没有别的啦！' }
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
            { text: '没有别的啦！' }
          ]
         }
       ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shakugannosaints/' }
    ],
    
    editLink: {
      pattern: 'https://github.com/IceMoeMoe/bot_document/tree/master/doc:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }

  })
