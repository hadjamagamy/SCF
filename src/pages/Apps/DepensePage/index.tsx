import BodyListDepense from "@components/AppsComponents/DepenseComponent/ListDepenseComponent/BodyListDepense";
import HeaderListDepense from "@components/AppsComponents/DepenseComponent/ListDepenseComponent/HeaderListDepense";
import DefaultPageComponent from "@components/SharedComponents/SystemComponents/DefaultPageComponent";

const DepenseListPage = () => {
  return (
    <DefaultPageComponent
      header={<HeaderListDepense />}
      body={<BodyListDepense />}
    />
  );
};
export default DepenseListPage;
