import {configureStore} from '@reduxjs/toolkit';
import vesselTracksReducer from '../features/vessel-track/slice';
import api from './api';

export const store = configureStore({
    reducer: {
        vesselTracks: vesselTracksReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        const options = { serializableCheck: false, immutableCheck: false };
        return getDefaultMiddleware(options).concat(api.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
