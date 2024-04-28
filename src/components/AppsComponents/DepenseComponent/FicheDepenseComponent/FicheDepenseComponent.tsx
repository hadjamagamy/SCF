import { Drawer } from "antd";
import { useState } from "react";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import { useGetDepenseByIdQuery } from "@redux/feature/services/DepenseServices";
import ModalDeleteDepense from "./ModalDeleteDepense";
import EditDepenseComponent from "../FormDepenseComponent/EditDepenseComponent";

function FicheDepenseComponent({ id, close }: any) {
  const result: any = useGetDepenseByIdQuery(id);

  const { data, isLoading, isError } = result;

  const dataDepense = data;

  return data ? (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <AText bold>Date</AText>
        <AText>
          {dataDepense?.date.substring(0, 10).split("-").reverse().join("/")
            ? dataDepense?.date.substring(0, 10).split("-").reverse().join("/")
            : "Indisponible"}
        </AText>
      </div>
      <div className="space-y-3">
        <AText bold>Motif</AText>
        <AText>
          {dataDepense?.reason ? dataDepense?.reason : "Indisponible"}{" "}
        </AText>
      </div>
      <div className="space-y-3">
        <AText bold>Montant</AText>
        <AText>
          {dataDepense?.amount ? dataDepense?.amount : "Indisponible"}
        </AText>
      </div>
      <div className="flex items-center justify-end space-x-8">
        <ModalDeleteDepense close={() => close()} id={id} button />
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
            Modifier Dépense
          </AText>
        }
      >
        <div className="px-12 ">
          <EditDepenseComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}

export default FicheDepenseComponent;
