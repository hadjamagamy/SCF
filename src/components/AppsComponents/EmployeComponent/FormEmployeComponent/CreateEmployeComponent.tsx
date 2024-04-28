import { useAddEmployeMutation } from "@redux/feature/services/EmployesServices";
import { Form, Alert, notification, Select } from "antd";
import { useEffect, useState } from "react";
import {
  ASInput,
  ATInput,
} from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";

const CreateEmployeComponent = ({ close }: any) => {
  const [addEmploye, { isLoading, isError, error, isSuccess }]: any =
    useAddEmployeMutation();

  const Validate = async (formData: any) => {
    try {
      await addEmploye({
        firstName: formData.firstName,
        lastName: formData.lastName,
        fonction: formData.fonction,
        idProofNumber: formData.numPiece,
        idProofType: formData.typePiece,
        contact: formData.phoneNumber,
      }).unwrap();
    } catch (err) {}
  };

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Ajout effectué",
      description: "L'ajout de l'employé a été effectué",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      close();
      openNotificationWithIcon();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return (
    <div>
      <Form layout="vertical" onFinish={Validate}>
        {/* debut input nom */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer le nom de l'employé",
            },
          ]}
          name={"firstName"}
          type={"text"}
          label="Nom de l'employé"
          placeholder="Entrez le Nom de l'employé"
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "firstName"
                )
              : null
          }
        />
        {/* fin input nom */}

        {/* debut input Prenom */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer un prénom",
            },
          ]}
          name={"lastName"}
          type={"text"}
          label="Prénom"
          placeholder="Entrez le prénom de l'employé"
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "lastName")
              : null
          }
        />
        {/* fin input Prenom */}

        {/* debut input fonction */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer une fonction",
            },
          ]}
          name={"fonction"}
          placeholder="Entrez la fonction de l'employé"
          type={"text"}
          label="Fonction"
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "fonction")
              : null
          }
        />
        {/* fin input fonction */}

        {/* Debut Input piece  */}
        <div className="grid grid-cols-2 gap-x-2">
          <ASInput
            label="Type de Pièce"
            name={"typePiece"}
            className="w-full"
            placeholder="Entrez un type de Pièce"
            valueOption={[
              { id: "CNI", name: "CNI" },
              { id: "ATTESTATION", name: "ATTESTATION" },
            ]}
            rules={[
              {
                required: true,
                message: "Entrez un type de Pièce",
              },
            ]}
          />
          {/* Ou id est la valeur et name est le nom */}
          <ATInput
            placeholder="Entrez un № de Pièce"
            type={"text"}
            label="№ de Pièce"
            name={"numPiece"}
            style={{
              width: "100%",
            }}
            rules={[
              {
                required: true,
                message: "Entrez un № de Pièce",
              },
            ]}
            error={
              error?.status === 422
                ? error.data.errors.filter(
                    (err: any) => err.field === "numPiece"
                  )
                : null
            }
          />
        </div>
        {/* fin Input piece  */}

        {/* debut Numéro de tel */}
        <ATInput
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "phoneNumber"
                )
              : null
          }
          rules={[
            {
              required: true,
              message: "Veuillez entrer le numéro de telephone",
            },
          ]}
          type={"tel"}
          label="Telephone"
          name={"phoneNumber"}
          placeholder="Entrez un № de telephone "
        />
        {/* fin numéro de tel*/}

        <div className="flex items-center justify-end pt-5 space-x-8">
          <ATButton
            htmlType="submit"
            icon="cancel"
            className="flex items-center"
            action={close}
          >
            Annuler
          </ATButton>
          <AButton htmlType="submit" loading={isLoading} icon="save">
            Enregistrer
          </AButton>
        </div>
        <div className="mt-5">
          {isError && error?.status !== 422 ? (
            <Alert
              message="Echec"
              description={"l'ajout de l'employé à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
};

export default CreateEmployeComponent;
