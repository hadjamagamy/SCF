import { ATButton } from "@components/SharedComponents/AtomicComponents/Button";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import MaterialIcon from "@components/SharedComponents/Icons/MaterialIcons";
import { useDeleteEmployeMutation } from "@redux/feature/services/EmployesServices";
import { message, Modal } from "antd";
import React from "react";

function ModalDeleteEmploye({ id, button, close }: any) {
  const [deleteEmploye, { isLoading, isSuccess, isError }] =
    useDeleteEmployeMutation();
  const [open, setOpen] = React.useState(false);
  const OpenModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const Supprimer = async () => {
    try {
      await deleteEmploye({ id: id }).unwrap();
      close();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };
  return (
    <>
      <ATButton
        icon={button ? "delete" : undefined}
        action={OpenModal}
        type="danger"
      >
        {button ? <>Supprimer</> : <MaterialIcon icon="delete" />}
      </ATButton>

      <Modal
        title="Suppression d'un employé"
        footer={null}
        open={open}
        onCancel={handleCancel}
      >
        <>
          <AText>Voulez-vous vraiment supprimer cet employé ?</AText>
          <div className="flex items-center justify-end mt-5 space-x-5">
            <ATButton action={handleCancel}>Annuler</ATButton>
            <ATButton loading={isLoading} action={Supprimer} type="danger">
              Supprimer
            </ATButton>
          </div>
          {isSuccess &&
            message.success({
              content: "L'employé a été supprimé avec succès",
              key: 1,
            })}
          {isError &&
            message.error({ content: "Une erreur est survenue", key: 1 })}
        </>
      </Modal>
    </>
  );
}

export default ModalDeleteEmploye;
