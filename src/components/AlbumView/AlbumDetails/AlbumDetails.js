import { useSelector } from 'react-redux';
import styles from './AlbumDetails.module.css'

const AlbumDetails = ()=>{
    const viewAlbum = useSelector(state=>state.viewAlbum)
    const selectedTracks = useSelector(state=>state.selectedTracks)
    
    return (
        <div className={styles['details']}>
            <div className={styles['album-name']}>{viewAlbum.name || ""}</div>
            <div className={styles['album-art']}> <img src={window.innerWidth>768 ? viewAlbum.images[1]['url']:viewAlbum.images[2]['url']} alt="" /> </div>
            {selectedTracks.length>0 ? <button>Download</button>:null}
        </div>
    )
}

export default AlbumDetails;