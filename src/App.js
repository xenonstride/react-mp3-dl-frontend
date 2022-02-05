import { Fragment, useState } from 'react';
import Header from './components/Header/Header'
import SearchBar from './components/Search/SearchBar';
import Album from './components/AlbumView/Album'

import { useDispatch,useSelector } from 'react-redux';

function App() {
  const viewAlbum = useSelector(state=>state.viewAlbum)

  return (
    <Fragment>
      <Header/>
      <main>
        <SearchBar/>
        {viewAlbum && <Album/>}
      </main>
    </Fragment>
  );
}

export default App;
