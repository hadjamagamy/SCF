import { useGetDepenseByNameQuery, useGetDepensesQuery } from "@redux/feature/services/DepenseServices";
import { useSelector } from "react-redux";

export default function ListDepenseController() {
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
  } = useGetDepensesQuery(paginate);
  const filteredListDepense =
    data?.data &&
    data?.data.map((depense: any) => ({
      id: depense?.id,
      date: depense?.date,//les données aui sont sur postman
      reason: depense?.reason,
      amount: depense?.amount,
    }));

  const params = data.meta;

  //Data for search
  const {
    data: dataSearched = [],
    isFetching: isFetchingSearch,
    isError: isErrorSearched,
    error: errorSearched,
  } = useGetDepenseByNameQuery(nameSearch, { skip });
  console.log(dataSearched);

  const filteredListDepenseSearched =
    dataSearched &&
    dataSearched.map((depense: any) => ({
      id: depense?.id,
      date: depense?.date,//les données qui sont sur postman
      reason: depense?.reason,
      amount: depense?.amount,

    }));

  const DataListDepense = skip
    ? filteredListDepense
    : filteredListDepenseSearched;
  const Loading = skip ? isFetching : isFetchingSearch;
  const Error = skip ? isError : isErrorSearched;
  const errorData = skip ? error : errorSearched;

  return {
    DataListDepense,
    Loading,
    Error,
    errorData,
    params,
    skip,
  };
}
