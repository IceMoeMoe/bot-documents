import { defineConfig } from 'vitepress'

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  title: "冷筱华的有限迷宫",
  description: "玩家手册",
  lang: "zh-CN",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/zh/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'Koishi', link: 'https://koishi.chat' },
      { text: '海豹', link: 'https://dice.weizaima.com' },
      { text: '塞壬唱片', link: 'https://monster-siren.hypergryph.com' }
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
            { text: 'GPTScript', link: 'gpt-script' },
            { text: '5eSpells', link: '5e-spells' },
            { text: 'RunCode', link: 'run-code' },
            { text: '可开关复读机', link: 'repeater' },
            { text: 'note', link: 'note'}
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
            { text: '5eSearch', link: '5e-search' },
            { text: 'weather-nmc', link: 'weather-nmc' },
            { text: '太长不看', link: 'tldr'}
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

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '输入',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
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
