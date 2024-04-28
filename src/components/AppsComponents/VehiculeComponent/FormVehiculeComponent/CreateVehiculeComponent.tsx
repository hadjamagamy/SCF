import { Form, Alert, notification, Select } from "antd";
import { useEffect } from "react";
import { ASInput, ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { useAddVehiculeMutation } from "@redux/feature/services/VehiculesServices";
import ListTypeVehiculeController from "@components/AppsComponents/TypeVehiculeComponent/ListTypeVehiculeComponent/BodyListTypeVehiculeComponents/ListTypeVehiculeController";

const CreateVehiculeComponent = ({ close }: any) => {
  const [addVehicule, { isLoading, isError, error, isSuccess }]: any =
    useAddVehiculeMutation();
  const { DataListTypeVehicule }: any = ListTypeVehiculeController();

  const Validate = async (formData: any) => {
    try {
      await addVehicule({
        model: formData.marque,
        registrationNumber: formData.numImmatricule,
        type_vehicule: formData.typeDeVehicule,
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
        {/* debut input Marque */}
        <ASInput
  label="Marque de Véhicule"
  name={"marque"}
  className="w-full"
  placeholder="Entrez la marque du véhicule"
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
    { id: "Land Rover", name: "Land Rover" }
  ]}
  rules={[
    {
      required: true,
      message: "Entrez une marque de véhicule",
    },
  ]}
  error={
    error?.status === 422
      ? error.data.errors.filter((err: any) => err.field === "marque")
      : null
  }
/>
        {/* fin input Marque */}

        {/* debut input immatriculation */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer le № d'immatriculation",
            },
          ]}
          name={"numImmatricule"}
          placeholder="Entrez le № du véhicule "
          type={"text"}
          label="№ d'immatriculation"
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "numImmatricule"
                )
              : null
          }
        />
        {/* fin input immatriculation */}

        {/* Debut Input Typevehicule  */}
        <Form.Item
          label="Type du véhicule"
          name={"typeDeVehicule"}
          rules={[
            {
              required: true,
              message: "Entrez le type du véhicule",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Type de véhicule"
            options={
              DataListTypeVehicule &&
              DataListTypeVehicule.map(
                (item: { typeVehicule: string; id: string }) => ({
                  value: item.id,
                  label: item.typeVehicule, // il est dans ListTypeVehiculeController.ts
                })
              )
            }
            optionFilterProp="children"
            filterOption={(input, optionVehicule: any) =>
              optionVehicule.value.toLowerCase().indexOf(input.toLowerCase()) >=
              0
            }
          />
        </Form.Item>
        {/* fin Input typevehicule  */}

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

export default CreateVehiculeComponent;
