import { Alert, Form, notification, Select } from "antd";
import { useEffect } from "react";
import { ASInput, ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";

import {
  useEditVehiculeMutation,
  useGetVehiculeByIdQuery,
} from "@redux/feature/services/VehiculesServices";
import ListTypeVehiculeController from "@components/AppsComponents/TypeVehiculeComponent/ListTypeVehiculeComponent/BodyListTypeVehiculeComponents/ListTypeVehiculeController";

function EditVehiculeComponent({ id, close }: any) {
  const result: any = useGetVehiculeByIdQuery(id);

  const { data } = result;
  const [editVehicule, { isLoading, isError, error, isSuccess }]: any =
    useEditVehiculeMutation();
    const { DataListTypeVehicule }: any = ListTypeVehiculeController();

  const dataFiche = data;

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Modification effectué",
      description: "La modification du véhicule a été effectué",
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
      await editVehicule({
        id: id,
        model: formData.model !== dataFiche.model ? formData.model : undefined,
        registrationNumber:
          formData.registrationNumber !== dataFiche.registration_number
            ? formData.registrationNumber
            : undefined,
            type_vehicule:
          formData.type_vehicule !== dataFiche.typeVehicules.name
            ? formData.type_vehicule
            : undefined,
      }).unwrap();
    } catch (err: any) {}
  };

  return (
    <div>
      <Form layout="vertical" onFinish={Validate}>
        {/* debut input Marque */}
        <ASInput
          label="Marque du camion"
          name={"model"}
          initialValue={dataFiche?.model}
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
        {/* fin input Marque */}

        {/* debut input immatriculation */}
        <ATInput
          initialValue={dataFiche?.registration_number}
          stateForm={id}
          name={"registrationNumber"}
          placeholder="Entrez le № du véhicule "
          type={"text"}
          label="№ d'immatriculation"
        />
        {/* fin input immatriculation */}

        {/* Debut Input Typevehicule  */}
        <Form.Item
          label="Type du véhicule"
          name={"typeDeVehicule"}
          initialValue={dataFiche?.type_vehicule}
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
              description={"la modification du véhicule à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export default EditVehiculeComponent;

