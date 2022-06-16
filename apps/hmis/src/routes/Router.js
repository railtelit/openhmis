import React, { lazy } from 'react';
import Home from '../app/home/home';

import Loadable from '../layouts/full-layout/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full-layout/FullLayout')));
 

const Router = [
  {
    path: '/',  
    element: <FullLayout />,
    children:[
        {path:'/*',element: <Home/> }
    ]
    // children: [
    //   { path: '/', element: <Navigate to="/dashboards/dashboard1" /> },
    //   { path: '/dashboards/dashboard1', exact: true, element: <Dashboard1 /> },
    //   { path: '/dashboards/dashboard2', exact: true, element: <Dashboard2 /> },
    //   { path: '/dashboards/dashboard3', exact: true, element: <Dashboard3 /> },
    //   { path: '/customers/lists', exact: true, element: <CustomerLists /> },
    //   { path: '/chats', element: <Chats /> },
    //   { path: '/notes', element: <Notes /> },
    //   { path: '/email', element: <Email /> },
    //   { path: '/shop/lists', element: <Shop /> },
    //   { path: '/calendar', element: <Calendar /> },
    //   { path: '/customers/edit', element: <CustomerEdit /> },
    //   { path: '/tables/basic-table', element: <BasicTable /> },
    //   { path: '/tables/pagination-table', element: <PaginationTable /> },
    //   { path: '/tables/enhanced-table', element: <EnhancedTable /> },
    //   { path: '/tables/collapsible-table', element: <CollapsibleTable /> },
    //   { path: '/tables/fixed-header-table', element: <FixedHeaderTable /> },
    //   { path: '/form-layouts/form-layouts', element: <FormLayouts /> },
    //   { path: '/form-elements/autocomplete', element: <ExAutoComplete /> },
    //   { path: '/form-elements/button', element: <ExButton /> },
    //   { path: '/form-elements/checkbox', element: <ExCheckbox /> },
    //   { path: '/form-elements/date-time', element: <ExDateTime /> },
    //   { path: '/form-elements/radio', element: <ExRadio /> },
    //   { path: '/form-elements/slider', element: <ExSlider /> },
    //   { path: '/form-elements/switch', element: <ExSwitch /> },
    //   { path: '/form-layouts/form-wizard', element: <FormWizard /> },
    //   { path: '/widgets/widget-feed', element: <WidgetFeed /> },
    //   { path: '/widgets/widget-apps', element: <WidgetApps /> },
    //   { path: '/user-profile', element: <UserProfile /> },
    //   { path: '/shop/shop-detail', element: <ShopDetail /> },
    //   { path: '/charts/line-chart', element: <LineChart /> },
    //   { path: '/charts/gredient-chart', element: <GredientChart /> },
    //   { path: '/charts/doughnut-pie-chart', element: <DoughnutChart /> },
    //   { path: '/charts/area-chart', element: <AreaChart /> },
    //   { path: '/charts/column-chart', element: <ColumnChart /> },
    //   { path: '/charts/candlestick-chart', element: <CandlestickChart /> },
    //   { path: '/charts/radialbar-chart', element: <RadialbarChart /> },
    //   { path: '/react-icons', element: <ReactIcons /> },
    //   { path: '/form-layouts/form-custom', element: <FormCustom /> },
    //   { path: '/quill-editor', element: <QuillEditor /> },
    //   { path: '/treeview', element: <Treeview /> },
    //   { path: '/pricing', element: <Pricing /> },
    //   { path: '/timeline', element: <CustomTimeline /> },
    //   { path: '/typography', element: <CustomTypography /> },
    //   { path: '/alert', element: <ExAlert /> },
    //   { path: '*', element: <Navigate to="/auth/404" /> },
    // ],
  },
  // {
  //   path: 'auth',
  //   element: <BlankLayout />,
  //   children: [
  //     { path: '404', element: <Error /> },
  //     { path: 'login', element: <Login /> },
  //     { path: 'register', element: <Register /> },
  //     { path: 'reset-password', element: <ResetPassword /> },
  //     { path: '*', element: <Navigate to="/auth/404" /> },
  //   ],
  // },
];

export default Router;
