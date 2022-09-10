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
    href: '/dashboard',
  },
  {
      navlabel: true ,
      title:'Doctors Desk',
      maticon:'medical_information',
      children:[
        {
          title:'My Patients',         
          href:'/doctor/patients'
        },
        {
          title:'Availability',         
          href:'/doctor/schedule'
        },
        {
          title:'Messages',         
          href:'/doctor/messages'
        },
      ]
  },
  {
    title:'Nurse Desk',
    href:'/nurse',
    maticon:'vaccines'
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
    href: '/health/appointments',
  },

  {
    title: 'Health Practitioners',
    maticon: 'account_circle',
    href: '/health/practitioners',
  },
  {
    title: 'Organizations',
    maticon: 'corporate_fare',
    href: '/health/organizations',
  },
  {
    title: 'Configure',
    maticon: 'settings',
    href: '/configure',
  },

 
];

export default Menuitems;
