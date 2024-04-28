import { Alert, Form, notification } from "antd";
import { useEffect } from "react";
import {
  ASInput,
  ATInput,
} from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import {
  useEditCamionMutation,
  useGetCamionByIdQuery,
} from "@redux/feature/services/CamionServices";

function EditCamionComponent({ id, close }: any) {
  const result: any = useGetCamionByIdQuery(id);

  const { data } = result;
  const [editCamion, { isLoading, isError, error, isSuccess }]: any =
    useEditCamionMutation();

  const dataFiche = data;

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Modification effectué",
      description: "La modification du camion a été effectué",
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
      await editCamion({
        id: id,
        name: formData.name !== dataFiche.name ? formData.name : undefined,
        marqueCamion:
          formData.marqueCamion !== dataFiche.marque_camion
            ? formData.marqueCamion
            : undefined,
        registrationNumber:
          formData.registrationNumber !== dataFiche.registration_number
            ? formData.registrationNumber
            : undefined,
      }).unwrap();
    } catch (err: any) {}
  };

  return (
    <div>
      <Form layout="vertical" onFinish={Validate}>
        {/* debut input nom */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer le nom du camion",
            },
          ]}
          initialValue={dataFiche?.name}
          name={"name"}
          type={"text"}
          label="Nom du camion"
          stateForm={id}
        />
        {/* fin input nom */}

        {/* debut input marque */}
        <ASInput
          label="Marque du camion"
          name={"marqueCamion"}
          initialValue={dataFiche?.marque_camion}
          stateForm={id}
          valueOption={[
            { id: "Toyota", name: "Toyota" },
            { id: "Ford", name: "Ford" },
            { id: "Honda", name: "Honda" },
            { id: "Nissan", name: "Nissan" },
            { id: "BMW", name: "BMW" },
            { id: "Mercedes-Benz", name: "Mercedes-Benz" },
            { id: "Volkswagen", name: "Volkswagen" },
            { id: "Tesla", name: "Tesla" },
            { id: "Audi", name: "Audi" },
            { id: "Chevrolet", name: "Chevrolet" },
            { id: "Jeep", name: "Jeep" },
            { id: "Kia", name: "Kia" },
            { id: "Mazda", name: "Mazda" },
            { id: "Hyundai", name: "Hyundai" },
            { id: "Peugeot", name: "Peugeot" },
            { id: "Citroen", name: "Citroen" },
            { id: "Renault", name: "Renault" },
            { id: "Skoda", name: "Skoda" },
            { id: "Subaru", name: "Subaru" },
            { id: "Suzuki", name: "Suzuki" },
            { id: "Porsche", name: "Porsche" },
            { id: "Lamborghini", name: "Lamborghini" },
            { id: "Ferrari", name: "Ferrari" },
            { id: "Maserati", name: "Maserati" },
            { id: "Bugatti", name: "Bugatti" },
            { id: "Rolls-Royce", name: "Rolls-Royce" },
            { id: "Bentley", name: "Bentley" },
            { id: "Jaguar", name: "Jaguar" },
            { id: "Land Rover", name: "Land Rover" },
          ]}
        />

        {/* debut input prénom */}
        <ATInput
          type={"text"}
          initialValue={dataFiche?.registration_number}
          stateForm={id}
          label=" № d'immatriculation"
          name={"registrationNumber"}
        />
        {/* fin input prénom */}

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
              description={"la modification du camion à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export default EditCamionComponent;
