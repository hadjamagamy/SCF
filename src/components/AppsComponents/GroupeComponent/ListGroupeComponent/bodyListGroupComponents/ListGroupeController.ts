import {
  useGetGroupeByNameQuery,
  useGetGroupesQuery,
} from "@redux/feature/services/GroupesServices";
import { useSelector } from "react-redux";

export default function ListGroupeController() {
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
  } = useGetGroupesQuery(paginate);
  const filteredListGroupe =
    data?.data &&
    data?.data.map(
      (groupe: any) => ({
        id: groupe?.id,
        name: groupe?.name, //les données aui sont sur postman,
        description: groupe?.description,
        equipe: groupe?.employees,
        // employees: groupe?.employees
      })
      
    );

  const params = data.meta;

  //Data for search
  const {
    data: dataSearched = [],
    isFetching: isFetchingSearch,
    isError: isErrorSearched,
    error: errorSearched,
  } = useGetGroupeByNameQuery(nameSearch, { skip });
  console.log(dataSearched);

  const filteredListGroupeSearched =
    dataSearched &&
    dataSearched.map((groupe: any) => ({
      id: groupe?.id,
      name: groupe?.name,
      description: groupe?.description,
      equipe: groupe?.employees,
    
    }));

  const DataListGroupe = skip ? filteredListGroupe : filteredListGroupeSearched;
  const Loading = skip ? isFetching : isFetchingSearch;
  const Error = skip ? isError : isErrorSearched;
  const errorData = skip ? error : errorSearched;

  return {
    DataListGroupe,
    Loading,
    Error,
    errorData,
    params,
    skip,
  };
}