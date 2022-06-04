import { useSelector } from 'react-redux';
import styles from './AlbumDetails.module.css'

const AlbumDetails = (props)=>{
    const viewAlbum = useSelector(state=>state.viewAlbum)
    
    return (
        <div className={styles['details']}>
            <div className={styles['album-name']}>{viewAlbum.name || ""}</div>
            <div className={styles['album-art']}> <img src={viewAlbum.images[1]['url']} alt="" /> </div>
        </div>
    )
}

export default AlbumDetails;