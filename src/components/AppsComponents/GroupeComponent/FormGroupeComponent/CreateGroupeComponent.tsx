import { Form, Alert, notification, Select, Input } from "antd";
import { useEffect, useState } from "react";
import { ATInput } from "@components/SharedComponents/AtomicComponents/Input";
import {
  AButton,
  ATButton,
} from "@components/SharedComponents/AtomicComponents/Button";
import { useAddGroupeMutation } from "@redux/feature/services/GroupesServices";
import ListEmployeController from "@components/AppsComponents/EmployeComponent/ListEmployeComponent/BodyListEmployeComponents/ListEmployeController";

const CreateGroupeComponent = ({ close }: any) => {
  const [addGroupe, { isLoading, isError, error, isSuccess }]: any =
    useAddGroupeMutation();
  const { DataListEmploye }: any =
    ListEmployeController();

  const Validate = async (formData: any) => {
    try {
      await addGroupe({
        name: formData.name,
        description: formData.description,
        equipe: formData.employees,
        employeId: formData.employees,
      }).unwrap();
    } catch (err) {}
  };

  //type de pièce

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Ajout effectué",
      description: "L'ajout de l'equipe a été effectué",
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
              message: "Veuillez entrer le nom du Groupe",
            },
          ]}
          name={"name"}
          type={"text"}
          label="Nom du Groupe"
          placeholder="Entrez le Nom du Groupe"
          error={
            error?.status === 422
              ? error.data.errors.filter((err: any) => err.field === "name")
              : null
          }
        />
        {/* fin input nom */}

        {/* Debut Input nom Membres du groupe */}
        <Input.Group className="flex justify-between">
          <Form.Item
            label="Membres"
            name={"employees"}
            style={{
              width: "100%",
            }}
            rules={[
              {
                required: true,
                message: "Entrez le nom des membres",
              },
            ]}
          >
            <Select
              mode="multiple"
              options={
                DataListEmploye &&
                DataListEmploye.map((item: any) => ({
                  value: item.id,
                  label: item.name,
                }))
              }
              style={{ width: "100%" }}
              placeholder="Nom des membres"
              optionLabelProp="label"
            />
          </Form.Item>
        </Input.Group>

        {/* fin Input nom membre du groupe  */}

        {/* debut input description */}
        <ATInput
          rules={[
            {
              required: true,
              message: "Veuillez entrer une description",
            },
          ]}
          name={"description"}
          type={"text"}
          label="Description du groupe"
          placeholder="Entrez la description du Groupe"
          error={
            error?.status === 422
              ? error.data.errors.filter(
                  (err: any) => err.field === "description"
                )
              : null
          }
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
              description={"l'ajout de l'employé à échoué"}
              type="error"
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
};

export default CreateGroupeComponent;
