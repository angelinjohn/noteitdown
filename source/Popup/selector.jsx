const { createSelector } = require("reselect");

export const selectorFn = createSelector(
[state => state.reducer],
(title)=>(title)
)