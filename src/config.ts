import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Fuwari',
  subtitle: 'Demo Site',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th' 语言选项
  themeColor: {
    hue: 250,         // 主题颜色的默认色调，从0到360。例如：红色: 0，青色: 200，蓝绿色: 250，粉色: 345
    fixed: false,     // 隐藏访客的主题颜色选择器
  },
  banner: {
    enable: false,
    src: 'assets/images/demo-banner.png',   // 相对于/src目录。如果以'/'开头，则相对于/public目录
    position: 'center',      // 等同于object-position，仅支持'top', 'center', 'bottom'。默认值为'center'
    credit: {
      enable: false,         // 显示横幅图片的版权文字
      text: '',              // 要显示的版权文字
      url: ''                // （可选）指向原始作品或艺术家页面的URL链接
    }
  },
  toc: {
    enable: true,           // 在文章右侧显示目录
    depth: 2                // 目录中显示的最大标题深度，从1到3
  },
  favicon: [    // 将此数组留空以使用默认的favicon
    // {
    //   src: '/favicon/icon.png',    // favicon的路径，相对于/public目录
    //   theme: 'light',              // （可选）'light'或'dark'，仅在你有不同模式的favicon时设置
    //   sizes: '32x32',              // （可选）favicon的大小，仅在你有不同大小的favicon时设置
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/saicaca/fuwari',     // 内部链接不应包含基础路径，因为它会自动添加
      external: true,                               // 显示外部链接图标并将在新标签页中打开
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/demo-avatar.png',  // 相对于/src目录。如果以'/'开头，则相对于/public目录
  name: 'Lorem Ipsum',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  links: [
    {
      name: 'Twitter',
      icon: 'fa6-brands:twitter',       // 访问https://icones.js.org/获取图标代码
                                        // 如果尚未包含相应的图标集，你需要安装它
                                        // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://twitter.com',
    },
    {
      name: 'Steam',
      icon: 'fa6-brands:steam',
      url: 'https://store.steampowered.com',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/saicaca/fuwari',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
