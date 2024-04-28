import { useGetEmployeByIdQuery } from "@redux/feature/services/EmployesServices";
import { Drawer } from "antd";
import { useState } from "react";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import EditEmployeComponent from "@components/AppsComponents/EmployeComponent/FormEmployeComponent/EditEmployeComponent";
import ModalDeleteEmploye from "./ModalDeleteEmploye";

function FicheEmployeComponent({ id, close }: any) {
  const result: any = useGetEmployeByIdQuery(id);

  const { data, isLoading, isError } = result;

  const dataEmploye = data;

  return data ? (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <AText bold>Nom</AText>
        <AText>
          {dataEmploye?.first_name ? dataEmploye?.first_name : "Indisponible"}
        </AText>
      </div>
      <div className="space-y-3">
        <AText bold>Prénom</AText>
        <AText>
          {dataEmploye?.last_name ? dataEmploye?.last_name : "Indisponible"}
        </AText>
      </div>
      <div className="space-y-3">
        <AText bold>Fonction</AText>
        <AText>
          {dataEmploye?.fonction ? dataEmploye?.fonction : "Indisponible"}
        </AText>
      </div>
      <div className="space-y-3">
        <AText bold>Type et N° de pièce </AText>
        <AText>
          {dataEmploye?.id_proof_type
            ? dataEmploye?.id_proof_type
            : "Indisponible"}{" "}
          :{" "}
          {dataEmploye?.id_proof_number
            ? dataEmploye?.id_proof_number
            : "Indisponible"}
        </AText>
      </div>
      <div className="space-y-3">
        <AText bold>Contact</AText>
        <AText>
          {dataEmploye?.contact ? dataEmploye?.contact : "Indisponible"}
        </AText>
      </div>

      <div className="flex items-center justify-end space-x-8">
        <ModalDeleteEmploye close={() => close()} id={id} button />
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
            Modifier Employé
          </AText>
        }
      >
        <div className="px-12 ">
          <EditEmployeComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}

export default FicheEmployeComponent;
