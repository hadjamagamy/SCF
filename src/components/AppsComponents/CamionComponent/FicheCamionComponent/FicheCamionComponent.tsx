import { Drawer } from "antd";
import { useState } from "react";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import ModalDeleteCamion from "./ModalDeleteCamion";
import EditCamionComponent from "../FormCamionComponent/EditCamionComponent";
import { useGetCamionByIdQuery } from "@redux/feature/services/CamionServices";

function FicheCamionComponent({ id, close }: any) {
  const result: any = useGetCamionByIdQuery(id);

  const { data, isLoading, isError } = result;

  const dataCamion = data;

  return data ? (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <AText bold>Nom du camion</AText>
        <AText>{dataCamion?.name ? dataCamion?.name : "Indisponible"}</AText>
      </div>
      <div className="space-y-3">
        <AText bold>marque</AText>
        <AText>
          {dataCamion?.marque_camion
            ? dataCamion?.marque_camion
            : "Indisponible"}
        </AText>
      </div>

      <div className="space-y-3">
        <AText bold>immatriculation</AText>
        <AText>
          {dataCamion?.registration_number
            ? dataCamion?.registration_number
            : "Indisponible"}
        </AText>
      </div>
      <div className="flex items-center justify-end space-x-8">
        <ModalDeleteCamion close={() => close()} id={id} button />
        <AccessFicheModification id={id} />
      </div>
    </div>
  ) : isError ? (
    <>Une erreur est survenue</>
  ) : (
    isLoading
  );
}

function AccessFicheModification({ id }: any) {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <>
      <AButton
        className="flex -space-y-0.5 items-center"
        action={showDrawer}
        icon="edit_square"
      >
        Modifier
      </AButton>

      <Drawer
        width={600}
        closable={true}
        placement="right"
        onClose={onClose}
        open={visible}
        destroyOnClose
        title={
          <AText size="base+3" bold>
            Modifier Camion
          </AText>
        }
      >
        <div className="px-12 ">
          <EditCamionComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}

export default FicheCamionComponent;
