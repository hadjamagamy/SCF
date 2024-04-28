import { Avatar, Drawer } from "antd";
import { useState } from "react";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import { useGetGroupeByIdQuery } from "@redux/feature/services/GroupesServices";
import EditGroupeComponent from "../FormGroupeComponent/EditGroupeComponent";
import ModalDeleteGroupe from "./ModalDeleteGroupe";
import { UserOutlined } from "@ant-design/icons";

function FicheGroupeComponent({ id, close }: any) {
  const result: any = useGetGroupeByIdQuery(id);

  const { data, isLoading, isError } = result;

  return data ? (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <AText bold>Nom du Groupe</AText>
        <AText>{data?.name ? data?.name : "Indisponible"}</AText>
      </div>
      <div className="space-y-3">
        <AText bold>Description</AText>
        <AText>{data?.description ? data?.description : "Indisponible"}</AText>
      </div>
      <div className="space-y-3">
        <AText bold>Membre du groupe</AText>
        <div className="grid grid-cols-1 gap-y-3">
          {data.employees.map(
            (
              item: { first_name: string; last_name: string; fonction: string },
              index: number
            ) => (
              <div className="flex space-x-2">
                <div>
                  {" "}
                  <Avatar
                    size={38}
                    icon={<UserOutlined />}
                    key={index}
                    src={null}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex-col flex space-y-1">
                  <AText>{item.first_name + " " + item.last_name}</AText>
                  <AText className="text-gray-500">{item.fonction}</AText>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-8">
        <ModalDeleteGroupe close={() => close()} id={id} button />
        <AccessFicheModification id={id} />
      </div>
    </div>
  ) : isError ? (
    <>Une erreur est survenue</>
  ) : (
    isLoading
  );
}

function AccessFicheModification({ id }: any) {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <>
      <AButton
        className="flex -space-y-0.5 items-center"
        action={showDrawer}
        icon="edit_square"
      >
        Modifier
      </AButton>

      <Drawer
        width={600}
        closable={true}
        placement="right"
        onClose={onClose}
        open={visible}
        destroyOnClose
        title={
          <AText size="base+3" bold>
            Modifier Groupe
          </AText>
        }
      >
        <div className="px-12 ">
          <EditGroupeComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}

export default FicheGroupeComponent;
