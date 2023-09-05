import { Outlet } from "@tanstack/react-router";
import Progress from "./Progress";

export default function Root() {
  return (
    <div className="h-full">
      <Progress />
      <Outlet />
    </div>
  );
}
