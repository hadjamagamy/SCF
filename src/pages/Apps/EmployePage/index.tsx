import BodyListEmploye from "@components/AppsComponents/EmployeComponent/ListEmployeComponent/BodyListEmploye";
import HeaderListEmploye from "@components/AppsComponents/EmployeComponent/ListEmployeComponent/HeaderListEmploye";
import DefaultPageComponent from "@components/SharedComponents/SystemComponents/DefaultPageComponent";
const EmployePage = () => {
  return (
    <DefaultPageComponent
      header={<HeaderListEmploye />}
      body={<BodyListEmploye />}
    />
  );
};

export default EmployePage;
