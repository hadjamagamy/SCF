import { Avatar, Drawer, Space, Tooltip } from "antd";
import { useState } from "react";
import antdutils from "@utils/systemutils/antdutils";
import AText from "@components/SharedComponents/AtomicComponents/Text";
import { UserOutlined } from "@ant-design/icons";
import FicheGroupeComponent from "../../FicheGroupeComponent/FicheGroupeComponent";

export const ListGroupeConfig: any = [
  //debut nom du groupe
  {
    title: "Noms du groupe",
    dataIndex: "name",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "name"),
    className: "w-48",
    render: (
      _: any,
      record: {
        name: string;
        id: any;
      }
    ) => <AccessFiche id={record.id} name={record.name} />,
  },
  //debut Membres du groupe
  {
    title: "Membres du groupe",
    dataIndex: "equipe",
    key: "equipe",
    className: "w-48",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "equipe"),
    render: (_: any, record:{
       id: any,
       equipe: { equipe: string }[] }) => (
      <Space size="middle" className="">
        <div className="space-x-2">
        <span className="text-gray-500" id={record.id}/>
          {record.equipe.map((item: any, index) => (
            <>
              <Tooltip
                title={
                  item.first_name + " " + item.last_name + " | " + item.fonction
                }
              >
                <Avatar
                  size={38}
                  icon={<UserOutlined />}
                  key={index}
                  src={item.equipe}
                  className="cursor-pointer"
                />
              </Tooltip>
              
            </>
          ))}
        </div>
      </Space>
    ),
  },
  //Fin membres du groupe
  //debut Description du groupe
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "description"),
    className: "w-48",
    render: (
      _: any,
      record: {
        description: string;
        id: any;
      }
    ) => (
      <div className="flex flex-col space-y-3 ">
        <div>
          <span className="text-gray-500 hover:text-sky-400 cursor-pointer" id={record.id}>
            {record.description}
          </span>
        </div>
      </div>
    ),
  },
  //Fin Description du groupe
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
        <div className="flex flex-col space-y-3 ">
          <div>
            <span className="font-semibold" id={id}>
              {name}
            </span>
          </div>
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
            Fiche groupe
          </AText>
        }
      >
        <div className="px-12 ">
          <FicheGroupeComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}