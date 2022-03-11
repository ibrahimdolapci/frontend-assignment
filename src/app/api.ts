import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IVesselPosition,
  IVesselPositionQueryArgs,
  IVesselPositionsQueryArgs,
} from "./types";
import { environments } from "./environments";

const DEFAULT_CONFIG = {
  protocol: "jsono",
  msgtype: "extended",
};

function generateQueryUrl(
  path: string,
  parameters: { [key: string]: string | number } = {}
): string {
  const parameterPairs = Object.entries({
    ...parameters,
    ...DEFAULT_CONFIG,
  }).map((pair) => pair.join(":"));
  return [path, ...parameterPairs].join("/");
}

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: environments.baseUrl,
  }),
  endpoints: (build) => ({
    positions: build.query<IVesselPosition[], IVesselPositionsQueryArgs>({
      query: (args) => ({
        url: generateQueryUrl(`exportvessels/v:8/${environments.apiKeyPS06}`, {
          ...args,
        }),
      }),
    }),
    historicalPosition: build.query<
      IVesselPosition[],
      IVesselPositionQueryArgs
    >({
      query: (args) => ({
        url: generateQueryUrl(
          `exportvesseltrack/v:3/${environments.apiKeyPS01}`,
          { ...args }
        ),
      }),
    }),
  }),
});

export const { useLazyPositionsQuery, useHistoricalPositionQuery } = api;

export default api;
