import { Form, Alert, notification } from "antd";
import { useEffect } from "react";
import {
  ADatePicker,
  ATInput,
} from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { useAddDepenseMutation } from "@redux/feature/services/DepenseServices";

const CreateDepenseComponent = ({ close }: any) => {
  const [addDepense, { isLoading, isError, error, isSuccess }]: any =
    useAddDepenseMutation();

  const Validate = async (formData: any) => {
    try {
      await addDepense({
        date: formData.date,
        reason: formData.reason,
        amount: formData.amount,
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
      description: "L'ajout de la dépense a été effectué",
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
        <ADatePicker
          initialValue={today}
          rules={[
            {
              required: true,
              message: "Entrez la date",
            },
          ]}
          name={"date"}
          label="Date"
          showTime
          style={{
            width: "100%",
          }}
        />
        {/* fin input nom */}

        {/* debut input Prenom */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer le motif",
            },
          ]}
          name={"reason"}
          type={"text"}
          label="Motif"
          placeholder="Entrez le motif"
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "reason")
              : null
          }
        />
        {/* fin input Prenom */}

        {/* debut input fonction */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer le montant",
            },
          ]}
          name={"amount"}
          placeholder="Entrez le montant"
          type={"text"}
          label="Montant"
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "amount")
              : null
          }
        />
        {/* fin input fonction */}

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
              description={"l'ajout de la depense a été ajouté"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
};

export default CreateDepenseComponent;
