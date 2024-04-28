import { Drawer } from "antd";
import { useState } from "react";
import antdutils from "@utils/systemutils/antdutils";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import FicheVehiculeComponent from "../../FicheVehiculeComponent/FicheVehiculeComponent";

export const ListVehiculeConfig: any = [
  {
    title: "Marque du véhicule",
    dataIndex: "marque",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "marque"),
    
    render: (
      _: any,
      record: {
        id: string;
        marque: string;
        numImmatricule: string;
      }
    ) => (
      <AccessFiche
        id={record.id}
        marque={record.marque}
        numImmatricule={record.numImmatricule}
      />
    ),
  },
  //debut Marque
  {
    title: "Types de véhicule ",
    dataIndex: "typeDeVehicule",
    key: "typeDeVehicule",
   
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "typeDeVehicule"),
    render: (
      _: any,
      record: {
        typeDeVehicule: string;
      }
    ) => (
      <p className="">
        <span>{record.typeDeVehicule}</span>
      </p>
    ),
  },
  //Fin membres du groupe
];

function AccessFiche({ id, marque, numImmatricule }: any) {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <>
      <div
        onClick={showDrawer}
        className="flex cursor-pointer items-center space-x-3"
      >
        <div className="flex flex-col flex-start">
          <span className="font-semibold">{marque}</span>

          <span className="text-gray-500 hover:text-sky-400 cursor-pointer">{numImmatricule}</span>
        </div>
      </div>

      <Drawer
        width={600}
        closable={true}
        placement="right"
        onClose={onClose}
        open={visible}
        destroyOnClose
        title={
          <AText size="base+3" bold>
            Fiche véhicule
          </AText>
        }
      >
        <div className="px-12 ">
          <FicheVehiculeComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}
