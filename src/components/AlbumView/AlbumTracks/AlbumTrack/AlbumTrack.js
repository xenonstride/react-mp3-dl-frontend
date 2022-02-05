import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './AlbumTrack.module.css'
import { AppActions } from '../../../../store/index'
import { useSelector } from 'react-redux'

const AlbumTrack = (props)=>{
    const {track_number,name} = props
    const checkboxRef = useRef()
    const dispatch = useDispatch()

    const clickHandler = ()=>{
        checkboxRef.current.checked=!checkboxRef.current.checked
        if(checkboxRef.current.checked){
            dispatch(AppActions.addToSelectedTracks({item: props.id}))
        }else{
            dispatch(AppActions.removeFromSelectedTracks({item: props.id}))
        }
    }

    return (
        <div className={styles['album-track']} onClick={clickHandler}>
            <div className={styles['album-name']}>
                {track_number}. {name}
            </div>
            <input ref={checkboxRef} className={styles['dl-track']} type="checkbox"/>
        </div>
    )
}

export default AlbumTrack