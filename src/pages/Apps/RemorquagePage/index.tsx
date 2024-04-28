import BodyListRemorquage from "@components/AppsComponents/RemorquageComponent/ListRemorquageComponent/BodyListRemorquage";
import HeaderListRemorquage from "@components/AppsComponents/RemorquageComponent/ListRemorquageComponent/HeaderListRemorquage";
import DefaultPageComponent from "@components/SharedComponents/SystemComponents/DefaultPageComponent";
const RemorquagePage = () => {
  return (
    <DefaultPageComponent
      header={<HeaderListRemorquage />}
      body={<BodyListRemorquage />}
    />
  );
};

export default RemorquagePage;
