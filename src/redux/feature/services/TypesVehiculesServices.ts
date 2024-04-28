import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTypesVehicules: builder.query({
            query: (page = 1) => `/typeVehicule/?page=${page}&per_page=10`,
            providesTags: ["TypesVehicules"],
        }),
        getTypeVehiculeId: builder.query({
            query: () => `/vehicule`,
            providesTags: ["TypesVehicules"],
        }),
        getTypeVehiculeById: builder.query({
            query: (id: string) => `/typeVehicule/${id}`,
            providesTags: ["TypesVehicules"],
        }),

        // rechercher les employés par nom

        getTypeVehiculeByName: builder.query({
            query: (item: {typeVehicule: string}) => `/search/typeVehicule?query=${item.typeVehicule}`,
            providesTags: ["TypesVehicules"],
        }),

        // Mutations

        //création d'employer
        addTypeVehicule: builder.mutation({
            query: (initialTypeVehicule: any) => ({
                url: "/typeVehicule",
                method: "POST",
                body: {
                    ...initialTypeVehicule,
                },
            }),
            invalidatesTags: ["TypesVehicules"],
        }),

        editTypeVehicule: builder.mutation({
            query: (initialTypeVehicule: any) => ({
                url: `/typeVehicule/${initialTypeVehicule.id}`,
                method: "PATCH",
                body: {
                    ...initialTypeVehicule,
                },
            }),
            invalidatesTags: ["TypesVehicules"],
        }),

        //delete
        deleteTypeVehicule: builder.mutation({
            query: ({ id }) => ({
                url: `/typeVehicule/${id}`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["TypesVehicules"],
        }),
    }),
});

export const {
    useGetTypesVehiculesQuery,
    useGetTypeVehiculeByNameQuery,
    useGetTypeVehiculeByIdQuery,
    useGetTypeVehiculeIdQuery,
    useDeleteTypeVehiculeMutation,
    useAddTypeVehiculeMutation,
    useEditTypeVehiculeMutation,
} = extendedApiSlice;

export const { getTypeVehiculeById, editTypeVehicule } = extendedApiSlice.endpoints;
