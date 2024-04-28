import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { Drawer, Space } from "antd";
import { useState } from "react";
import SearchRemorquage from "./BodyListRemorquageComponents/SearchRemorquage";
import CreateRemorquageComponent from "../FormRemorquageComponent/CreateRemorquageComponent";

function HeaderListRemorquage() {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose2 = () => {
    setVisible1(false);
  };
  const showDrawer2 = () => {
    setVisible1(true);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between  ">
          <AText
            bold
            size="high+2"
            tooltip="Ceci une vue sur l'ensemble des activités de remorquage "
          >
            Activités de remorquage
          </AText>

          <div className="flex items-center ">
            <Space size="middle">
              <AButton action={showDrawer2} icon="add">
                Ajouter un Remorquage
              </AButton>

              <AButton action={showDrawer} icon="search">
                Rechercher
              </AButton>
            </Space>
          </div>
        </div>
      </div>
      {/* Debut search  toggle  */}
      <Drawer
        width={600}
        closable={true}
        placement="right"
        onClose={onClose}
        visible={visible}
        maskClosable={false}
        destroyOnClose
        title={
          <AText size="base+3" bold>
            Formulaire pour recherche un Remorquage
          </AText>
        }
      >
        <div className=" px-12">
          <SearchRemorquage close={onClose} />
        </div>
      </Drawer>
      {/* fin search toggle  */}
      <Drawer
        width={600}
        closable={true}
        placement="right"
        onClose={onClose2}
        visible={visible1}
        maskClosable={false}
        destroyOnClose
        title={
          <AText size="base+3" bold>
            Formulaire pour ajouter un remorquage
          </AText>
        }
      >
        <div className=" px-12">
          <CreateRemorquageComponent close={onClose2} />
        </div>
      </Drawer>
    </>
  );
}

export default HeaderListRemorquage;
