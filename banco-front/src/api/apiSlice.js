import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import queryString from 'query-string';

export const sliceApi = createApi({
reducerPath:'api',
baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3001'}),
tagTypes:['users'],
endpoints:(builder) =>({
    getUsers:builder.query({
        query: () => "/users",
        providesTags:['users','account']
    }),
    createUsers:builder.mutation({
        query:(newUser)=> ({
            url: "/users",
            method: 'POST',
            body: newUser
        }),
    }),
    getUsersAccess:builder.query({
        query:(email,password) => `/users/session/${email}/${password}`,
        providesTags:['users']
    }),
    getUserLogin:builder.query({
        /*   query:(credenciales) => {
         const {email, password} = credenciales;
         return {
            url:`/users/verificacion/${email}/${password}`,
         }
        }, */
        query:(email) => {
            return {
               url:`/users/verificacion/${email}`,
            }
           }, 
        providesTags:['users']
    }),
    getUserById:builder.query({
        query:(id) => {
            return {
                url:`/users/${id}`
            }
        }
    }),
    getAccountById:builder.query({
        query:(id) => `/account/${id}`,
        providesTags:['account']
    }),

    getPruebaArreglo:builder.query({
        query:(arreglo) => `/users/arreglo/`/* + queryString.stringify({filter:arreglo}, {arrayFormat: 'bracket'}) */,
        providesTags:['users']
    }),
}),

});

export const {useGetUsersQuery,
              useCreateUsersMutation,
              useGetUsersAccessQuery,
              useGetUserLoginQuery,
              useGetAccountByIdQuery,
              useGetPruebaArregloQuery,
              useGetUserByIdQuery
             } = sliceApi