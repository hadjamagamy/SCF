import { Drawer } from "antd";
import { useState } from "react";
import antdutils from "@utils/systemutils/antdutils";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import FicheCamionComponent from "../../FicheCamionComponent/FicheCamionComponent";
export const ListCamionConfig: any = [
  {
    title: "Nom du camion",
    dataIndex: "name",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "marque"),
    render: (
      _: any,
      record: {
        id: string;
        name: string;
        marque: string;
      }
    ) => (
      <AccessFiche id={record.id} name={record.name} marque={record.marque} />
    ),
  },
  {
    title: "numéro d'immatriculation",
    dataIndex: "immatriculation",
    sorter: (a: any, b: any) =>
      antdutils.antdTableSorter(a, b, "immatriculation"),
    render: (
      _: any,
      record: {
        immatriculation: string;
      }
    ) => (
      <div className="flex flex-col space-y-3 ">
        <div className="flex flex-col flex-start">
          <span className="font-semibold">{record.immatriculation}</span>
        </div>
      </div>
    ),
  },
];

function AccessFiche({ id, name, marque }: any) {
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
          <span className="font-semibold">{name}</span>

          <span className="text-gray-500 hover:text-sky-400 cursor-pointer">{marque}</span>
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
            Fiche camion
          </AText>
        }
      >
        <div className="px-12 ">
          <FicheCamionComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}
