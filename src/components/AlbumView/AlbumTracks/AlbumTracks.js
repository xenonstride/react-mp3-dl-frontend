import styles from './AlbumTracks.module.css'
import AlbumTrack from './AlbumTrack/AlbumTrack';

const AlbumTracks = (props)=>{
    let tracks=[];
    for(let t of props.tracks){
        tracks.push(<AlbumTrack key={t.id} id={t.id} track_number={t.track_number} name={t.name}/>)
    }

    return (
        <div className={styles['tracks']}>
            {tracks}
        </div>
    )
}

export default AlbumTracks;