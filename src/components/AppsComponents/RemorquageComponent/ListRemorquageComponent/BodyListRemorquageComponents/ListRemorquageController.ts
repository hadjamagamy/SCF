import { useGetRemorquageByNameQuery, useGetRemorquagesQuery } from "@redux/feature/services/RemorquagesServices";
import { useSelector } from "react-redux";

export default function ListRemorquageController() {
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
  } = useGetRemorquagesQuery(paginate);
  const filteredListRemorquage =
    data?.data &&
    data?.data.map((remorquage: { id: string; type_remorquage: string; dateArrivee: string; dateSortie: string; number_bon: string; status: string; amount: string; firstNameClient: string; lastNameClient: string; contactClient: string; name_equipage: string; registrationNumber: string; marqueVehicule: string }) => ({
      id: remorquage?.id,
      typeRemorquages: remorquage?.type_remorquage,//les données qui sont sur postman sont à gauche et les données de mon formulaire sont à droite
      numeroBon: remorquage?.number_bon,
      marqueVehicule: remorquage?.marqueVehicule,
      numeroMatricule: remorquage?.registrationNumber,
      name: remorquage?.firstNameClient + " " + remorquage?.lastNameClient,
      firstName: remorquage?.firstNameClient,
      lastName: remorquage?.lastNameClient,
      phoneNumber: remorquage?.contactClient,
      nameEquipe: remorquage?.name_equipage,
      statut: remorquage?.status,
      dateEntree: remorquage?.dateArrivee,
      dateSortie: remorquage?.dateSortie,
      montant: remorquage?.amount,
    }));

  // data?.data &&
  // data?.data.map((remorquage: any) => ({
  //   id: remorquage?.id,
  //   typeRemorquages: remorquage?.type_remorquage ?? '',//les données qui sont sur postman sont à gauche et les données de mon formulaire sont à droite
  //   numeroBon: remorquage?.number_bon,
  //   marqueVehicule: remorquage?.vehicules == null ? "" : remorquage?.vehicules?.model,
  //   typeDeVehicule: remorquage?.type_vehicules,
  //   numeroMatricule: remorquage?.vehicules == null ? "" : remorquage?.vehicules?.registration_number ?? '',
  //   name: remorquage?.clients == null ? "" : remorquage?.clients.first_name + " " + remorquage?.clients.last_name,
  //   nameClient: remorquage?.clients == null ? "" : remorquage?.clients?.first_name,
  //   prenomClient: remorquage?.clients == null ? "" : remorquage?.clients?.last_name,
  //   phoneNumber: remorquage?.clients == null ? "" : remorquage?.clients?.contact,
  //   nameEquipe: remorquage?.name_equipage,
  //   statut: remorquage?.status,
  //   dateEntree: "01/10/2022",
  //   dateSortie: "01/01/2023",
  //   montant: remorquage?.amount,

  // }));

  const params = data.meta;

  //Data for search
  const {
    data: dataSearched = [],
    isFetching: isFetchingSearch,
    isError: isErrorSearched,
    error: errorSearched,
  } = useGetRemorquageByNameQuery(nameSearch, { skip });
  console.log(dataSearched);

  const filteredListRemorquageSearched =
    dataSearched &&
    dataSearched.map((remorquage: { id: string; type_remorquage: string; date_arrivee: string; date_sortie: string; number_bon: string; status: string; amount: string; first_name_client: string; last_name_client: string; contact_client: string; name_equipage: string; registration_number: string; marque_vehicule: string }) => ({
      id: remorquage?.id,
      typeRemorquages: remorquage?.type_remorquage,//les données qui sont sur postman sont à gauche et les données de mon formulaire sont à droite
      numeroBon: remorquage?.number_bon,
      marqueVehicule: remorquage?.marque_vehicule,
      numeroMatricule: remorquage?.registration_number,
      name: remorquage?.first_name_client + " " + remorquage?.last_name_client,
      firstName: remorquage?.first_name_client,
      lastName: remorquage?.last_name_client,
      phoneNumber: remorquage?.contact_client,
      nameEquipe: remorquage?.name_equipage,
      statut: remorquage?.status,
      dateEntree: remorquage?.date_arrivee,
      dateSortie: remorquage?.date_sortie,
      montant: remorquage?.amount,
    }));


  const DataListRemorquage = skip
    ? filteredListRemorquage
    : filteredListRemorquageSearched;
  const Loading = skip ? isFetching : isFetchingSearch;
  const Error = skip ? isError : isErrorSearched;
  const errorData = skip ? error : errorSearched;

  return {
    DataListRemorquage,
    Loading,
    Error,
    errorData,
    params,
    skip,
  };
}
