import { ConfigProvider, Table } from "antd";
import { useDispatch } from "react-redux";
import EmptyComponent from "@components/SharedComponents/SystemComponents/EmptyComponent";
import { setPaginate } from "@redux/feature/slices/search_paginate_slice";
import ListGroupeController from "./bodyListGroupComponents/ListGroupeController";
import { ListGroupeConfig } from "./bodyListGroupComponents/ListGroupeConfig";

function BodyListGroupe() {
  const { DataListGroupe, Loading, Error, errorData, params, skip }: any =
    ListGroupeController();

  const dispatch = useDispatch();

  const EmptyTable = () => {
    return <EmptyComponent error={errorData} />;
  };
  return (
    <div className="">
      <ConfigProvider renderEmpty={EmptyTable}>
        <Table
          columns={ListGroupeConfig}
          dataSource={Error ? null : DataListGroupe}
          loading={Loading}
          rowKey="id"
          footer={() => (
            <div className="pt-10" style={{ textAlign: "left" }}>
              {Loading ? (
                <>Loading...</>
              ) : Error ? null : (
                <>
                  <b>Résultats : </b>

                  {!skip
                    ? DataListGroupe.length
                    : params.current_page == null
                    ? "1- " +
                      Math.ceil(params.total / params.per_page) +
                      params.total
                    : params.current_page +
                      " - " +
                      Math.ceil(params.total / params.per_page) +
                      " de " +
                      params.total}
                </>
              )}
            </div>
          )}
          pagination={
            skip
              ? Loading
                ? undefined
                : Error
                ? undefined
                : {
                    pageSize: 10,
                    total: params?.total,
                    showSizeChanger: false,
                    onChange: (page: any) => dispatch(setPaginate(page)),
                  }
              : {
                  pageSize: 10,
                }
          }
        />
      </ConfigProvider>
    </div>
  );
}

export default BodyListGroupe;
