import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVehicules: builder.query({
            query: (page = 1) => `/vehicule/?page=${page}&per_page=10`,
            providesTags: ["Vehicules"],
        }),
        getVehiculeId: builder.query({
            query: () => `/vehicule`,
            providesTags: ["Vehicules"],
        }),
        getVehiculeById: builder.query({
            query: (id: string) => `/vehicule/${id}`,
            providesTags: ["Vehicules"],
        }),

        // rechercher les employés par nom

        getVehiculeByName: builder.query({
            query: (item: { marque: string, numImmatricule: string }) => `/search/vehicule?model=${item.marque ?? ""}&registrationNumber=${item.numImmatricule ?? ""}`,
            providesTags: ["Vehicules"],

        }),

        // Mutations

        //création d'employer
        addVehicule: builder.mutation({
            query: (initialVehicule: any) => ({
                url: "/vehicule",
                method: "POST",
                body: {
                    ...initialVehicule,
                },
            }),
            invalidatesTags: ["Vehicules"],
        }),

        editVehicule: builder.mutation({
            query: (initialVehicule: any) => ({
                url: `/vehicule/${initialVehicule.id}`,
                method: "PATCH",
                body: {
                    ...initialVehicule,
                },
            }),
            invalidatesTags: ["Vehicules"],
        }),

        //delete
        deleteVehicule: builder.mutation({
            query: ({ id }) => ({
                url: `/vehicule/${id}`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["Vehicules"],
        }),
    }),
});

export const {
    useGetVehiculesQuery,
    useGetVehiculeByNameQuery,
    useGetVehiculeByIdQuery,
    useGetVehiculeIdQuery,
    useDeleteVehiculeMutation,
    useAddVehiculeMutation,
    useEditVehiculeMutation,
} = extendedApiSlice;

export const { getVehiculeById, editVehicule } = extendedApiSlice.endpoints;
