import SearchResult from './SearchResult'
import styles from './SearchResults.module.css'

const SearchResults = (props)=>{

    if(props.results.length>0){
        return (
            <div className={styles['search-results']}>
                {props.results.map(a=>{
                    return <SearchResult key={a.id} album={a}/>
                })}
            </div>
        )
    }else{
        return null
    }
}

export default SearchResults;