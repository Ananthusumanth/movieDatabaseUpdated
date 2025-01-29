import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import './index.css'

const apiContentResponse = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  isFailed: 'ISFAILED',
  success: 'SUCCESS',
}

const SearchMovies = () => {
  const [searchMovie, setSearchMovie] = useState({
    state: apiContentResponse.initial,
    searchMovieData: null,
  })
  const [searchText, setSearchText] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setpostPerPage] = useState(6)

  useEffect(() => {
    setSearchMovie({state: apiContentResponse.initial})
  }, [])

  const getSeachMovieApi = async () => {
    setSearchMovie({state: apiContentResponse.in_progress})
    const url = `https://api.themoviedb.org/3/search/movie?api_key=232f4723165efc376cae1d6370598b57&language=en-US&query=${searchText}&page=1`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setSearchMovie({
        searchMovieData: data.results,
        state: apiContentResponse.success,
      })
    } else {
      setSearchMovie({state: apiContentResponse.isFailed})
    }
  }

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  let currentPosts
  if (
    searchMovie.searchMovieData !== undefined &&
    searchMovie.searchMovieData !== null
  ) {
    currentPosts = searchMovie.searchMovieData.slice(
      firstPostIndex,
      lastPostIndex,
    )
  }

  const searchChange = event => {
    setSearchText(event.target.value)
  }

  const searchData = () => {
    setSearchValue(searchText)
    getSeachMovieApi()
  }

  const isloadingView = () => (
    <div className="search-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="green" height={30} wight={50} />
    </div>
  )

  const isfailureView = () => (
    <div className="search-loader-container">
      <h1>Something went Wrong!</h1>
      <p>Sorry, we cannot get data</p>
      <button type="button" className="failureButton">
        Try Again
      </button>
    </div>
  )

  const successView = () => {
    return (
      <>
        <div className="search-popular-body">
          {searchMovie.searchMovieData.length === 0 ? (
            <p>{`Not find data for ${searchValue}`}</p>
          ) : (
            currentPosts.map(each => (
              <div className="popular-poster-body" key={each.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${each.poster_path}`}
                  alt="search-poster"
                  className="posterImage"
                />
                <h1 className="title">{each.title}</h1>
                <div className="viewDetails">
                  <Link to={`/movie/${each.id}`}>
                    <button type="button" className="viewDetailsButton">
                      View Details
                    </button>
                  </Link>
                  <p>{each.vote_average}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    )
  }

  const initialView = () => {}

  const renderResponse = () => {
    const {state} = searchMovie
    switch (state) {
      case apiContentResponse.in_progress:
        return isloadingView()
      case apiContentResponse.isFailed:
        return isfailureView()
      case apiContentResponse.success:
        return successView()
      case apiContentResponse.initial:
        return initialView()
      default:
        null
    }
  }

  const totalpostsLength = () => {
    if (
      searchMovie.searchMovieData === null ||
      searchMovie.searchMovieData === undefined
    ) {
      return 1
    } else {
      return searchMovie.searchMovieData.length
    }
  }

  return (
    <>
      <div className="Search-headerSection1">
        <h1 className="main-Logo">movieDB</h1>
        <div className="serch-header">
          <Link to="/">
            <h1 className="button">Popular</h1>
          </Link>
          <Link to="/top-rated">
            <h1 className="button">Top Rated</h1>
          </Link>
          <Link to="/upcoming">
            <h1 className="button">Upcoming</h1>
          </Link>
        </div>
        <div className="searchBar">
          <input
            role="textbox"
            className="input"
            value={searchText}
            onChange={searchChange}
          />
          <button type="button" className="search-icon" onClick={searchData}>
            Search
          </button>
        </div>
      </div>
      <div className="serch-header-small">
        <Link to="/">
          <h1 className="button">Popular</h1>
        </Link>
        <Link to="/top-rated">
          <h1 className="button">Top Rated</h1>
        </Link>
        <Link to="/upcoming">
          <h1 className="button">Upcoming</h1>
        </Link>
      </div>
      <div className="search-body">
        <div className="search-body-container">{renderResponse()}</div>
      </div>
      <div className="pagination">
        <Pagination
          totalposts={totalpostsLength()}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default SearchMovies
