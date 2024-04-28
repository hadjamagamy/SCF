import { Drawer } from "antd";
import { useState } from "react";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import { useGetClientByIdQuery } from "@redux/feature/services/ClientsServices";
import ModalDeleteClient from "./ModalDeleteClient";
import EditClientComponent from "../FormClientComponent/EditClientComponent";

function FicheClientComponent({ id, close }: any) {
  const result: any = useGetClientByIdQuery(id);

  const { data, isLoading, isError } = result;

  const dataClient = data;

  return data ? (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <AText bold>Nom</AText>
        <AText>{dataClient?.first_name ? dataClient?.first_name: "Indisponible"}</AText>
      </div>
      <div className="space-y-3">
        <AText bold>Prénom</AText>
        <AText>{dataClient?.last_name ? dataClient?.last_name: "Indisponible"}</AText>
      </div>

      <div className="space-y-3">
        <AText bold>Type et N° de Pièce</AText>
        <AText>
        {dataClient?.id_proof_type
            ? dataClient?.id_proof_type
            : "Indisponible"}{" "}
          :{" "}
          {dataClient?.id_proof_number 
            ? dataClient?.id_proof_number 
            : "Indisponible"}
        </AText>
      </div>
      <div className="space-y-3">
        <AText bold>Contact</AText>
        <AText>{dataClient?.contact ? dataClient?.contact : "Indisponible"}</AText>
      </div>

      <div className="flex items-center justify-end space-x-8">
        <ModalDeleteClient close={() => close()} id={id} button />
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
            Modifier Client
          </AText>
        }
      >
        <div className="px-12 ">
          <EditClientComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}

export default FicheClientComponent;
