import {createSlice} from '@reduxjs/toolkit';

type Maybe<T> = T | null;

interface IVessel {

}

export interface VesselTracksState {
    activeVessel: Maybe<IVessel>
}

const initialState: VesselTracksState = {
    activeVessel: null
};

export const vesselTracksSlice = createSlice({
    name: 'vesselTracks',
    initialState,
    reducers: {
        selectVessel: () => {

        },
    }
});

export const {selectVessel} = vesselTracksSlice.actions;
export default vesselTracksSlice.reducer;
