const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: 'DASHBOARDS',
  //   icon: 'mdi mdi-dots-horizontal',
  //   href: 'Dashboard',
  // },
  {
    title: 'Dashboard',
    icon: 'hard-drive',
    href: '/dashboards/dashboard3',
  },
  
  {
    navlabel: true,
    subheader: 'Health',
    icon: 'mdi mdi-dots-horizontal',    
    href: 'Apps',
  },
  {
    title: 'Patients',
    icon: 'users',
    maticon: 'people',
    href: '/health/patients',
  },
  {
    title: 'OPD',
    maticon: 'medical_services',
    href: '/health/opd',
  },
  {
    title: 'Appointments',
    icon: 'list',
    href: '/health/appointments/*',
  },

  {
    title: 'Health Practitioners',
    maticon: 'account_circle',
    href: '/health/practitioners/*',
  },
  {
    title: 'Organizations',
    maticon: 'corporate_fare',
    href: '/health/organizations/*',
  },
  {
    title: 'Configure',
    maticon: 'settings',
    href: '/configure',
  },

  {
    title: 'Customers',
    icon: 'users',
    href: '/customers',
    collapse: true,
    children: [
      {
        title: 'Lists',
        icon: 'list',
        href: '/customers/lists',
      },
      {
        title: 'Edit',
        icon: 'edit',
        href: '/customers/edit',
      },
    ],
  },
  {
    navlabel: true,
    subheader: 'PAGES',
    icon: 'mdi mdi-dots-horizontal',
    href: 'Pages',
  },
  {
    title: 'Shop',
    icon: 'shopping-cart',
    href: '/shop',
    collapse: true,
    children: [
      {
        title: 'Listing',
        icon: 'list',
        href: '/shop/lists',
      },
      {
        title: 'Detail',
        icon: 'file-text',
        href: '/shop/shop-detail',
      },
    ],
  },
  {
    title: 'Alert',
    icon: 'alert-circle',
    href: '/alert',
  },
  {
    title: 'User Profile',
    icon: 'user',
    href: '/user-profile',
  },
  {
    title: 'Quill Editor',
    icon: 'edit',
    href: '/quill-editor',
  },
  {
    title: 'Treeview',
    icon: 'git-pull-request',
    href: '/treeview',
  },
  {
    title: 'Pricing',
    icon: 'dollar-sign',
    href: '/pricing',
  },
  {
    title: 'Typography',
    icon: 'type',
    href: '/typography',
  },
  {
    title: 'Feather Icons',
    icon: 'feather',
    href: '/react-icons',
  },
  {
    title: 'Timeline',
    icon: 'clock',
    href: '/timeline',
  },
  {
    navlabel: true,
    subheader: 'FORMS',
    icon: 'mdi mdi-dots-horizontal',
    href: 'Form',
  },
  {
    title: 'Form Elements',
    icon: 'box',
    href: '/form-elements',
    collapse: true,
    children: [
      {
        title: 'Autocomplete',
        icon: 'compass',
        href: '/form-elements/autocomplete',
      },
      {
        title: 'Buttons',
        icon: 'codepen',
        href: '/form-elements/button',
      },
      {
        title: 'Checkbox',
        icon: 'check-square',
        href: '/form-elements/checkbox',
      },
      {
        title: 'Radio',
        icon: 'check-circle',
        href: '/form-elements/radio',
      },
      {
        title: 'Date Time',
        icon: 'calendar',
        href: '/form-elements/date-time',
      },
      {
        title: 'Slider',
        icon: 'git-commit',
        href: '/form-elements/slider',
      },
      {
        title: 'Switch',
        icon: 'toggle-left',
        href: '/form-elements/switch',
      },
    ],
  },
  {
    title: 'Form Layout',
    icon: 'file-text',
    href: '/form-layouts/form-layouts',
  },
  {
    title: 'Form Custom',
    icon: 'file-plus',
    href: '/form-layouts/form-custom',
  },
  {
    title: 'Form Wizard',
    icon: 'codepen',
    href: '/form-layouts/form-wizard',
  },
  {
    navlabel: true,
    subheader: 'TABLES',
    icon: 'mdi mdi-dots-horizontal',
    href: 'Table',
  },
  {
    title: 'Tables',
    icon: 'layout',
    href: '/tables',
    collapse: true,
    children: [
      {
        title: 'Basic Table',
        icon: 'disc',
        href: '/tables/basic-table',
      },
      {
        title: 'Pagination Table',
        icon: 'disc',
        href: '/tables/pagination-table',
      },
      {
        title: 'Enhanced Table',
        icon: 'disc',
        href: '/tables/enhanced-table',
      },
      {
        title: 'Collapsible Table',
        icon: 'disc',
        href: '/tables/collapsible-table',
      },
      {
        title: 'Fixed Header Table',
        icon: 'disc',
        href: '/tables/fixed-header-table',
      },
    ],
  },
  {
    navlabel: true,
    subheader: 'WIDGETS',
    icon: 'mdi mdi-dots-horizontal',
    href: 'Widgets',
  },
  {
    title: 'Widget Feed',
    icon: 'archive',
    href: '/widgets/widget-feed',
  },

  {
    title: 'Widget Apps',
    icon: 'grid',
    href: '/widgets/widget-apps',
  },
  {
    navlabel: true,
    subheader: 'CHARTS',
    icon: 'mdi mdi-dots-horizontal',
    href: 'Chart',
  },
  {
    title: 'Line Chart',
    icon: 'activity',
    href: '/charts/line-chart',
  },
  {
    title: 'Gredient Chart',
    icon: 'bar-chart',
    href: '/charts/gredient-chart',
  },
  {
    title: 'Doughnut & Pie',
    icon: 'bar-chart-2',
    href: '/charts/doughnut-pie-chart',
  },
  {
    title: 'Area Chart',
    icon: 'aperture',
    href: '/charts/area-chart',
  },
  {
    title: 'Column Chart',
    icon: 'circle',
    href: '/charts/column-chart',
  },
  {
    title: 'Candlestick Chart',
    icon: 'loader',
    href: '/charts/candlestick-chart',
  },
  {
    title: 'Radialbar & Radar',
    icon: 'octagon',
    href: '/charts/radialbar-chart',
  },
  {
    navlabel: true,
    subheader: 'AUTHENTICATION',
    icon: 'mdi mdi-dots-horizontal',
    href: 'Authentication',
  },
  {
    title: 'Log in',
    icon: 'log-in',
    href: '/auth/login',
  },
  {
    title: 'Register',
    icon: 'user-plus',
    href: '/auth/register',
  },
  {
    title: 'Reset Password',
    icon: 'refresh-ccw',
    href: '/auth/reset-password',
  },
  {
    title: 'Error',
    icon: 'alert-triangle',
    href: '/404',
  },
];

export default Menuitems;
