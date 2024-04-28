import { Drawer } from "antd";
import { useState } from "react";
import antdutils from "@utils/systemutils/antdutils";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import FicheDepenseComponent from "../../FicheDepenseComponent/FicheDepenseComponent";

export const ListDepenseConfig: any = [
  {
    title: "date",
    dataIndex: "date",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "date"),
    render: (
      _: any,
      record: {
        id: string;
        date: string;
      }
    ) => <AccessFiche id={record.id} date={record.date.substring(0, 10).split("-").reverse().join("/")} />,
  },
  {
    title: "Motif",
    dataIndex: "reason",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "reason"),
    render: (
      _: any,
      record: {
        reason: string;
      }
    ) => (
      <div className="flex flex-col space-y-3 ">
        <div className="flex flex-col flex-start">
          <span className="text-gray-500">{record.reason}</span>
        </div>
      </div>
    ),
  },
  {
    title: "Montant",
    dataIndex: "amount",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "amount"),
    render: (
      _: any,
      record: {
        amount: string;
      }
    ) => (
      <div className="flex flex-col space-y-21">
        <span className=""> {record.amount}</span>
      </div>
    ),
  },
];

function AccessFiche({ id, date }: any) {
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
          <span className="font-semibold">{date}</span>
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
            Fiche Dépense
          </AText>
        }
      >
        <div className="px-12 ">
          <FicheDepenseComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}
