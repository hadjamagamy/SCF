import { useGetClientByNameQuery, useGetClientsQuery } from "@redux/feature/services/ClientsServices";

import { useSelector } from "react-redux";

export default function ListClientController() {
  //Selector
  const paginate = useSelector(
    (state: any) => state.searchAndPaginate.paginate
  );
  const nameSearch: any = useSelector(
    (state: any) => state.searchAndPaginate.search
  );

  //block useGetClientByNameQuery
  const skip = nameSearch === "" ? true : false;

  //Data for list
  const {
    data = [],
    isFetching,
    isError,
    error,
  } = useGetClientsQuery(paginate);
  const filteredListClient =
    data?.data &&
    data?.data.map((client: any) => ({
      id: client?.id,
      firstName: client?.first_name,//les données aui sont sur postman
      name: client?.first_name + " " + client?.last_name,
      lastName: client?.last_name,
      typePiece: client?.id_proof_type,
      numPiece: client?.id_proof_number,
      phoneNumber: client?.contact,

    }));

  const params = data.meta;

  //Data for search
  const {
    data: dataSearched = [],
    isFetching: isFetchingSearch,
    isError: isErrorSearched,
    error: errorSearched,
  } = useGetClientByNameQuery(nameSearch, { skip });
  console.log(dataSearched);

  const filteredListClientSearched =
    dataSearched &&
    dataSearched.map((client: any) => ({
      id: client?.id,
      name: client?.first_name + " " + client?.last_name,//les données qui sont sur postman
      typePiece: client?.id_proof_type,
      numPiece: client?.id_proof_number,
      phoneNumber: client?.contact,
    }));

  const DataListClient = skip
    ? filteredListClient
    : filteredListClientSearched;
  const Loading = skip ? isFetching : isFetchingSearch;
  const Error = skip ? isError : isErrorSearched;
  const errorData = skip ? error : errorSearched;

  return {
    DataListClient,
    Loading,
    Error,
    errorData,
    params,
    skip,
  };
}
