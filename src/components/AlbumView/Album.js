import { useSelector } from 'react-redux';
import styles from './Album.module.css'
import AlbumDetails from './AlbumDetails/AlbumDetails';
import AlbumTracks from './AlbumTracks/AlbumTracks';

const Album = ()=>{
    const viewAlbum = useSelector(state=>state.viewAlbum)

    if(Object.keys(viewAlbum).length>0){
        return (
            <div className={styles.album}>
                <AlbumDetails />
                <AlbumTracks tracks={viewAlbum.tracks.items}/>
            </div>
        )
    }
    else{
        return null
    }
}

export default Album;