import { configureStore,createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: '',
    searchResults: [],
    foundAlbum: {}
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchQuery(state,action){
            state.searchQuery=action.payload.searchQuery;
        },
        setSearchResults(state,action){
            state.searchResults=action.payload.searchResults;
        },
        setFoundAlbum(state,action){
            state.foundAlbum=action.payload.foundAlbum;
        }
    }
})

const store = configureStore({
    reducer: AppSlice.reducer
})

export const AppActions = AppSlice.actions
export default store;