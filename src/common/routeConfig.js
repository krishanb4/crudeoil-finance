import React from 'react'
import { Link } from 'react-router-dom';
import { App } from '../features/home';
import homeRoute from '../features/home/route';
import stakeRoute from '../features/stake/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [homeRoute, stakeRoute];

const Home = () => (
  <>
    <h1>Home</h1>
    
    <h3><a href="/app">app</a></h3>
  </>
)

const routes = [
  {
    path: '/',
    component: Home,
    // childRoutes: childRoutes,
  },
  {
    path: '/app',
    component: App,
    childRoutes: childRoutes,
  },
];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex);
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
