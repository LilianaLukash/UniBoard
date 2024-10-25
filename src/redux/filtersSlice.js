import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        name: '',
         },
    reducers: {
        setFilter(state, action) {
            state.name = action.payload;
        },

    },
});

export const selectNameFilter = state => state.filters.name;

export const { setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;