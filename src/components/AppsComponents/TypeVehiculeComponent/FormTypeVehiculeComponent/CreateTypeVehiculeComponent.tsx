import { Form, Alert, notification } from "antd";
import { useEffect } from "react";
import { ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { useAddTypeVehiculeMutation } from "@redux/feature/services/TypesVehiculesServices";

const CreateTypeVehiculeComponent = ({ close }: any) => {
  const [addTypeVehicule, { isLoading, isError, error, isSuccess }]: any =
    useAddTypeVehiculeMutation();

  const Validate = async (formData: any) => {
    try {
      await addTypeVehicule({
        name: formData.typeVehicule,
        penality: formData.montant,
      }).unwrap();
    } catch (err) {}
  };

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Ajout effectué",
      description: "L'ajout du véhicule a été effectué",
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
        {/* debut input le type */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer le type du véhicule",
            },
          ]}
          name={"typeVehicule"}
          type={"text"}
          label="Type du véhicule"
          placeholder="Entrez le type du véhicule"
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "typeVehicule"
                )
              : null
          }
        />
        {/* fin input Le type */}

        {/* debut input Montant */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer montant",
            },
          ]}
          name={"montant"}
          placeholder="Entrez un montant"
          type={"number"}
          label="Montant de la pénalité"
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "montant")
              : null
          }
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
              description={"l'ajout du véhicule à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
};

export default CreateTypeVehiculeComponent;
