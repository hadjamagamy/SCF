import { AButton } from "@components/SharedComponents/AtomicComponents/Button";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { Drawer, Space } from "antd";
import { useState } from "react";

import CreateVehiculeComponent from "../FormVehiculeComponent/CreateVehiculeComponent";
import SearchVehicule from "./BodyListVehiculeComponents/SearchVehicule";

function HeaderListVehicule() {
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
            tooltip="Ceci est la liste des Véhicules remorqués "
          >
            Liste des Véhicules
          </AText>
          {/* <Search placeholder="Search" onSearch={onSearch} className="w-80" />*/}
          <div className="flex items-center ">
            <Space size="middle">
              <AButton action={showDrawer2} icon="add">
                Ajouter un Véhicule
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
            Formulaire pour recherche un Véhicule
          </AText>
        }
      >
        <div className=" px-12">
          <SearchVehicule close={onClose} />
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
            Formulaire pour ajouter un Véhicule
          </AText>
        }
      >
        <div className=" px-12">
          <CreateVehiculeComponent close={onClose2} />
        </div>
      </Drawer>
    </>
  );
}
export default HeaderListVehicule;
