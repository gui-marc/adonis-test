import { Outlet } from "@tanstack/react-router";

export default function AuthRoot() {
  return (
    <main className="grid place-items-center h-full">
      <Outlet />
    </main>
  );
}
