import { Drawer} from "antd";
import { useState } from "react";
import antdutils from "@utils/systemutils/antdutils";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import FicheEmployeComponent from "../../FicheEmployeComponent/FicheEmployeComponent";
export const ListEmployeConfig: any = [
  {
    title: "Nom et Fonction",
    dataIndex: "fonction",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "fonction"),
    render: (
      _: any,
      record: {
        id: string;
        fonction: string;
        name: string;
      }
    ) => (
      <AccessFiche id={record.id} name={record.name} fonction={record.fonction}/>
      
    ),
  },
  {
    title: "Pièce",
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
          <span className="font-semibold">{record.typePiece}</span>
          <span className="text-gray-500 hover:text-sky-400 cursor-pointer">{record.numPiece}</span>
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
        <span className="hover:text-sky-400 cursor-pointer"> {record.phoneNumber}</span>
      </div>
    ),
  },
];

function AccessFiche({ id, name, fonction }: any) {
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

          <span className="text-gray-500 hover:text-sky-400 cursor-pointer">{fonction}</span>
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
            Fiche Employé
          </AText>
        }
      >
        <div className="px-12 ">
          <FicheEmployeComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}
