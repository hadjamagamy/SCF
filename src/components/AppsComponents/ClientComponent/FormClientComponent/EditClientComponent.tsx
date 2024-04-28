import { Alert, Form, notification } from "antd";
import { useEffect } from "react";
import { ASInput, ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { useEditClientMutation, useGetClientByIdQuery } from "@redux/feature/services/ClientsServices";

function EditClientComponent({ id, close }: any) {
  const result: any = useGetClientByIdQuery(id);

  const { data } = result;
  const [editClient, { isLoading, isError, error, isSuccess }]: any =
    useEditClientMutation();

  const dataFiche = data ;

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Modification effectué",
      description: "La modification du client a été effectué",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      close();
      openNotificationWithIcon();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const Validate = async (formData: any) => {
    try {
      await editClient({
        id: id,
        firstName: formData.firstName !== dataFiche.first_name ? formData.firstName : undefined,
        lastName:
          formData.lastName !== dataFiche.last_name
            ? formData.lastName
            : undefined,
        idProofNumber:
          formData.idProofNumber !== dataFiche.id_proof_number
            ? formData.idProofNumber
            : undefined,
            idProofType:
          formData.idProofType !== dataFiche.id_proof_type
            ? formData.idProofType
            : undefined,
            contact:
            formData.contact !== dataFiche.contact
              ? formData.contact
              : undefined,
      }).unwrap();
    } catch (err: any) {}
  };

  return (
    <div>
      <Form layout="vertical" onFinish={Validate}>
        {/* debut input nom */}
        <ATInput
          initialValue={dataFiche?.first_name}
          name={"firstName"}
          type={"text"}
          label="Nom du client"
          stateForm={id}
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "name")
              : null
          }
        />
        {/* fin input nom */}

        {/* debut input prénom */}
        <ATInput
          type={"text"}
          initialValue={dataFiche?.last_name}
          stateForm={id}
          label=" Prénom du client"
          name={"lastName"}
        />
        {/* fin input prénom */}

        {/* debut input type pièce */}
        <div className="grid grid-cols-2 gap-x-2">
          <ASInput
            label="Type de Pièce"
            className="w-full"
            name={"idProofType"}
            initialValue={dataFiche?.id_proof_type}
            stateForm={id}
            valueOption={[
              { id: "CNI", name: "CNI" },
              { id: "ATTESTATION", name: "ATTESTATION" },
            ]}
          />
          {/* Ou id est la valeur et name est le nom */}
          <ATInput
            type={"text"}
            label="N° de Pièce"
            name={"idProofNumber"}
            initialValue={dataFiche?.id_proof_number}
            stateForm={id}
            style={{
              width: "100%",
            }}
          />
        </div>
        {/* fin input type pièce */}

        {/* debut input contact */}
        <ATInput
          type={"text"}
          label="contact"
          name={"contact"}
          initialValue={dataFiche?.contact}
          stateForm={id}
        />
        {/* fin input contact */}

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
              description={"la modification du client à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export default EditClientComponent;
