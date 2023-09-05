import { useProgress } from "@/store/progress";

export default function Progress() {
  const { progress, show } = useProgress();

  return (
    <div className="h-1 w-full bg-indigo-1 fixed top-0">
      <div
        style={{
          width: `${progress}%`,
          transform: `translateY(${show ? "0" : "-100"}%)`,
        }}
        className="h-full bg-indigo-9 transition-all duration-150 ease-out"
      ></div>
    </div>
  );
}
