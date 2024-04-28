import { Alert, Form, notification } from "antd";
import { useEffect } from "react";
import { ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import {
  useEditGroupeMutation,
  useGetGroupeByIdQuery,
} from "@redux/feature/services/GroupesServices";

function EditGroupeComponent({ id, close }: any) {
  const result: any = useGetGroupeByIdQuery(id);

  const { data } = result;
  const [editGroupe, { isLoading, isError, error, isSuccess }]: any =
    useEditGroupeMutation();

  const dataFiche = data;

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Modification effectué",
      description: "La modification du groupe a été effectué",
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
      await editGroupe({
        id: id,
        name: formData.name !== dataFiche.name ? formData.name : undefined,
        description:
          formData.description !== dataFiche.description
            ? formData.description
            : undefined,
        equipe: [],
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
              message: "Veuillez entrer le nom du groupe",
            },
          ]}
          initialValue={dataFiche?.name}
          name={"name"}
          type={"text"}
          label="Nom du groupe"
          stateForm={id}
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "name")
              : null
          }
        />
        {/* fin input nom */}

        {/* debut input description */}
        <ATInput
          type={"text"}
          initialValue={dataFiche?.description}
          stateForm={id}
          label=" Description du groupe"
          name={"description"}
        />
        {/* fin input description */}

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
              description={"la modification du groupe à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export default EditGroupeComponent;
