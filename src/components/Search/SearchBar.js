import { Fragment, useRef, useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import axios from "axios";
import SearchResults from "./Results/SearchResults";
import { useDispatch, useSelector } from "react-redux";
import { AppActions } from "../../store/index";

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const albumNameRef = useRef();

  const query = useSelector((state) => state.searchQuery);
  const searchResults = useSelector((state) => state.searchResults);
  const [showResults, setShowResults] = useState(false);

  const inputFocusedHandler = () => {
    setShowResults(true);
  };

  const inputFocusLostHandler = () => {
    setShowResults(false);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/first/album/${query}`
    );
    if (res.data.statusCode === 200) {
      dispatch(AppActions.setViewAlbum({ item: res.data.data }));
    } else {
      dispatch(AppActions.setViewAlbum({ item: null }));
    }
    dispatch(AppActions.resetSelectedTracks());
    inputFocusLostHandler();
    // dispatch(AppActions.setSearchResults({item: []}))
  };

  const albumChangeHandler = (e) => {
    dispatch(AppActions.setSearchQuery({ item: e.target.value }));
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.trim().length > 0) {
        const searched_res = await axios.get(
          `${process.env.REACT_APP_URL}/search/album/${query}`
        );
        console.log(searched_res.data.data.albums.items);
        dispatch(
          AppActions.setSearchResults({
            item: searched_res.data.data.albums.items,
          })
        );
      } else {
        dispatch(AppActions.resetSelectedTracks());
        dispatch(AppActions.setSearchResults({ item: [] }));
        dispatch(AppActions.setViewAlbum({ item: null }));
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <Fragment>
      <form
        className={styles["search-form-container"]}
        onSubmit={formSubmitHandler}
      >
        <input
          onChange={albumChangeHandler}
          onFocus={inputFocusedHandler}
          placeholder="Search for any Album"
          // this set timeout is required for onblur because it overrides the onlcik of the search result
          onBlur={() => setTimeout(inputFocusLostHandler, 200)}
          ref={albumNameRef}
          type="text"
          className={styles["search-bar"]}
        />
        <button className={styles["search-btn"]}>Search</button>
        {showResults && <SearchResults results={searchResults} />}
      </form>
    </Fragment>
  );
};

export default SearchBar;
