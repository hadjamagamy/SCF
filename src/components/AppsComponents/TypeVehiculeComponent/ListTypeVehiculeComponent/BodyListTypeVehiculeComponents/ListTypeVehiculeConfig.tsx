import { Drawer } from "antd";
import { useState } from "react";
import antdutils from "@utils/systemutils/antdutils";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import FicheTypeVehiculeComponent from "../../FicheTypeVehiculeComponent/FicheTypeVehiculeComponent";

export const ListTypeVehiculeConfig: any = [
  {
    title: "Type du Véhicule",
    dataIndex: "typeVehicule",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "typeVehicule"),
    render: (
      _: any,
      record: {
        id: string;
        typeVehicule: string;
      }
    ) => <AccessFiche id={record.id} typeVehicule={record.typeVehicule} />,
  },
  //debut Marque
  {
    title: "Montant",
    dataIndex: "montant",
    key: "montant",

    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "montant"),
    render: (
      _: any,
      record: {
        montant: string;
      }
    ) => (
      <p className="">
        <span>{record.montant}</span>
      </p>
    ),
  },
  //Fin membres du groupe
];

function AccessFiche({ id, typeVehicule }: any) {
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
          <span className="font-semibold">{typeVehicule}</span>
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
            Fiche Type véhicule
          </AText>
        }
      >
        <div className="px-12 ">
          <FicheTypeVehiculeComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}
