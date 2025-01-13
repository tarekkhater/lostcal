import { createSelector } from "@reduxjs/toolkit";


// Base selector to get the matches state
const selectMatchesState = (state) => state.matches;
const userState=(state)=>state.user;
// Memoized selector to get the matches data
export const selectMatchesData = createSelector(
  [selectMatchesState],
  (matchesState) => matchesState.data
);

export const userDataSelector=createSelector(
    [userState],
    (userDataState)=>userDataState.data
)

export const userToken=createSelector(
  [userState],
  (userDataState)=>userDataState.token,
)