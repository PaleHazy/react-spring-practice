import { createSelector } from "reselect";

const selectState = state => state;

export const selectToggle = createSelector(
  [selectState],
  state => state.toggle
);
