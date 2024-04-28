import { Alert, Form, notification } from "antd";
import { useEffect } from "react";
import { ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";

import {
  useEditTypeVehiculeMutation,
  useGetTypeVehiculeByIdQuery,
} from "@redux/feature/services/TypesVehiculesServices";

function EditTypeVehiculeComponent({ id, close }: any) {
  const result: any = useGetTypeVehiculeByIdQuery(id);

  const { data } = result;
  const [editTypeVehicule, { isLoading, isError, error, isSuccess }]: any =
    useEditTypeVehiculeMutation();

  const dataFiche = data;

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Modification effectué",
      description: "La modification du type du véhicule a été effectué",
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
      await editTypeVehicule({
        id: id,
        name: formData.name !== dataFiche.name ? formData.name : undefined,
        penality:
          formData.penality !== dataFiche.penality
            ? formData.penality
            : undefined,
      }).unwrap();
    } catch (err: any) {}
  };

  return (
    <div>
      <Form layout="vertical" onFinish={Validate}>
        {/* debut input type */}
        <ATInput
          name={"name"}
          type={"text"}
          initialValue={dataFiche?.name}
          label="Type du véhicule"
          placeholder="Entrez Le type du véhicule"
          stateForm={id}
        />
        {/* fin input type */}

        {/* debut input Montant */}
        <ATInput
          initialValue={dataFiche?.penality}
          stateForm={id}
          name={"penality"}
          placeholder="Entrez un montant"
          type={"text"}
          label="Montant de la pénalité"
        />
        {/* fin input Montant */}

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
              description={"la modification du type du véhicule à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export default EditTypeVehiculeComponent;
