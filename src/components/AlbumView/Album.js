import styles from './Album.module.css'

const Album = (props)=>{

    if(Object.keys(props.albumData).length>0){
        const album=props.albumData

        let tracks=[];
        for(let t of album.tracks.items){
            tracks.push(<div key={t.id} className={styles['album-track']}>{t.track_number}. {t.name}</div>)
        }
        return (
            <div className={styles.album}>
                <div className={styles['details']}>
                    <div className={styles['album-name']}>{album.name || ""}</div>
                    <div className={styles['album-art']}> <img src={window.innerWidth>768 ? album.images[1]['url']:album.images[2]['url']} alt="" /> </div>
                </div>
                <div className={styles['tracks']}>
                    {tracks}
                </div>
            </div>
        )
    }
    else{
        return (
            <div>No Data</div>
        )
    }

    
}

export default Album;