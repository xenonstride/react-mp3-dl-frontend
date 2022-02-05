import { configureStore,createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: '',
    searchResults: [],
    viewAlbum: {},
    selectedTracks:[]
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchQuery(state,action){
            state.searchQuery=action.payload.item;
        },
        setSearchResults(state,action){
            state.searchResults=action.payload.item;
        },
        setViewAlbum(state,action){
            state.viewAlbum=action.payload.item;
        },
        addToSelectedTracks(state,action){
            state.selectedTracks.push(action.payload.item)
        },
        removeFromSelectedTracks(state,action){
            state.selectedTracks=state.selectedTracks.filter(it=>it!=action.payload.item)
        }
    }
})

const store = configureStore({
    reducer: AppSlice.reducer
})

export const AppActions = AppSlice.actions
export default store;