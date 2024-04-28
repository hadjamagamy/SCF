import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: (page = 1) => `/clients/?page=${page}&per_page=10`,
      providesTags: ["Clients"],
    }),
    getClientId: builder.query({
      query: () => `/clients`,
      providesTags: ["Clients"],
    }),
    getClientById: builder.query({
      query: (id: string) => `/clients/${id}`,
      providesTags: ["Clients"],
    }),

    // rechercher les employés par nom

    getClientByName: builder.query({
      query: (item: { firstName: string; lastName: string; numPiece: string; }) => `/search/client?firstName=${item.firstName ?? ""}&lastName=${item.lastName ?? ""
        }&idProofNumber=${item.numPiece ?? ""}`,
      providesTags: ["Clients"],
    }),

    // Mutations

    //création d'employer
    addClient: builder.mutation({
      query: (initialClient: any) => ({
        url: "/clients",
        method: "POST",
        body: {
          ...initialClient,
        },
      }),
      invalidatesTags: ["Clients"],
    }),

    editClient: builder.mutation({
      query: (initialClient: any) => ({
        url: `/clients/${initialClient.id}`,
        method: "PATCH",
        body: {
          ...initialClient,
        },
      }),
      invalidatesTags: ["Clients"],
    }),

    //delete
    deleteClient: builder.mutation({
      query: ({ id }) => ({
        url: `/clients/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByNameQuery,
  useGetClientByIdQuery,
  useGetClientIdQuery,
  useDeleteClientMutation,
  useAddClientMutation,
  useEditClientMutation,
} = extendedApiSlice;

export const { getClientById, editClient } = extendedApiSlice.endpoints;
