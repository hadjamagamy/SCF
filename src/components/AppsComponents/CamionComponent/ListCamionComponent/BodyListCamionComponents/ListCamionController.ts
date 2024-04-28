
import { useGetCamionByNameQuery, useGetCamionsQuery } from "@redux/feature/services/CamionServices";
import { useSelector } from "react-redux";

export default function ListCamionController() {
  //Selector
  const paginate = useSelector(
    (state: any) => state.searchAndPaginate.paginate
  );
  const nameSearch: any = useSelector(
    (state: any) => state.searchAndPaginate.search
  );

  //block useGetmilitantByNameQuery
  const skip = nameSearch === "" ? true : false;

  //Data for list
  const {
    data = [],
    isFetching,
    isError,
    error,
  } = useGetCamionsQuery(paginate);
  const filteredListCamion =
    data?.data &&
    data?.data.map((camion: any) => ({
      id: camion?.id,
      name: camion?.name,//les données qui sont sur postman
      marque: camion?.marque_camion,
      immatriculation: camion?.registration_number,

    }));

  const params = data.meta;

  //Data for search
  const {
    data: dataSearched = [],
    isFetching: isFetchingSearch,
    isError: isErrorSearched,
    error: errorSearched,
  } = useGetCamionByNameQuery(nameSearch, { skip });
  console.log(dataSearched);

  const filteredListCamionSearched =
    dataSearched &&
    dataSearched.map((camion: any) => ({
      id: camion?.id,
      name: camion?.name,//les données qui sont sur postman
      marque: camion?.marque_camion,
      immatriculation: camion?.registration_number,
    }));

  const DataListCamion = skip
    ? filteredListCamion
    : filteredListCamionSearched;
  const Loading = skip ? isFetching : isFetchingSearch;
  const Error = skip ? isError : isErrorSearched;
  const errorData = skip ? error : errorSearched;

  return {
    DataListCamion,
    Loading,
    Error,
    errorData,
    params,
    skip,
  };
}


