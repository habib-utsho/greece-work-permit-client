import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workPermitApi = createApi({
  reducerPath: "workPermitAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),

  endpoints: (builder) => ({
    createWorkPermit: builder.mutation({
      query: (workPermitData) => {
        return {
          url: `/work-permit`,
          method: "POST",
          body: workPermitData,
        };
      },
    }),

    getAllWorkPermits: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/work-permit",
          method: "GET",
          params,
        };
      },
    }),

    getSingleWorkPermit: builder.query({
      query: (payload) => {
        const { email, password } = payload;
        // const params = new URLSearchParams();
        // if (id) params.append("id", id);
        // if (password) params.append("password", password);

        return {
          url: `/work-permit/${email}?password=${password}`,
          method: "GET",
        };
      },
    }),

    updateWorkPermit: builder.mutation({
      query: (workPermitData) => {
        return {
          url: `/work-permit/${workPermitData._id}`,
          method: "PATCH",
          body: workPermitData,
        };
      },
    }),

    deleteWorkPermit: builder.mutation({
      query: (id) => {
        return {
          url: `/work-permit/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateWorkPermitMutation,
  useGetAllWorkPermitsQuery,
  useGetSingleWorkPermitQuery,
  useLazyGetSingleWorkPermitQuery,
  useUpdateWorkPermitMutation,
  useDeleteWorkPermitMutation,
} = workPermitApi;
