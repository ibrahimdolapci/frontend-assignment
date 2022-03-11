import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../../app/store";
import {IVesselPosition} from "../../app/types";

type Maybe<T> = T | null;

export interface VesselTracksState {
    selectedPosition: Maybe<IVesselPosition>,
}

const initialState: VesselTracksState = {
    selectedPosition: null
};

export const vesselTracksSlice = createSlice({
    name: 'vesselTracks',
    initialState,
    reducers: {
        updatePosition: (state, action: PayloadAction<Maybe<IVesselPosition>>) => {
            state.selectedPosition = action.payload
        },
    }
});

export const {updatePosition} = vesselTracksSlice.actions;
export const selectVesselTracks = (state: RootState) => state.vesselTracks
export default vesselTracksSlice.reducer;
