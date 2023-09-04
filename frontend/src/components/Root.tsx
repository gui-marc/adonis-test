import { Outlet } from "@tanstack/react-router";

export default function Root() {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
}
