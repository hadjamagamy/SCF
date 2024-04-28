import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCamions: builder.query({
      query: (page = 1) => `/camions/?page=${page}&per_page=10`,
      providesTags: ["Camions"],
    }),
    getCamionId: builder.query({
      query: () => `/camions`,
      providesTags: ["Camions"],
    }),
    getCamionById: builder.query({
      query: (id: string) => `/camions/${id}`,
      providesTags: ["Camions"],
    }),

    // rechercher les employés par nom

    getCamionByName: builder.query({
      query: (item: { name: string, immatriculation: string }) => `/search/camion?name=${item.name ?? ""}&registrationNumber=${item.immatriculation ?? ""
        }`,
      providesTags: ["Camions"],
    }),

    // Mutations

    //création d'employer
    addCamion: builder.mutation({
      query: (initialCamion: any) => ({
        url: "/camions",
        method: "POST",
        body: {
          ...initialCamion,
        },
      }),
      invalidatesTags: ["Camions"],
    }),

    editCamion: builder.mutation({
      query: (initialCamion: any) => ({
        url: `/camions/${initialCamion.id}`,
        method: "PATCH",
        body: {
          ...initialCamion,
        },
      }),
      invalidatesTags: ["Camions"],
    }),

    //delete
    deleteCamion: builder.mutation({
      query: ({ id }) => ({
        url: `/camions/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Camions"],
    }),
  }),
});

export const {
  useGetCamionsQuery,
  useGetCamionByNameQuery,
  useGetCamionByIdQuery,
  useGetCamionIdQuery,
  useDeleteCamionMutation,
  useAddCamionMutation,
  useEditCamionMutation,
} = extendedApiSlice;

export const { getCamionById, editCamion } = extendedApiSlice.endpoints;
