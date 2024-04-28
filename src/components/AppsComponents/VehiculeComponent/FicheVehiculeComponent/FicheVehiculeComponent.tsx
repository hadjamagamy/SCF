import { Drawer } from "antd";
import { useState } from "react";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import EditVehiculeComponent from "../FormVehiculeComponent/EditVehiculeComponent";
import { useGetVehiculeByIdQuery } from "@redux/feature/services/VehiculesServices";
import ModalDeleteVehicule from "./ModalDeleteVehicule";

function FicheVehiculeComponent({ id, close }: any) {
  const result: any = useGetVehiculeByIdQuery(id);

  const { data, isLoading, isError } = result;

  const dataVehicule = data;

  return data ? (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <AText bold>Marque</AText>
        <AText>
          {dataVehicule?.model ? dataVehicule?.model : "Indisponible"}
        </AText>
      </div>
      <div className="space-y-3">
        <AText bold>№ d' immatriculation</AText>
        <AText>
          {dataVehicule?.registration_number
            ? dataVehicule?.registration_number
            : "Indisponible"}
        </AText>
      </div>

      <div className="space-y-3">
        <AText bold>Type véhicule</AText>
        <AText>
          {dataVehicule?.typeVehicules.name
            ? dataVehicule?.typeVehicules.name
            : "Indisponible"}
        </AText>
      </div>

      <div className="flex items-center justify-end space-x-8">
        <ModalDeleteVehicule close={() => close()} id={id} button />
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
            Modifier Véhicule
          </AText>
        }
      >
        <div className="px-12 ">
          <EditVehiculeComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}

export default FicheVehiculeComponent;
