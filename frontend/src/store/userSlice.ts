import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    userData: any;
}

const initialState: UserState = {
    userData: null
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.userData = action.payload;
        },
        clearUser: (state) => {
            state.userData = null;
        },
    },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;