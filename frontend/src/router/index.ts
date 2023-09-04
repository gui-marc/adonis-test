import { RootRoute, Route, Router } from "@tanstack/react-router";
import Root from "../components/Root";
import HomePage from "../pages/HomePage";

const rootRoute = new RootRoute({
  component: Root,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const routeTree = rootRoute.addChildren([homeRoute]);

const router = new Router({
  routeTree,
});

export default router;
