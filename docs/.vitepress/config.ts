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
      '/sealdice/': [
        {
          text: 'SealDice 介绍',
          link: '/sealdice/'
        },
        {
          text: 'SealDice 插件',
          base: '/sealdice/',
          items: [
            { text: 'GPTScript', link: 'gpt-scripts' },
            { text: '5eSpells', link: '5e-spells' },
            { text: 'runCode', link: 'run-code' },
            { text: '可开关复读机', link: 'repeater' }
          ]
        },
        {
          text: '去看 Koishi',
          link: '/koishi/'
        }
      ],
      '/koishi/': [
        {
          text: 'Koishi 介绍',
          link: '/koishi/'
        },
        {
          text: 'Koishi 插件',
          base: '/koishi/',
          items: [
            { text: 'DungerCrafter', link: 'dungeon-crafter' },
            { text: '5eSearch', link: '5e-search' }
          ]
        },
        {
          text: '去看 SealDice',
          link: '/sealdice/'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shakugannosaints/' }
    ],

    editLink: {
      text: '在 GitHub 上编辑此页面',
      pattern: 'https://github.com/IceMoeMoe/bot-documents/edit/main/docs/:path'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: 'deep'
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
