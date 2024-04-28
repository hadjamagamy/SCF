
import { Alert, Form, notification } from "antd";
import { useEffect } from "react";
import { ADatePicker, ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { useEditDepenseMutation, useGetDepenseByIdQuery } from "@redux/feature/services/DepenseServices";

function EditDepenseComponent({ id, close }: any) {
  const result: any = useGetDepenseByIdQuery(id);

  const { data } = result;
  const [editDepense, { isLoading, isError, error, isSuccess }]: any =
    useEditDepenseMutation();

  const dataFiche = data ;

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Modification effectué",
      description: "La modification de la dépense a été effectué",
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
      await editDepense({
        id: id,
        date: formData.date !== dataFiche.date ? formData.date : undefined,
        reason:
          formData.reason !== dataFiche.reason
            ? formData.reason
            : undefined,
        amount:
          formData.amount !== dataFiche.amount
            ? formData.amount
            : undefined,
      }).unwrap();
    } catch (err: any) {}
  };

  return (
    <div>
      <Form layout="vertical" onFinish={Validate}>
        {/* debut input nom */}
        <ADatePicker
          initialValue={dataFiche?.date}
          stateForm={id}
          name={"date"}
          label="Date"
          showTime
          style={{
            width: "100%",
          }}
        />
        
        {/* fin input date */}

        {/* debut input prénom */}
        <ATInput
          type={"text"}
          initialValue={dataFiche?.reason}
          stateForm={id}
          label=" Motif"
          name={"reason"}
        />
        {/* fin input prénom */}

        {/* debut input fonction */}
        <ATInput
          name={"amount"}
          type={"text"}
          label="Montant"
          initialValue={dataFiche?.amount}
          stateForm={id}
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "amount"
                )
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
              description={"la modification de la dépense à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export default EditDepenseComponent;

