import { Drawer } from "antd";
import { useState } from "react";
import antdutils from "@utils/systemutils/antdutils";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import FicheClientComponent from "../../FicheClientComponent/FicheClientComponent";
export const ListClientConfig: any = [
  {
    title: "Noms et Prénoms",
    dataIndex: "fonction",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "fonction"),
    render: (
      _: any,
      record: {
        id: string;
        phoneNumber: string;
        name: string;
      }
    ) => (
      <AccessFiche
        id={record.id}
        name={record.name}
      />
    ),
  },
  {
    title: "Pièces",
    dataIndex: "piece",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "piece"),
    render: (
      _: any,
      record: {
        typePiece: string;
        numPiece: string;
      }
    ) => (
      <div className="flex flex-col space-y-3 ">
        <div className="flex flex-col flex-start">
          <a className="font-semibold">{record.typePiece}</a>
          <a className="text-gray-500 hover:text-sky-400 cursor-pointer">{record.numPiece}</a>
        </div>
      </div>
    ),
  },
  {
    title: "Contacts",
    dataIndex: "phoneNumber",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "phoneNumber"),
    render: (
      _: any,
      record: {
        phoneNumber: string;
      }
    ) => (
      <div className="flex flex-col space-y-21">
        <a className=""> {record.phoneNumber}</a>
      </div>
    ),
  },
];

function AccessFiche({ id, name }: any) {
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
            Fiche Client
          </AText>
        }
      >
        <div className="px-12 ">
          <FicheClientComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}
