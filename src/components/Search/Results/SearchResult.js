import styles from './SearchResult.module.css'

const SearchResult = props=>{
    const album = props.album

    const selectAlbumHandler = ()=>{
        props.selectAlbumHandler(album.id)
    }

    return (
        <div onClick={selectAlbumHandler} key={album.id} id={album.id} className={styles['search-result']}>
            {album.name} - {album.artists[0].name}
        </div>
    )
}

export default SearchResult;