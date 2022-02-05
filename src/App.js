import { Fragment, useState } from 'react';
import Header from './components/Header/Header'
import SearchBar from './components/Search/SearchBar';
import Album from './components/AlbumView/Album'

import axios from 'axios'

function App() {
  const [viewAlbum,setViewAlbum] = useState(null)

  const submitHandler = (type,album)=>{
    const getAlbumData = async ()=>{
      let res;
      if(type==='id'){
        res = await axios.get(`http://192.168.0.103:3001/album/${album}`);
      }
      else if(type==='first'){
        res = await axios.get(`http://192.168.0.103:3001/first/album/${album}`);
      }

      if(res.data.statusCode===200){
        setViewAlbum(res.data.data)
      }else{
        setViewAlbum(null)
      }
      
    }
    getAlbumData();
  }

  const resetAlbum = ()=>{
    setViewAlbum(null)
  }

  return (
    <Fragment>
      <Header/>
      <main>
        <SearchBar submitHandler={submitHandler} resetAlbum={resetAlbum}/>
        {viewAlbum && <Album albumData={viewAlbum}/>}
      </main>
    </Fragment>
  );
}

export default App;
