import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './AlbumTrack.module.css'
import { AppActions } from '../../../../store/index'
import { useSelector } from 'react-redux'

const AlbumTrack = (props)=>{
    const {track_number,name} = props
    const viewAlbum = useSelector(state=>state.viewAlbum)
    const [checked,setChecked] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setChecked(false)
    },[viewAlbum])

    const clickHandler = ()=>{
        if(props.trackState==="checkbox"){
            setChecked(prevState=>!prevState)
            //here !checked because state doesnt update before the dispatch runs
            if(!checked) dispatch(AppActions.addToSelectedTracks({item: props.id}))
            else dispatch(AppActions.removeFromSelectedTracks({item: props.id}))
        }
    }

    let trackState;
    
    // console.log(props.trackState)
    if(props.trackState==="checkbox"){
        trackState = <div className={styles['checkbox']}>
            {checked && <div className={styles['checked']}>{}</div>}
        </div>
    }else if(props.trackState==="searching"){
        trackState=<div>Searching</div>
    }else if(props.trackState==="found"){
        trackState=<div>Downloading</div>
    }else if(props.trackState==="not found"){
        trackState=<div>Not Found</div>
    }else if(props.trackState==="errored"){
        trackState=<div>Error</div>
    }else if(typeof props.trackState==='object'){
        trackState=<a target="_blank" href={props.trackState.link}>Download</a>
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