import BodyListTypeVehicule from "@components/AppsComponents/TypeVehiculeComponent/ListTypeVehiculeComponent/BodyListTypeVehicule";
import HeaderListTypeVehicule from "@components/AppsComponents/TypeVehiculeComponent/ListTypeVehiculeComponent/HeaderListTypeVehicule";
import DefaultPageComponent from "@components/SharedComponents/SystemComponents/DefaultPageComponent";
const TypeVehiculeListPage = () => {
  return (
    <DefaultPageComponent
      header={<HeaderListTypeVehicule/>}
      body={<BodyListTypeVehicule />}
    />
  );
};

export default TypeVehiculeListPage;
