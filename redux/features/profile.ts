import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ProfileState {
  account: { id: number; name: string; email: string; image: string } | null;
}

const initialState: ProfileState = {
  account: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<ProfileState["account"]>) => {
      state.account = action.payload;
    },
    removeAccount: (state) => {
      state.account = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccount, removeAccount } = profileSlice.actions;

export default profileSlice.reducer;

// Selector function to be used with useSelector in components
export const selectAccount = (state: RootState) => state.profile;
