
import { useGetTypeVehiculeByNameQuery, useGetTypesVehiculesQuery } from "@redux/feature/services/TypesVehiculesServices";
import { useSelector } from "react-redux";

export default function ListTypeVehiculeController() {
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
  } = useGetTypesVehiculesQuery(paginate);
  const filteredListTypeVehicule =
    data?.data &&
    data?.data.map((typeVehicule: {id: string; name: string; penality: string}) => ({
      id: typeVehicule?.id,
      typeVehicule: typeVehicule?.name,//les données qui sont à droit sont mes données name de mon input et à gauche sont les données sur postman
      montant: typeVehicule?.penality,

    }));

  const params = data.meta;

  //Data for search
  const {
    data: dataSearched = [],
    isFetching: isFetchingSearch,
    isError: isErrorSearched,
    error: errorSearched,
  } = useGetTypeVehiculeByNameQuery(nameSearch, { skip });
  console.log(dataSearched);

  const filteredListTypeVehiculeSearched =
    dataSearched &&
    dataSearched.map((typeVehicule: {id: string; name: string; penality:string }) => ({
      id: typeVehicule?.id,
      typeVehicule: typeVehicule?.name,//les données aui sont sur postman
      montant: typeVehicule?.penality,
    
    }));

  const DataListTypeVehicule = skip
    ? filteredListTypeVehicule
    : filteredListTypeVehiculeSearched;
  const Loading = skip ? isFetching : isFetchingSearch;
  const Error = skip ? isError : isErrorSearched;
  const errorData = skip ? error : errorSearched;

  return {
    DataListTypeVehicule,
    Loading,
    Error,
    errorData,
    params,
    skip,
  };
}
