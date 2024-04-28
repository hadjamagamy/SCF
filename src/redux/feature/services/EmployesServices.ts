import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployes: builder.query({
      query: (page = 1) => `/employees/?page=${page}&per_page=10`,
      providesTags: ["Employes"],// pagination
    }),

    getEmployeById: builder.query({
      query: (id: string) => `/employees/${id}`,
      providesTags: ["Employes"],//avoir la liste d'un employé par son id
    }),

    // rechercher les employés par nom

    getEmployeByName: builder.query({
      query: (item: { firstName: string; lastName: string; numPiece: string; }) => `/search/employe?firstName=${item.firstName ?? ""}&lastName=${item.lastName ?? ""
        }&idProofNumber=${item.numPiece ?? ""}`,

      // `/search/employe?query=${item.numPiece}`
      providesTags: ["Employes"],//rechercher un employé par son cni et nom et prénom
    }),

    //fin Mutations

    //création d'employé
    addEmploye: builder.mutation({
      query: (initialEmploye: any) => ({
        url: "/employees",
        method: "POST",
        body: {
          ...initialEmploye,
        },
      }),
      invalidatesTags: ["Employes"],
    }),

    //modifir un employé
    editEmploye: builder.mutation({
      query: (initialEmploye: any) => ({
        url: `/employees/${initialEmploye.id}`,
        method: "PATCH",
        body: {
          ...initialEmploye,
        },
      }),
      invalidatesTags: ["Employes"],
    }),

    //delete
    deleteEmploye: builder.mutation({
      query: ({ id }) => ({
        url: `/employees/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Employes"],
    }),
  }),
});

export const {
  useGetEmployesQuery,
  useGetEmployeByNameQuery,
  useGetEmployeByIdQuery,
  useDeleteEmployeMutation,
  useAddEmployeMutation,
  useEditEmployeMutation,
} = extendedApiSlice;

export const { getEmployeById, editEmploye } = extendedApiSlice.endpoints;
