export default defineAppConfig({
  nuxtIcon: {},
  nui: {
    defaultShapes: {},
  },
  tairo: {
    title: 'Home',
    sidebar: {
      toolbar: {
        showNavBurger: true,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              disableTransitions: true,
            },
          },
          {
            component: 'DemoToolbarLanguage',
          },
          {
            component: 'DemoToolbarNotifications',
          },
          {
            component: 'DemoToolbarActivity',
          },
          {
            component: 'DemoToolbarAccountMenu',
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: 'DemoCircularMenuLanguage',
          },
          {
            component: 'DemoCircularMenuNotifications',
          },
          {
            component: 'DemoCircularMenuActivity',
          },
        ],
      },
      navigation: {
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 h-10' },
        },
        items: [
          {
            title: 'Captures',
            icon: { name: 'ph:sidebar-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'SubsidebarCaptures' },
            activePath: '/captures',
          },
          {
            title: 'Layouts',
            icon: { name: 'ph:app-window-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'DemoSubsidebarLayouts' },
            activePath: '/layouts',
          },
          {
            title: 'Settings',
            icon: { name: 'ph:gear-duotone', class: 'w-5 h-5' },
            to: '/dashboards/messaging',
          },
          {
            title: 'Customize',
            icon: { name: 'ph:drop-half-bottom-duotone', class: 'w-5 h-5' },
            click: () => {
              const isOpen = useState('switcher-open', () => false)
              isOpen.value = true
            },
            position: 'end',
          },
          {
            title: 'Search',
            icon: { name: 'ph:magnifying-glass-duotone', class: 'w-5 h-5' },
            click: () => {
              const isOpen = useState('search-open', () => false)
              isOpen.value = true
            },
            position: 'end',
          },
          {
            title: 'Settings',
            icon: { name: 'ph:gear-six-duotone', class: 'w-5 h-5' },
            to: '/layouts/profile-settings',
            position: 'end',
          },
          {
            title: 'My Account',
            component: 'DemoAccountMenu',
            position: 'end',
          },
        ],
      },
    },
    panels: [
      {
        name: 'mypanel',
        position: 'right',
        component: 'DemoPanelTask',
      },
    ],
    collapse: {
      circularMenu: {
        enabled: false,
        tools: [],
      },
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: true,
        tools: [
          // {
          //   component: 'DemoToolbarLanguage',
          // },
          // {
          //   component: 'DemoToolbarNotifications',
          // },
          // {
          //   component: 'DemoToolbarActivity',
          // },
          {
            component: 'DemoThemeToggle',
          },
          {
            component: 'DemoToolbarAccountMenu',
          },
        ],
      },
      navigation: {
        enabled: true,
        items: [
          {
            name: 'Capturerr',
            icon: { name: 'ph:house-duotone', class: 'w-5 h-5' },
            to: '/',
          },
          {
            name: 'Divider',
            divider: true,
          },
          {
            name: 'Captures',
            icon: { name: 'ph:pencil-duotone', class: 'w-5 h-5' },
            to: '/captures',
          },
          {
            name: 'Users',
            icon: { name: 'ph:user-duotone', class: 'w-5 h-5' },
            to: '/users',
          },
          {
            name: 'Tags',
            icon: { name: 'ph:tag-duotone', class: 'w-5 h-5' },
            to: '/tags',
          },
          {
            name: 'Search',
            icon: { name: 'ph:magnifying-glass-duotone', class: 'w-5 h-5' },
            to: '/search',
          },
          {
            name: 'Divider',
            divider: true,
          },
          {
            name: 'Sign Up',
            icon: { name: 'ph-user-plus', class: 'w-5 h-5' },
            to: '/auth/signup-1',
          },
          {
            name: 'Login',
            icon: { name: 'ph:sign-in-duotone', class: 'w-5 h-5' },
            to: '/auth/login-1',
          },
          {
            name: 'Forgot Password',
            icon: { name: 'ph:recycle-duotone', class: 'w-5 h-5' },
            to: '/auth/forgot-password',
          },
          {
            name: 'Logout',
            icon: { name: 'ph:sign-out-duotone', class: 'w-5 h-5' },
            to: '/auth/logout',
          },
          {
            name: 'About',
            icon: { name: 'ph:question-duotone', class: 'w-5 h-5' },
            to: '/about',
          },
          {
            name: 'Settings',
            icon: { name: 'ph:gear-six-duotone', class: 'w-5 h-5' },
            to: '/settings',
          },

          {
            name: 'Divider',
            divider: true,
          },
          {
            name: 'Admin Tools',
            icon: { name: 'ph:hammer-duotone', class: 'w-5 h-5' },
            to: '/sandbox',
          },
        ],
      },
    },
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 h-10 w-10' },
        },
        header: {},
        items: [
          {
            name: 'Home',
            icon: { name: 'ph:house-duotone', class: 'w-6 h-6' },
            activePath: '/',
            to: '/',
          },
          {
            name: 'Captures',
            icon: { name: 'ph:gauge-duotone', class: 'w-6 h-6' },
            activePath: '/captures',
            to: '/captures',
          },
          {
            name: 'Captures - Table',
            icon: { name: 'ph:gauge-duotone', class: 'w-6 h-6' },
            activePath: '/captures/table',
            to: '/captures/table',
          },
          {
            name: 'Search',
            icon: { name: 'ph:magnifying-glass-duotone', class: 'w-6 h-6' },
            activePath: '/search',
            to: '/search',
          },
          {
            name: 'Settings',
            icon: { name: 'ph:gear-six-duotone', class: 'w-6 h-6' },
            activePath: '/users/profile',
            to: '/users/profile',
          },
          {
            name: 'About',
            icon: { name: 'ph:notification-duotone', class: 'w-6 h-6' },
            activePath: '/about',
            to: '/about',
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: 'DemoCircularMenuLanguage',
          },
          {
            component: 'DemoCircularMenuNotifications',
          },
          {
            component: 'DemoCircularMenuActivity',
          },
        ],
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              disableTransitions: true,
            },
          },
          {
            component: 'DemoToolbarSearch',
          },
          {
            component: 'DemoToolbarCustomize',
          },
          {
            component: 'DemoToolbarNotifications',
          },
          {
            component: 'DemoAccountMenu',
            props: {
              horizontal: true,
            },
          },
        ],
      },
      footer: {
        enabled: true,
        logoSeparator: {
          component: 'TairoLogo',
          props: { class: 'text-primary-500 h-7 w-7' },
        },
        logo: {
          component: 'TairoLogoText',
          props: {
            class:
              'text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0',
          },
        },
        copyright: {
          name: 'Mizzle Bizzle',
          to: 'https://bittfurst.xyz',
          since: '2023',
        },
        links: [
          {
            name: 'Support',
            to: 'https://cssninja.io/faq/support',
            rel: 'noopener',
            target: '_blank',
          },
        ],
      },
    },
  },
})
