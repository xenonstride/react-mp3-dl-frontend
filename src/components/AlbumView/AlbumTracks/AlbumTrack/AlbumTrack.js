import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './AlbumTrack.module.css'
import { AppActions } from '../../../../store/index'

const AlbumTrack = (props)=>{
    const {track_number,name} = props
    const [checked,setChecked] = useState(false)
    const dispatch = useDispatch()

    const clickHandler = ()=>{
        setChecked(prevState=>!prevState)
        //here !checked because state doesnt update before the dispatch runs
        if(!checked) dispatch(AppActions.addToSelectedTracks({item: props.id}))
        else dispatch(AppActions.removeFromSelectedTracks({item: props.id}))
    }

    let trackState;
    
    // console.log(props.trackState)
    if(props.trackState==="checkbox"){
        trackState = <div className={styles['checkbox']}>
            {checked && <div className={styles['checked']}></div>}
        </div>
    }else if(props.trackState==="found"){
        trackState=<p>Downloading</p>
    }else if(props.trackState==="not found"){
        trackState=<p>Not Found</p>
    }else if(typeof props.trackState==='object'){
        trackState=<a href={'http://localhost:3001/download/'+props.trackState.link}>Download</a>
    }

    return (
        <div className={styles['album-track']} onClick={clickHandler}>
            <div className={styles['track-name']}>
                {track_number}. {name}
            </div>
            {trackState}
        </div>
    )
}

export default AlbumTrack