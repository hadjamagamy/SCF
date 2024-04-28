import AText from "@components/SharedComponents/AtomicComponents/Text";
import antdutils from "@utils/systemutils/antdutils";
import { Badge, Drawer, Space, Tooltip } from "antd";
import { useState } from "react";
import MaterialIcon from "@components/SharedComponents/Icons/MaterialIcons";
import FicheRemorquageComponent from "../../FicheRemorquageComponent/FicheRemorquageComponent";

export const ListRemorquageConfig: any = [
  //debut Type de Remorquage
  {
    title: "type Remorquages",
    dataIndex: "numeroBon",
    sorter: (a: any, b: any) =>
      antdutils.antdTableSorter(a, b, "typeRemorquages"),
    render: (
      _: any,
      record: {
        typeRemorquages: string;
        numeroBon: string;
        id: string;
      }
    ) => (
      <AccessFiche
        id={record.id}
        typeRemorquages={record.typeRemorquages}
        numeroBon={record.numeroBon}
      />
    ),
  },
  //fin Type de Remorquage

  //debut Véhicule
  {
    title: "Véhicule",
    dataIndex: "marqueVehicule",
    sorter: (a: any, b: any) =>
      antdutils.antdTableSorter(a, b, "marqueVehicule"),
    render: (
      _: any,
      record: {
        marqueVehicule: string;
        numeroMatricule: string;
      }
    ) => (
      <div>
        <p className="flex flex-col flex-start">
          <Space>
            <span className="font-semibold">{record.marqueVehicule}</span>
          </Space>
          <span className="text-gray-500 hover:text-sky-400 cursor-pointer">{record.numeroMatricule}</span>
        </p>
      </div>
    ),
  },
  //Fin Véhicule

  //debut nom du client
  {
    title: "Client",
    dataIndex: "name",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "name"),
    render: (
      _: any,
      record: {
        name: string;
        phoneNumber: string;
      }
    ) => (
      <div>
        {record.name && record.phoneNumber ? (
          <p className="flex flex-col flex-start">
            <Space>
              <span className="font-semibold">{record.name}</span>
            </Space>
            <span className="text-gray-500 hover:text-sky-400 cursor-pointer">{record.phoneNumber}</span>
          </p>
        ) : (
          <p className="flex flex-col items-center">
            <Tooltip title="Entrez nom et prénom" className="cursor-pointer">
            <Space>
                <MaterialIcon
                  icon="horizontal_rule"
                  className="text-sm text-blue-500"
                />
            </Space>
            </Tooltip> 
            <Tooltip title="Entrez le contact" className="cursor-pointer">
              <span>
            <MaterialIcon
              icon="horizontal_rule"
              className="text-sm text-gray-500"
            />
            </span>
           </Tooltip>
          </p>
        )}
      </div>
    ),
  },
  //Fin nom du client

  //debut nom de l'equipe
  {
    title: "équipe",
    dataIndex: "nameEquipe",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "nameEquipe"),

    render: (
      _: any,
      record: {
        nameEquipe: string;
      }
    ) => (
      <p className="flex flex-col flex-start">
        <span className="font-semibold">{record.nameEquipe}</span>
      </p>
    ),
  },
  //Fin nom de l'equipe

  //debut statut
  {
    title: "Statut",
    dataIndex: "statut",
    className: "w-36",

    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "statut"),

    render: (
      _: any,
      record: {
        statut: string;
        dateEntree: string;
      }
    ) => (
      <div>
        {record.statut == "Retiré" ? (
             <Tooltip title="Véhicule retiré" className="cursor-pointer">
          <Badge text="Retiré" size="small" status="success" />
          </Tooltip>
        ) : (
          <Tooltip title="Véhicule à  retirer" className="cursor-pointer">
          <Badge text="Non Retiré" size="small" status="error" />
          </Tooltip>
        )}
      </div>
    ),
  },
  //Fin statut

  //debut nom du date entrée et sortie
  {
    title: "Date",
    dataIndex: "dateEntree",
    className: "w-36",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "dateEntree"),
    render: (
      _: any,
      record: {
        dateEntree: string;
        dateSortie: string;
        statut: string;
      }
    ) => (
      <p className="flex flex-col flex-start">
        {record.statut == "Retiré" ? (
          <div>
            <p>
              {" "}
              <Tooltip title="date d'entrée" className="cursor-pointer">
                <span className="">
                  {record.dateEntree
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")}
                  <MaterialIcon
                    icon="call_received"
                    className="text-sm text-blue-500"
                  />
                </span>
              </Tooltip>{" "}
            </p>
            <p>
              {" "}
              <Tooltip title="date de sortie" className="cursor-pointer">
                <span className="">
                  {record.dateSortie
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")}
                  <MaterialIcon
                    icon="arrow_outward"
                    className="text-sm text-red-500"
                  />
                </span>
              </Tooltip>
            </p>
          </div>
        ) : (
          <Tooltip title="date d'entrée" className="cursor-pointer">
            <span className="">
              {record.dateEntree
                .substring(0, 10)
                .split("-")
                .reverse()
                .join("/")}
              <MaterialIcon
                icon="call_received"
                className="text-sm text-blue-500"
              />
            </span>
          </Tooltip>
        )}
      </p>
    ),
  },
  //Fin date entrée et sortie

  //debut Montant
  {
    title: "Montant",
    dataIndex: "montant",
    sorter: (a: any, b: any) => antdutils.antdTableSorter(a, b, "montant"),
    render: (
      _: any,
      record: {
        montant: string;
      }
    ) => (
      <p className="flex flex-col flex-start">
        <Space size="middle">
          <span className="">{record.montant}</span>
        </Space>
      </p>
    ),
  },
];

function AccessFiche({ id, typeRemorquages, numeroBon }: any) {
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
          <span className="font-semibold">{typeRemorquages}</span>

          <span className="text-gray-500 hover:text-sky-400 cursor-pointer">{numeroBon}</span>
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
            Fiche Remorquage
          </AText>
        }
      >
        <div className="px-12 ">
          <FicheRemorquageComponent close={() => onClose()} id={id} />
        </div>
      </Drawer>
    </>
  );
}
