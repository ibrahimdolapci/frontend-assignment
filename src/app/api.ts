import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {VesselPosition, VesselPositionsQuery} from "./types";
import {environments} from "./environments";

function generateQueryUrl(path: string, parameters: { [key: string]: string | number }): string {
    const parameterPairs = Object.entries(parameters).map(pair => pair.join(':'));
    return [path, ...parameterPairs].join('/')
}

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: environments.baseUrl,
    }),
    endpoints: (build) => ({
        positions: build.query<VesselPosition[], VesselPositionsQuery>({
            query: (args) => ({
                url: generateQueryUrl(`exportvessels/v:8/${environments.apiKey}`, {...args, protocol: 'json'})
            }),
        }),
    }),
})

export const {
    usePositionsQuery
} = api;

export default api;
