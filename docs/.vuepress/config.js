module.exports = {
  title: '知识星球',
  description: '让记录成为一种习惯',
  base: '/my-blog-vuepress/',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '相关链接',
        items: [
          { text: 'Github', link: 'https://github.com/waitInHope/my-blog-vuepress' },
          { text: '掘金', link: 'https://juejin.cn/user/4230576477047485/posts'}
        ]
      }
    ],
    sidebar: [
      {
        title: '让记录成为一种习惯',
        path: '/',
        collapsable: false, // 是否折叠
        children: [
          { title: '首页', path: '/' }
        ]
      },
      {
        title: 'JS总结',
        path: '/js/index',
        collapsable: false,
        children: [
          { title: '最新语法', path: '/js/LatestVocabulary' },
          { title: '基础语法', path: '/js/BasicVocabulary' }
        ]
      },
      {
        title: 'Storybook',
        path: '/storybook/index',
        collapsable: false,
        children: [
          { title: '基础用法', path: '/storybook/BasicContent' }
        ]
      }
    ],
    subSidebar: 'auto'
  }
}