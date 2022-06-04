import styles from './AlbumTracks.module.css'
import AlbumTrack from './AlbumTrack/AlbumTrack';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AlbumTracks = (props)=>{
    const selectedTracks = useSelector(state=>state.selectedTracks)
    const viewAlbum = useSelector(state=>state.viewAlbum)
    const allTracks = viewAlbum.tracks.items
    const {socket} = props
    const [trackStates,setTrackStates] = useState([])

    useEffect(()=>{
        setTrackStates(allTracks.map(e=>"checkbox"))
    },[viewAlbum,allTracks])

    const downloadBtnHandler = async ()=>{
        const reqObj=[]
        for(let t_id of selectedTracks){
            if(trackStates[allTracks.findIndex(t=>t.id===t_id)]==="checkbox"){
                const currSong = allTracks.find(t=>t.id===t_id)
                const {id: track_id, track_number, name: track_name, artists} = currSong
                let allArtists = artists.map(a=>a.name)
                reqObj.push({
                    track_id,
                    track_number,
                    track_name,
                    track_artists: allArtists.join(', '),
                    album_name: viewAlbum.name,
                    art_url: viewAlbum.images[1].url
                })
                setTrackStates(prevState=>{
                    const newState = [...prevState]
                    newState[allTracks.findIndex(t=>t.id===t_id)]="searching"
                    return newState
                })
            }
        }

        // console.log(reqObj)
        socket.emit('download',{
            songs: reqObj
        })
    }

    useEffect(()=>{
        socket.on('working',data=>{
            console.log(new Date().getTime());

            setTrackStates(prevState=>{
                const newState = [...prevState];
                for(let f of data){
                    if(f.found===true){
                        newState[allTracks.findIndex(e=>e.id===f.id)]="found"
                    }else if(f.found===false){
                        newState[allTracks.findIndex(e=>e.id===f.id)]="not found"
                    }
                }
                return newState
            })
        })

        socket.on('done',data=>{
            console.log(new Date().getTime())
            setTrackStates(prevState=>{
                const newState = [...prevState];
                console.log(data)
                if(data.status==="success")
                    newState[allTracks.findIndex(e=>e.id===data.id)]=data
                else if(data.status==="error")
                    newState[allTracks.findIndex(e=>e.id===data.id)]="errored"
                else console.log(`some other error ${data}`)
                
                return newState
            })
        })

        return ()=>{
            socket.off('working')
            socket.off('done')
        }
    },[allTracks,socket,selectedTracks])

    let tracks=[];
    for(let t of allTracks){
        tracks.push(<AlbumTrack key={t.id} id={t.id} track_number={t.track_number} name={t.name} trackState={trackStates[allTracks.findIndex(e=>e.id===t.id)]} />)
    }

    return (
        <div className={styles['tracks']}>
            {tracks}
            <button className={styles['dl-btn']} onClick={downloadBtnHandler} disabled={!selectedTracks.length>0}>Download</button>
        </div>
        
    )
}

export default AlbumTracks;