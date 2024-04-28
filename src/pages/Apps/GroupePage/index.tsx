
import BodyListGroupe from "@components/AppsComponents/GroupeComponent/ListGroupeComponent/BodyListGroupe";
import HeaderListGroupe from "@components/AppsComponents/GroupeComponent/ListGroupeComponent/HeaderListGroupe";
import DefaultPageComponent from "@components/SharedComponents/SystemComponents/DefaultPageComponent";
const GroupePage = () => {
  return (
    <DefaultPageComponent
      header={<HeaderListGroupe />}
      body={<BodyListGroupe />}
    />
  );
};

export default GroupePage;
