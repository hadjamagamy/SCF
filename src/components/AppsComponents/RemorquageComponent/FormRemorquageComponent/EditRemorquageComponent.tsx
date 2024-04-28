import { Alert, Form, Input, notification, Select } from "antd";
import { useEffect } from "react";
import { ADatePicker, ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import {
  useEditRemorquageMutation,
  useGetRemorquageByIdQuery,
} from "@redux/feature/services/RemorquagesServices";

function EditRemorquageComponent({ id, close }: any) {
  const result: any = useGetRemorquageByIdQuery(id);

  const { data } = result;
  const [editRemorquage, { isLoading, isError, error, isSuccess }]: any =
    useEditRemorquageMutation();

  const dataFiche = data;
  const { Option } = Select; //type de remorquage

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Modification effectué",
      description: "La modification du remorquage a été effectué",
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
      await editRemorquage({
        id: id,
        TypeRemorquage:
          formData.TypeRemorquage !== dataFiche.type_remorquage
            ? formData.TypeRemorquage
            : undefined, //les données à droite firstName: sont les données sur postman et formData.TypeRemorquage : undefinedsont les données sur postman sur postman aussi = au données à droite
        numberBon:
          formData.numberBon !== dataFiche.number_bon
            ? formData.numberBon
            : undefined,
        nameEquipage:
          formData.nameEquipage !== dataFiche.name_equipage
            ? formData.nameEquipage
            : undefined,
        status:
          formData.status !== dataFiche.status ? formData.status : undefined,
        amount:
          formData.amount !== dataFiche.amount ? formData.amount : undefined,

        // debut les données du véhicule
        marqueVehicule:
          formData.marqueVehicule !== dataFiche.marque_vehicule
            ? formData.marqueVehicule
            : undefined,
        registrationNumber:
          formData.registrationNumber !== dataFiche.registration_number
            ? formData.registrationNumber
            : undefined,
        // fin les données du véhicule
        // debut les données du client
        firstNameClient:
          formData.firstNameClient !== dataFiche.first_name_client
            ? formData.firstNameClient
            : undefined,
        lastNameClient:
          formData.lastNameClient !== dataFiche.last_name_client
            ? formData.lastNameClient
            : undefined,
        dateArrivee:
          formData.dateArrivee !== dataFiche.date_arrivee
            ? formData.dateArrivee
            : undefined,
            dateSortie:
            formData.dateSortie !== dataFiche.date_sortie
              ? formData.dateSortie
              : undefined,
              contactClient:
              formData.contactClient !== dataFiche.contact_client
                ? formData.contactClient
                : undefined,

        // fin les données du client
      }).unwrap();
    } catch (err: any) {}
  };

  return (
    <div>
      <Form layout="vertical" onFinish={Validate}>
        {/* debut input Type de Remorquage*/}
        <Input.Group className="flex justify-between ">
          <Form.Item
            label="Type de Remorquage"
            name={"TypeRemorquage"}
            style={{
              width: "45%",
            }}
            initialValue={dataFiche?.type_remorquage}
          >
            <Select>
              <Option value="TSP">TSP</Option>
              <Option value="FOURRIERE">FOURRIERE</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <ATInput
              type={"text"}
              label="№ de bon"
              name={"numberBon"}
              initialValue={dataFiche?.number_bon}
              stateForm={id}
              style={{
                width: "100%",
              }}
              error={
                error?.status === 422
                  ? error.data.errors.filter(
                      (err: any) => err.field === "numeroBon"
                    )
                  : null
              }
            />
          </Form.Item>
        </Input.Group>
        {/* fin Input type de remorquage et numéro de bon  */}

        <Form.Item>
          <ATInput
            type={"text"}
            label="№ d'immatriculation"
            name={"registrationNumber"}
            initialValue={dataFiche?.registration_number}
            stateForm={id}
            style={{
              width: "100%",
            }}
            error={
              error?.status === 422
                ? error.data.errors.filter(
                    (err: any) => err.field === "registrationNumber"
                  )
                : null
            }
          />
        </Form.Item>
        {/* fin InputVehicule */}

        {/* Debut nom du client */}
        <ATInput
          initialValue={dataFiche?.first_name_client}
          name={"firstNameClient"}
          type={"text"}
          label="Nom du client"
          stateForm={id}
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "firstNameClient"
                )
              : null
          }
        />
        {/* fin input nom */}

        {/* debut input prénom */}
        <ATInput
          type={"text"}
          initialValue={dataFiche?.last_name_client}
          stateForm={id}
          label=" Prénom du client"
          name={"lastNameClient"}
        />
        {/* fin input prénom */}

        {/* debut input contact */}
        <ATInput
          type={"tel"}
          label="№ de Telephone"
          name={"contactClient"}
          initialValue={dataFiche?.contact_client}
          stateForm={id}
        />
        {/* fin input contact */}

        {/* Debut statut */}
        <Input.Group className="flex justify-between">
          <Form.Item
            label="Statut"
            name={"status"}
            initialValue={dataFiche?.status}
            style={{
              width: "100%",
            }}
          >
            <Select
              showSearch
              options={[
                { value: "Retirer ", label: "Retirer" },
                { value: "Non retiré", label: "Non retiré" },
              ]}
              optionFilterProp="children2"
              filterOption={(input, options: any) =>
                options.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Form.Item>
        </Input.Group>
        {/* Fin statut*/}

        <ADatePicker
          initialValue={dataFiche?.date_arrivee}
          stateForm={id}
          name={"dateArrivee"}
          label="Date d'entrée"
          showTime
          style={{
            width: "100%",
          }}
        />

<ADatePicker
          initialValue={dataFiche?.date_sortie}
          stateForm={id}
          name={"dateSortie"}
          label="Date de sortie"
          showTime
          style={{
            width: "100%",
          }}
        />

        {/* debut input Montant */}
        <ATInput
          name={"amount"}
          type={"text"}
          label="Montant"
          stateForm={id}
          initialValue={dataFiche?.amount}
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "amount")
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
              description={"la modification du remorquage à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export default EditRemorquageComponent;
