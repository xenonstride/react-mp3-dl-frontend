import { useSelector } from 'react-redux';
import styles from './Album.module.css'
import AlbumDetails from './AlbumDetails/AlbumDetails';
import AlbumTracks from './AlbumTracks/AlbumTracks';

const Album = (props)=>{
    const viewAlbum = useSelector(state=>state.viewAlbum)

    if(Object.keys(viewAlbum).length>0){
        return (
            <div className={styles.album}>
                <AlbumDetails/>
                <div style={{
                    height: '100%',
                    width: '8%'
                }}>{}</div>
                <AlbumTracks socket={props.socket}/>
            </div>
        )
    }
    else{
        return null
    }
}

export default Album;