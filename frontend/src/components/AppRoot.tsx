import { useCurrentUser } from "@/store/currentUser";

export default function AppRoot() {
  const { user } = useCurrentUser();

  if (!user) {
    throw new Error("AppRoot rendered without user");
  }

  return (
    <div className="h-full max-w-[1140px] w-full flex">
      {user.fullName}
      <aside>
        <nav></nav>
      </aside>
    </div>
  );
}
