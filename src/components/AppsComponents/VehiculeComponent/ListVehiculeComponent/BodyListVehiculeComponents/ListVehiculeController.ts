import { useGetVehiculeByNameQuery, useGetVehiculesQuery } from "@redux/feature/services/VehiculesServices";
import { useSelector } from "react-redux";

export default function ListVehiculeController() {
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
  } = useGetVehiculesQuery(paginate);
  const filteredListVehicule =
    data?.data &&
    data?.data.map((vehicule: { id: string; model: string; registration_number: string; typeVehicules: { name: string; penality: string; id: string } }) => ({
      id: vehicule?.id,
      marque: vehicule?.model,//les données aui sont sur postman
      numImmatricule: vehicule?.registration_number,
      typeDeVehicule: vehicule?.typeVehicules.name,
    }));

  const params = data.meta;

  //Data for search
  const {
    data: dataSearched = [],
    isFetching: isFetchingSearch,
    isError: isErrorSearched,
    error: errorSearched,
  } = useGetVehiculeByNameQuery(nameSearch, { skip });
  console.log(dataSearched, "data:");
  //!Array.isArray(dataSearched) ?
  const filteredListVehiculeSearched =
  dataSearched &&
  dataSearched.map((vehicule: { id: string; model: string; registration_number: string; typeVehicules: { name: string; penality: string; id: string } }) => ({
        id: vehicule?.id,
        marque: vehicule?.model,//les données aui sont sur postman
        numImmatricule: vehicule?.registration_number,
        typeDeVehicule: vehicule?.typeVehicules.name,
        
      }))
      


  console.log(filteredListVehiculeSearched, "rechercher");


  const DataListVehicule = skip
    ? filteredListVehicule
    : filteredListVehiculeSearched;
  const Loading = skip ? isFetching : isFetchingSearch;
  const Error = skip ? isError : isErrorSearched;
  const errorData = skip ? error : errorSearched;

  return {
    DataListVehicule,
    Loading,
    Error,
    errorData,
    params,
    skip,
  };
}
