import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Home } from "../pages/home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="favorite"
          element={
            <div className="pt-[110px] p-8">
              <h1>Favorite Page</h1>
            </div>
          }
        />
        <Route
          path="compare"
          element={
            <div className="pt-[110px] p-8">
              <h1>Compare Page</h1>
            </div>
          }
        />
        <Route
          path="maps"
          element={
            <div className="pt-[110px] p-8">
              <h1>Maps Page</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
