import { Route, Routes } from "react-router-dom";

import DepensePage from "./DepensePage/DepensePage";
import HomePage from "./Home/HomePage";

import VehiculePage from "./VehiculePage/VehiculePage";
import TypeVehiculePage from "./TypeVehiculePage/TypeVehiculePage";
import EmployePage from "./EmployePage";
import GroupePage from "./GroupePage";
import CamionPage from "./CamionPage";
import ClientPage from "./ClientPage";
import RemorquagePage from "./RemorquagePage";

function AppPages() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="Employes/*" element={<EmployePage />} />
      <Route path="groupes/*" element={<GroupePage />} />
      <Route path="camions/*" element={<CamionPage />} />
      <Route path="remorquages/*" element={<RemorquagePage />} />
      <Route path="depenses/*" element={<DepensePage />} />
      <Route path="clients/*" element={<ClientPage />} />
      <Route path="vehicules/*" element={<VehiculePage />} />
      <Route path="typesVehicules/*" element={<TypeVehiculePage />} />
    </Routes>
  );
}
export default AppPages;
