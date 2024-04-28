import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRemorquages: builder.query({
      query: (page = 1) => `/remorquages/?page=${page}&per_page=10`,
      providesTags: ["Remorquages"],
    }),
    getRemorquageId: builder.query({
      query: () => `/remorquages`,
      providesTags: ["Remorquages"],
    }),
    getRemorquageById: builder.query({
      query: (id: string) => `/remorquages/${id}`,
      providesTags: ["Remorquages"],
    }),
    
    // rechercher les employés par nom

    getRemorquageByName: builder.query({
      query: (item: {numeroBon: string}) => `/search/remorquage?numberBon=${item.numeroBon}`,
      providesTags: ["Remorquages"],
    }),

    // Mutations

    //création d'employer
    addRemorquage: builder.mutation({
      query: (initialRemorquage: any) => ({
        url: "/remorquages",
        method: "POST",
        body: {
          ...initialRemorquage,
        },
      }),
      invalidatesTags: ["Remorquages"],
    }),

    editRemorquage: builder.mutation({
      query: (initialRemorquage: any) => ({
        url: `/remorquages/${initialRemorquage.id}`,
        method: "PATCH",
        body: {
          ...initialRemorquage,
        },
      }),
      invalidatesTags: ["Remorquages"],
    }),

    //delete
    deleteRemorquage: builder.mutation({
      query: ({ id }) => ({
        url: `/remorquages/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Remorquages"],
    }),
  }),
});

export const {
  useGetRemorquagesQuery,
  useGetRemorquageByNameQuery,
  useGetRemorquageByIdQuery,
  useGetRemorquageIdQuery,
  useDeleteRemorquageMutation,
  useAddRemorquageMutation,
  useEditRemorquageMutation,
} = extendedApiSlice;

export const { getRemorquageById, editRemorquage } = extendedApiSlice.endpoints;
