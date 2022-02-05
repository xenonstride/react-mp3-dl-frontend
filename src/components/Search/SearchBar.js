import { Fragment, useRef,useEffect, useState } from 'react'
import styles from './SearchBar.module.css'
import axios from 'axios'
import SearchResults from './Results/SearchResults'

const SearchBar = (props)=>{
    const albumNameRef= useRef()
    const [query,setQuery] = useState('')
    const [foundAlbums,setFoundAlbums] = useState([])

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        props.submitHandler('first',albumNameRef.current.value)
        setFoundAlbums([])
    }

    const selectAlbumHandler = (id)=>{
        props.submitHandler('id',id)
    }

    const albumChangeHandler = (e)=>{
        setQuery(e.target.value)
    }

    useEffect(()=>{
        const timeout = setTimeout(async ()=>{
            if(query.trim().length>0){
                const searched_res = await axios.get(`http://192.168.0.103:3001/search/album/${query}`)
                console.log(searched_res.data.data.albums.items)
                setFoundAlbums(searched_res.data.data.albums.items)
            }
            else{
                setFoundAlbums([])
                props.resetAlbum()
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
            <SearchResults found={foundAlbums} selectAlbumHandler={selectAlbumHandler}/>
        </Fragment>
    )
}

export default SearchBar;