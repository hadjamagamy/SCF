import { Drawer } from "antd";
import { useState } from "react";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import { useGetTypeVehiculeByIdQuery } from "@redux/feature/services/TypesVehiculesServices";
import EditTypeVehiculeComponent from "../FormTypeVehiculeComponent/EditTypeVehiculeComponent";
import ModalDeleteTypeVehicule from "./ModalDeleteTypeVehicule";

function FicheTypeVehiculeComponent({ id, close }: any) {
  const result: any = useGetTypeVehiculeByIdQuery(id);

  const { data, isLoading, isError } = result;

  const dataTypeVehicule = data;

  return data ? (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <AText bold>Type du Véhicule</AText>
        <AText>{dataTypeVehicule?.name ? dataTypeVehicule?.name : "Indisponible"}</AText>
      </div>
      <div className="space-y-3">
        <AText bold>Montant de La pénalité</AText>
        <AText>{dataTypeVehicule?.penality ? dataTypeVehicule?.penality : "Indisponible"}</AText>
      </div>

      <div className="flex items-center justify-end space-x-8">
        <ModalDeleteTypeVehicule close={() => close()} id={id} button />
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
            Modifier Type du Véhicule
          </AText>
        }
      >
        <div className="px-12 ">
          <EditTypeVehiculeComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}

export default FicheTypeVehiculeComponent;
