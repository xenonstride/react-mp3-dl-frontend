import { useDispatch } from 'react-redux'
import styles from './SearchResult.module.css'
import { AppActions } from '../../../store/index'
import axios from 'axios'

const SearchResult = props=>{
    const dispatch = useDispatch()
    const album = props.album

    const selectAlbumHandler = async ()=>{
        const res = await axios.get(`http://${process.env.REACT_APP_URL}:3001/album/${album.id}`);
        dispatch(AppActions.setViewAlbum({item: res.data.data}))
        dispatch(AppActions.resetSelectedTracks())
    }

    return (
        <div onClick={selectAlbumHandler} key={album.id} id={album.id} className={styles['search-result']}>
            {album.name} - {album.artists[0].name}
        </div>
    )
}

export default SearchResult;