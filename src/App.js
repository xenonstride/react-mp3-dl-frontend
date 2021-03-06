import { Fragment, useEffect, useState } from 'react';
import Header from './components/Header/Header'
import SearchBar from './components/Search/SearchBar';
import Album from './components/AlbumView/Album'
// import {AppActions} from '/Users/hrishi/Documents/my-projects/react-mp3-dl-frontend/src/store/index.js'
import io from 'socket.io-client';

import {useSelector} from 'react-redux';

function App() {
  const viewAlbum = useSelector(state=>state.viewAlbum)
  const [socket,setSocket] = useState(null)

  useEffect(()=>{
    console.log(process.env.REACT_APP_URL)
    const newSocket = io(`${process.env.REACT_APP_SOCKET_URL}`)
    setSocket(newSocket)
    return ()=> newSocket.close()
  },[setSocket])

  return (
    <Fragment>
      <Header/>
      <main>
        <SearchBar/>
        {viewAlbum && <Album socket={socket}/>}
      </main>
    </Fragment>
  );
}

export default App;
