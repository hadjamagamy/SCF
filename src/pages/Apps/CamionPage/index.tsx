import BodyListCamion from "@components/AppsComponents/CamionComponent/ListCamionComponent/BodyListCamion";
import HeaderListCamion from "@components/AppsComponents/CamionComponent/ListCamionComponent/HeaderListCamion";
import DefaultPageComponent from "@components/SharedComponents/SystemComponents/DefaultPageComponent";

const CamionPage = () => {
  return (
    <DefaultPageComponent
      header={<HeaderListCamion />}
      body={<BodyListCamion />}
    />
  );
};

export default CamionPage;
