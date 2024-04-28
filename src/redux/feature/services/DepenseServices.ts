import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepenses: builder.query({
      query: (page = 1) => `/depenses/?page=${page}&per_page=10`,
      providesTags: ["Depenses"],
    }),
    getDepenseId: builder.query({
      query: () => `/depenses`,
      providesTags: ["Depenses"],
    }),
    getDepenseById: builder.query({
      query: (id: string) => `/depenses/${id}`,
      providesTags: ["Depenses"],
    }),
    
    // rechercher les employés par nom

    getDepenseByName: builder.query({
      query: (item: {date: string;}) => `/search/depense?query=${item.date}`,
      providesTags: ["Depenses"],
    }),

    // Mutations

    //création d'employer
    addDepense: builder.mutation({
      query: (initialDepense: any) => ({
        url: "/depenses",
        method: "POST",
        body: {
          ...initialDepense,
        },
      }),
      invalidatesTags: ["Depenses"],
    }),

    editDepense: builder.mutation({
      query: (initialDepense: any) => ({
        url: `/depenses/${initialDepense.id}`,
        method: "PATCH",
        body: {
          ...initialDepense,
        },
      }),
      invalidatesTags: ["Depenses"],
    }),

    //delete
    deleteDepense: builder.mutation({
      query: ({ id }) => ({
        url: `/depenses/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Camions"],
    }),
  }),
});

export const {
  useGetDepensesQuery,
  useGetDepenseByNameQuery,
  useGetDepenseByIdQuery,
  useGetDepenseIdQuery,
  useDeleteDepenseMutation,
  useAddDepenseMutation,
  useEditDepenseMutation,
} = extendedApiSlice;

export const { getDepenseById, editDepense } = extendedApiSlice.endpoints;
