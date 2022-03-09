import {configureStore} from '@reduxjs/toolkit';
import vesselTracksReducer from '../features/vessel-tracks/slice';

export const store = configureStore({
    reducer: {
        vesselTracks: vesselTracksReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
