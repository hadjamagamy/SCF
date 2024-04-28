import BodyListClient from "@components/AppsComponents/ClientComponent/ListClientComponent/BodyListClient";
import HeaderListClient from "@components/AppsComponents/ClientComponent/ListClientComponent/HeaderListClient";
import DefaultPageComponent from "@components/SharedComponents/SystemComponents/DefaultPageComponent";

const ClientPage = () => {
  return (
    <DefaultPageComponent
      header={<HeaderListClient />}
      body={<BodyListClient />}
    />
  );
};
export default ClientPage;
