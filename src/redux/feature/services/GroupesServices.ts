import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroupes: builder.query({
      query: (page = 1) => `/equipes/?page=${page}&per_page=10`,
      providesTags: ["Groupes"],
    }),
    getGroupeId: builder.query({
      query: () => `/equipes`,
      providesTags: ["Groupes"],
    }),
    getGroupeById: builder.query({
      query: (id: string) => `/equipes/${id}`,
      providesTags: ["Groupes"],
    }),
    
    // rechercher les employés par nom

    getGroupeByName: builder.query({
      query: (item: {name: string;}) => `/search/equipe?query=${item.name}`,
      providesTags: ["Groupes"],
    }),

    // Mutations

    //création d'employer
    addGroupe: builder.mutation({
      query: (initialGroupe: any) => ({
        url: "/equipes",
        method: "POST",
        body: {
          ...initialGroupe,
        },
      }),
      invalidatesTags: ["Groupes"],
    }),

    editGroupe: builder.mutation({
      query: (initialGroupe: any) => ({
        url: `/equipes/${initialGroupe.id}`,
        method: "PATCH",
        body: {
          ...initialGroupe,
        },
      }),
      invalidatesTags: ["Groupes"],
    }),

    //delete
    deleteGroupe: builder.mutation({
      query: ({ id }) => ({
        url: `/equipes/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Groupes"],
    }),
  }),
});

export const {
  useGetGroupesQuery,
  useGetGroupeByNameQuery,
  useGetGroupeByIdQuery,
  useGetGroupeIdQuery,
  useDeleteGroupeMutation,
  useAddGroupeMutation,
  useEditGroupeMutation,
} = extendedApiSlice;

export const { getGroupeById, editGroupe } = extendedApiSlice.endpoints;
