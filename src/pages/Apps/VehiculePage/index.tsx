
import BodyListVehicule from "@components/AppsComponents/VehiculeComponent/ListVehiculeComponent/BodyListVehicule";
import HeaderListVehicule from "@components/AppsComponents/VehiculeComponent/ListVehiculeComponent/HeaderListVehicule";
import DefaultPageComponent from "@components/SharedComponents/SystemComponents/DefaultPageComponent";
const VehiculeListPage = () => {
  return (
    <DefaultPageComponent
      header={<HeaderListVehicule />}
      body={<BodyListVehicule />}
    />
  );
};

export default VehiculeListPage;
