import { Drawer } from "antd";
import { useState } from "react";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import { useGetRemorquageByIdQuery } from "@redux/feature/services/RemorquagesServices";
import EditRemorquageComponent from "../FormRemorquageComponent/EditRemorquageComponent";
import ModalDeleteRemorquage from "./ModalDeleteRemorquage";

function FicheRemorquageComponent({ id, close }: any) {
  const result: any = useGetRemorquageByIdQuery(id);

  const { data, isLoading, isError } = result;

  const dataRemorquage = data;

  return data ? (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <AText bold>Type de remorquage</AText>
        {/* ou type_remorquage est la variable du backend dans postman afficher la list pour un remorquage */}
        <AText>{dataRemorquage?.type_remorquage ? dataRemorquage?.type_remorquage
            : "Indisponible"}</AText>
      </div>
      <div className="space-y-3">
        <AText bold>№ de bon</AText>
        <AText>{dataRemorquage?.number_bon ? dataRemorquage?.number_bon
            : "Indisponible"}</AText>
      </div>
      {/* debut info véhicule */}
      <div className="space-y-3">
        <AText bold>Marque du véhicule</AText>
        <AText>
          {dataRemorquage?.marque_vehicule
            ? dataRemorquage?.marque_vehicule
            : "Indisponible"}
        </AText>
      </div>

      <div className="space-y-3">
        <AText bold>№ d'immatriculation</AText>
        <AText>
          {" "}
          {dataRemorquage?.registration_number
            ? dataRemorquage?.registration_number
            : "Indisponible"}
        </AText>
      </div>
      {/* fin info vehicule */}

      {/* debut info client */}
      <div className="space-y-3">
        <AText bold>Nom du client</AText>
        <AText>
          {" "}
          {dataRemorquage?.first_name_client
            ? dataRemorquage?.first_name_client
            : "Indisponible"}
        </AText>
      </div>

      <div className="space-y-3">
        <AText bold>Prénom du client</AText>
        <AText>
          {dataRemorquage?.last_name_client
            ? dataRemorquage?.last_name_client
            : "Indisponible"}
        </AText>
      </div>

      <div className="space-y-3">
        <AText bold>Contact du client</AText>
        <AText>
          {dataRemorquage?.contact_client
            ? dataRemorquage?.contact_client
            : "Indisponible"}
        </AText>
      </div>
      {/* Fin info client */}

      <div className="space-y-3">
        <AText bold>L'Equipe chargé du remorquage</AText>
        <AText>{dataRemorquage?.name_equipage}</AText>
      </div>

      <div className="space-y-3">
        <AText bold>Statut</AText>
        <AText>
          {dataRemorquage?.status ? dataRemorquage?.status : "Indisponible"}
        </AText>
      </div>

      {/* Debut dates */}
      <div className="space-y-3">
        <AText bold>Date d'entrée</AText>
        <AText>
          {dataRemorquage?.date_arrivee.substring(0, 10).split("-").reverse().join("/")
            ? dataRemorquage?.date_arrivee.substring(0, 10).split("-").reverse().join("/")
            : "Indisponible"}
        </AText>
      </div>

      <div className="space-y-3">
        <AText bold>Date de sortie</AText>
        <AText>
          {dataRemorquage && dataRemorquage.date_sortie 
            ? dataRemorquage.date_sortie.substring(0, 10).split("-").reverse().join("/")
            : "Indisponible"}
        </AText>
      </div>
      {/* fin dates */}

      <div className="space-y-3">
        <AText bold>Montant payé</AText>
        <AText>
          {dataRemorquage?.amount ? dataRemorquage?.amount : "Indisponible"}
        </AText>
      </div>

      <div className="flex items-center justify-end space-x-8">
        <ModalDeleteRemorquage close={() => close()} id={id} button />
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
            Modifier un remorquage
          </AText>
        }
      >
        <div className="px-12 ">
          <EditRemorquageComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}

export default FicheRemorquageComponent;
