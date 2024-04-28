import { Form, Alert, notification, Select, Input } from "antd";
import { useEffect } from "react";
import {
  ADatePicker,
  ARadio,
  ASInput,
  ATInput,
} from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { useAddRemorquageMutation } from "@redux/feature/services/RemorquagesServices";

const CreateRemorquageComponent = ({ close }: any) => {
  // Debut constante pour statut

  //Debut select nom des types de vehicules
  const [addRemorquage, { isLoading, isError, error, isSuccess }]: any =
    useAddRemorquageMutation();

  const Validate = async (formData: any) => {
    try {
      await addRemorquage({
        TypeRemorquage: formData.typeRemorquages, //les données à droites les données qui sont sur postman (Type_remorquage) et à gauche sont mes propres variable que j'ai utilisé coté front du formulaire
        numberBon: formData.numeroBon,
        marqueVehicule: formData.marqueVehicule, //marque du vehicule
        registrationNumber: formData.numeroMatricule,
        firstNameClient: formData?.firstName,
        lastNameClient: formData?.lastName,
        contactClient: formData.phoneNumber,
        nameEquipage: formData.nameEquipe,
        status: formData.statut,
        dateArrivee: formData.dateEntree,
        dateSortie: formData.dateSortie,
        amount: formData.montant,
        numberRemorquage: formData.numeroBon,
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
      description: "L'ajout du remorquage a été effectué",
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
        {/* Debut Date entree et sortie */}
    
        <ADatePicker
          initialValue={today}
          rules={[
            {
              required: true,
              message: "Entrez la date d'entrée",
            },
          ]}
          name={"dateEntree"}
          label="Date d'entrée"
          showTime
          style={{
            width: "100%",
          }}
        />
         <ADatePicker
          name={"dateSortie"}
          label="Date Date de sortie"
          showTime
          style={{
            width: "100%",
          }}
        />
        {/*Fin Date entree et sortie */}

        {/* Debut Input type de remorquage et numéro de bon  */}
        <div className="grid grid-cols-2 gap-x-2">
          <ASInput
            label="Type de remorquage"
            placeholder="Type de remorquage"
            className="w-full"
            valueOption={[
              { id: "TSP", name: "TSP" },
              { id: "FOURRIERE", name: "FOURRIERE" },
            ]}
            name={"typeRemorquages"}
            rules={[
              {
                required: true,
                message: "Entrez le type de remorquage",
              },
            ]}
          />
          {/* Ou id est la valeur et name est le nom */}

          <ATInput
            placeholder="Entrez un № de bon"
            type={"text"}
            label="№ de bon"
            name={"numeroBon"}
            style={{
              width: "100%",
            }}
            rules={[
              {
                required: true,
                message: "Entrez un № de bon",
              },
            ]}
            error={
              error?.status === 422
                ? error.data.errors.filter(
                    (err: any) => err.field === "numeroBon"
                  )
                : null
            }
          />
        </div>
        {/* fin Input type de remorquage et numéro de bon  */}

        {/* debut input marque vehicule */}
<ASInput
  label="Marque de Véhicule"
  name={"marqueVehicule"}
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
/>
        {/* fin input marque vehicule */}

          <Form.Item>
            <ATInput
              placeholder="Entrez un № d'immatriculation"
              type={"text"}
              label="№ d'immatriculation"
              name={"numeroMatricule"}
              style={{
                width: "100%",
              }}
              rules={[
                {
                  required: true,
                  message: "Entrez un № d'immatriculation",
                },
              ]}
              error={
                error?.status === 422
                  ? error.data.errors.filter(
                      (err: any) => err.field === "numeroMatricule"
                    )
                  : null
              }
            />
          </Form.Item>
      
        {/* fin InputVehicule */}

        {/* debut input nom du client */}
        <ATInput
          name={"firstName"}
          type={"text"}
          label="Nom du client"
          placeholder="Entrez le nom du client"
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "firstName"
                )
              : null
          }
        />
        {/* fin input nom du client */}

        {/* debut input prénom du client */}
        <ATInput
          name={"lastName"}
          type={"text"}
          label="Prénom du client"
          placeholder="Entrez le prénom du client"
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "lastName"
                )
              : null
          }
        />
        {/* fin input Prénom du client*/}

        {/* debut Numéro de tel */}
        <ATInput
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "phoneNumber"
                )
              : null
          }
          type={"tel"}
          label="№ de Telephone"
          name={"phoneNumber"}
          placeholder="+225 xx xx xx xx xx"
        />
        {/* fin numéro de tel*/}

        {/* Debut nom de l'équipe */}

        <ATInput
          label="Equipe"
          name={"nameEquipe"}
          style={{
            width: "100%",
          }}
          rules={[
            {
              required: true,
              message: "Entrez le nom de l'équipe",
            },
          ]}
          placeholder="Entrez le nom de l'équipe"
          error={error?.status === 422
            ? error.data.errors.filter(
              (err: any) => err.field === "nameEquipe"
            )
            : null} type={""}        />
        {/* Fin nom de l'équipe */}

        {/* Debut statut */}
        <ARadio
          label="Statut"
          name={"statut"}
          rules={[
            {
              required: true,
              message: "Entrez un statut",
            },
          ]}
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "statut")
              : null
          }
          options={[
            { label: "Retiré", value: "Retiré" },
            { label: "Non retiré", value: "Non retiré" },
          ]}
        />
        {/* Fin statut*/}

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
          label="Montant"
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
              description={"l'ajout de l'employé à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
};

export default CreateRemorquageComponent;
