import { Fragment, useRef,useEffect, useState } from 'react'
import styles from './SearchBar.module.css'
import axios from 'axios'
import SearchResults from './Results/SearchResults'
import { useDispatch, useSelector } from 'react-redux'
import { AppActions } from '../../store/index'

const SearchBar = (props)=>{
    const dispatch = useDispatch()
    const albumNameRef= useRef()
    
    const query = useSelector(state=>state.searchQuery)
    const searchResults = useSelector(state=>state.searchResults)

    const formSubmitHandler = async (e)=>{
        e.preventDefault()
        const res = await axios.get(`http://192.168.0.103:3001/first/album/${query}`);
        if(res.data.statusCode===200){
            dispatch(AppActions.setViewAlbum({item: res.data.data}))
          }else{
            dispatch(AppActions.setViewAlbum({item: null}))
          }
        dispatch(AppActions.setSearchResults({item: []}))
    }

    const albumChangeHandler = (e)=>{
        dispatch(AppActions.setSearchQuery({item: e.target.value}))
    }

    useEffect(()=>{
        const timeout = setTimeout(async ()=>{
            if(query.trim().length>0){
                const searched_res = await axios.get(`http://192.168.0.103:3001/search/album/${query}`)
                console.log(searched_res.data.data.albums.items)
                dispatch(AppActions.setSearchResults({item: searched_res.data.data.albums.items}))
            }
            else{
                dispatch(AppActions.setSearchResults({item: []}))
                dispatch(AppActions.setViewAlbum({item: null}))
            }
        },500)

        return ()=>{
            clearTimeout(timeout)
        }
    },[query])

    return (
        <Fragment>
            <form className={styles['search-container']} onSubmit={formSubmitHandler}>
                <input onChange={albumChangeHandler} ref={albumNameRef} type="text" className={styles['search-bar']}/>
                <button className={styles['search-btn']}>Search</button>
            </form>
            <SearchResults results={searchResults}/>
        </Fragment>
    )
}

export default SearchBar;