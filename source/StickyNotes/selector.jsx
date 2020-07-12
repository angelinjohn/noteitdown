const { createSelector } = require("reselect");

export const selectorFn = createSelector(
[state => state.notes[0]],
(note)=>(note)
)