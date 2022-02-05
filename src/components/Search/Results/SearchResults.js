import SearchResult from './SearchResult'
import styles from './SearchResults.module.css'

const SearchResults = (props)=>{

    if(props.found.length>0){
        const selectAlbumHandler = (id)=>{
            props.selectAlbumHandler(id)
        }
        return (
            <div className={styles['search-results']}>
                {props.found.map(a=>{
                    return <SearchResult selectAlbumHandler={selectAlbumHandler} key={a.id} album={a}/>
                })}
            </div>
        )
    }else{
        return null
    }
}

export default SearchResults;