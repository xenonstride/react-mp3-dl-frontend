import { useSelector } from 'react-redux';
import styles from './AlbumDetails.module.css'

const AlbumDetails = (props)=>{
    const viewAlbum = useSelector(state=>state.viewAlbum)
    
    return (
        <div className={styles['details']}>
            <div className={styles['album-name']}>{viewAlbum.name || ""}</div>
            <div className={styles['album-art']}> <img src={window.innerWidth>768 ? viewAlbum.images[1]['url']:viewAlbum.images[2]['url']} alt="" /> </div>
        </div>
    )
}

export default AlbumDetails;