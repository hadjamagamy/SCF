import { Form, Alert, notification } from "antd";
import { useEffect, useState } from "react";
import {
  ADatePicker,
  ASInput,
  ATInput,
} from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { useAddCamionMutation } from "@redux/feature/services/CamionServices";

const CreateCamionComponent = ({ close }: any) => {
  const [addCamion, { isLoading, isError, error, isSuccess }]: any =
    useAddCamionMutation();
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const handleChange = (event: any) => {
    setDate(event.target.value);
  };
  const Validate = async (formData: any) => {
    try {
      await addCamion({
        name: formData.name,
        registrationNumber: formData.immatriculation,
        marqueCamion: formData.marque,
        date: formData.date,
        nameEquipage: formData.nameEquipe,
      }).unwrap();
    } catch (err) {}
  };
  //debut pour afficher la date d'aujourd'hui dans mon DatePicker date d'entrée
  let today: Date | string = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let hh = today.getHours();
  let min = today.getMinutes();
  today = dd + "-" + mm + "-" + yyyy + "à" + hh + ":" + min;
  console.log(today);
  //fin pour afficher la date d'aujourd'hui dans mon DatePicker date d'entrée

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Ajout effectué",
      description: "L'ajout du camion a été effectué",
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
              message: "Veuillez entrer le nom de camion",
            },
          ]}
          name={"name"}
          type={"text"}
          label="Nom du camion"
          placeholder="Entrez le nom du camion"
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "name")
              : null
          }
        />
        {/* fin input nom */}

        {/* debut input marque */}
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
            { id: "Land Rover", name: "Land Rover" },
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

        {/* fin input Prenom */}

        {/* debut input immatriculation */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer le № d'immatriculation",
            },
          ]}
          name={"immatriculation"}
          placeholder="Entrez le № d'immatriculation "
          type={"text"}
          label="№ d'immatriculation"
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "immatriculation"
                )
              : null
          }
        />
        {/* fin input immatriculation */}

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
              description={"l'ajout du camion a echoué à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
};

export default CreateCamionComponent;
