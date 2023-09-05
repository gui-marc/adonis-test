import { RootRoute, Route, Router, redirect } from "@tanstack/react-router";
import Root from "@/components/Root";
import { progressStore } from "@/store/progress";
import React from "react";
import { getCurrentUser } from "@/api/auth";
import { AxiosError } from "axios";
import { removeAuthToken } from "@/api/client";
import { currentUserStore } from "@/store/currentUser";

// Auth
const AuthRoot = React.lazy(() => import("@/components/AuthRoot"));
const LoginPage = React.lazy(() => import("@/pages/LoginPage"));
const RegisterPage = React.lazy(() => import("@/pages/RegisterPage"));

// App
const AppRoot = React.lazy(() => import("@/components/AppRoot"));

const rootRoute = new RootRoute({
  component: Root,
  beforeLoad: async () => {
    const { complete, setProgress } = progressStore;
    await setProgress(10);
    complete();
  },
});

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  async beforeLoad() {
    try {
      const { setUser } = currentUserStore();
      const me = await getCurrentUser();
      setUser(me);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          console.log("Not logged in");
          removeAuthToken();
          throw redirect({ to: "/auth/login" });
        }
      }
    }
  },
  component: AppRoot,
});

const authPage = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthRoot,
});

const loginPage = new Route({
  getParentRoute: () => authPage,
  path: "/login",
  component: LoginPage,
});

const registerPage = new Route({
  getParentRoute: () => authPage,
  path: "/register",
  component: RegisterPage,
});

const routeTree = rootRoute.addChildren([
  appRoute,
  authPage.addChildren([loginPage, registerPage]),
]);

const router = new Router({
  routeTree,
});

export default router;
