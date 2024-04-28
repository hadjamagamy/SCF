import {
  useGetEmployeByNameQuery,
  useGetEmployesQuery,
} from "@redux/feature/services/EmployesServices"
import { useSelector } from "react-redux";

export default function ListEmployeController() {
  //Selector
  const paginate = useSelector(
    (state: any) => state.searchAndPaginate.paginate
  );
  const nameSearch: any = useSelector(
    (state: any) => state.searchAndPaginate.search
  );

  //block useGetEmployeByNameQuery
  const skip = nameSearch === "" ? true : false;//POUR LES RECHERCHES INSTAntanées

  //Data for list
  const {
    data = [],
    isFetching,
    isError,
    error,
  } = useGetEmployesQuery(paginate);
  const filteredListEmploye =
    data?.data &&
    data?.data.map((employe: any) => ({
      id: employe?.id,
      firstName: employe?.first_name,//les données aui sont sur postman
      LastName: employe?.last_name,
      name: employe?.first_name + " " + employe?.last_name,
      fonction: employe?.fonction,
      typePiece: employe?.id_proof_type,
      numPiece: employe?.id_proof_number,
      phoneNumber: employe?.contact,

    }));

  const params = data.meta;// pour la pagination

  //Data for search
  const {
    data: dataSearched = [],
    isFetching: isFetchingSearch,
    isError: isErrorSearched,
    error: errorSearched,
  } = useGetEmployeByNameQuery(nameSearch, { skip });


  const filteredListEmployeSearched =
    dataSearched &&
    dataSearched.map((employe:{id:string; first_name: string; last_name: string; fonction: string; id_proof_type: string; id_proof_number: string; contact:"number" }) => ({
      id: employe?.id,
      name: employe?.first_name + " " + employe?.last_name,//les données qui sont sur postman
      firstName: employe?.first_name,//les données aui sont sur postman
      LastName: employe?.last_name,
      fonction: employe?.fonction,
      typePiece: employe?.id_proof_type,
      numPiece: employe?.id_proof_number,
      phoneNumber: employe?.contact,
    }));

  const DataListEmploye = skip// skip permet de changer la liste si c'est vraie il affiche la liste sinon...
    ? filteredListEmploye
    : filteredListEmployeSearched;
  const Loading = skip ? isFetching : isFetchingSearch;
  const Error = skip ? isError : isErrorSearched;
  const errorData = skip ? error : errorSearched;

  return {
    DataListEmploye,
    Loading,
    Error,
    errorData,
    params,
    skip,
  };
}
