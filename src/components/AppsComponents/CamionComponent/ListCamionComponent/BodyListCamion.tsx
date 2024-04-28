import EmptyComponent from "@components/SharedComponents/SystemComponents/EmptyComponent";
import { setPaginate } from "@redux/feature/slices/search_paginate_slice";
import { ConfigProvider, Table } from "antd";
import { useDispatch } from "react-redux";
import { ListCamionConfig } from "./BodyListCamionComponents/ListCamionConfig";
import ListCamionController from "./BodyListCamionComponents/ListCamionController";

function BodyListCamion() {
  const { DataListCamion, Loading, Error, errorData, params, skip }: any =
    ListCamionController();
  const dispatch = useDispatch();
  const EmptyTable = () => {
    return <EmptyComponent error={errorData} />;
  };

  return (
    <ConfigProvider renderEmpty={EmptyTable}>
      <Table
        columns={ListCamionConfig}
        dataSource={Error ? null : DataListCamion}
        loading={Loading}
        rowKey="id"
        footer={() => (
          <div className="pt-10" style={{ textAlign: "left" }}>
            {Loading ? (
              <>Loading...</>
            ) : Error ? null : (
              <>
                <b>Resultats : </b>

                {!skip
                  ? DataListCamion.length
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
  );
}

export default BodyListCamion;
