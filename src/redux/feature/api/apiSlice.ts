import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = 'eyJhbGciOiJSUzI1NiJ9.eyJkYXRhIjp7InVzZXJJZCI6IjMxOWQwZmQwLWM1MmEtNDdjMS1iOTg0LWE5YjIzZTNjNGExMiIsInVzZXIiOnsiZW1haWwiOiJjb3VsaWJhbHlmYXRvdW1hdGFAZ21haWwuY29tIn19LCJpYXQiOjE2ODg4MDM0MTIsImV4cCI6MTY4ODgzOTQxMn0.yj9gLCMzxyxkJkMJI9OacCqfh1cocSPV2xPeDQ-xrA3eSfRc2z5_hd3YbhCs4uJx5wMlybYrVPt-8IKl48msNZXA_sRD8skda_fQUsUufFuUzA5MHAF7oQ7_u2z-sfjGzIKSD-M3dzglRrpviRrQUzczQkvOXFvvoPyXzYDT2SJj-_b9z_hCZqKpEECpUVnBwqT1pM94BOKC-TLreveY1Fg1oAhUEZENrt8XsEQnJ8g_VEOpWcTq6Aotf_h5e_ESxn88ABz2M_B2uMgp30i4YOE3ACQ_IkRLalBUQy6nBL7cqAwAV3qy5zxNwbCkOivfWB45tFpHtIYaE2jnEzMIGRypzRt7XfpBluA58KCAQ9DfCdyPmF3_xV3poslMYVT66fveAPMA1_tNL3yGUT3taXL0__cPhN2zWz_H4dWs_pLNK71lOOXH8t5J3YVf0cWr7k2dznlNIgxe7q8htoUTo5SwlK08dmGbhpy7KRqs6_43UTIuoCrwPD9HVq4GXRZOK3n9zAIff6WHxTiNnrhYKeodLgOyAPiA1rAkguSqZS8W3i6RljLf5vh5gv1MZVXJZvs0ngpbdRB9FTJ_bPg9_o4Oj_WmQmtw5yXolYt-MH36VDQ1Le8HSUZAv0dx4Z4T3GK9ksMntYCb8U5cf8LdwM16pQvWMQYyDIy58e43kn';

      headers.set(
        "authorization",
        `Bearer ${token}`
      ); //remplacer userInfo.jzt.token par le token de postman
      // const userInfo: any = (getState() as RootState).auth.userInfo;
      // if (userInfo) {
      //   // headers.set("authorization", `Bearer ${userInfo.jwt.token}`);
      //   headers.set(
      //     "authorization",
      //     `Bearer ${token}`
      //   ); //remplacer userInfo.jzt.token par le token de postman
      // }
      return headers;
    },
    // credentials: "include",
  }),

  tagTypes: ["Employes", "Groupes", "Remorquages", "Camions", "Depenses","Clients", "Vehicules", "TypesVehicules"],
  
  endpoints: (builder) => ({}),
});
