import { Outlet } from "react-router-dom";
import Header from "../shared/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Outlet />
    </div>
  );
}
