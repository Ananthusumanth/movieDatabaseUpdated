import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Pagination from '../Pagination'
import CastMovieDetails from '../CastMovieDetails'
import './index.css'

const apiContentResponse = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  isFailed: 'ISFAILED',
  success: 'SUCCESS',
}

const SingleMoviesDetails = props => {
  const [singleMovie, setSingleMovie] = useState({
    state: apiContentResponse.initial,
    singleMovieData: null,
  })
  const [searchData, setsearchData] = useState(null)
  const [ids, setids] = useState()
  const [searchText, setSearchText] = useState('')
  const [successToShow, setsuccessToShow] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setpostPerPage] = useState(6)

  useEffect(() => {
    setSingleMovie({state: apiContentResponse.in_progress})
    getSingleMovieApi()
  }, [])

  const getSingleMovieApi = async () => {
    setsuccessToShow(true)
    const histroy = props
    const {match} = histroy
    const {params} = match
    const {id} = params
    setids(id)
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=232f4723165efc376cae1d6370598b57&language=en-US`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      setSingleMovie({
        singleMovieData: data,
        state: apiContentResponse.success,
      })
    } else {
      setSingleMovie({state: apiContentResponse.isFailed})
    }
  }

  const searchDataResult = async () => {
    setsuccessToShow(false)
    // setSingleMovie({singleMovieData: null})
    setSingleMovie({state: apiContentResponse.in_progress})
    const url = `https://api.themoviedb.org/3/search/movie?api_key=232f4723165efc376cae1d6370598b57&language=en-US&query=${searchText}&page=1`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setsearchData({searchData: data.results})
      setSingleMovie({
        state: apiContentResponse.success,
      })
    } else {
      setSingleMovie({state: apiContentResponse.isFailed})
    }
  }

  const searchChange = event => {
    setSearchText(event.target.value)
  }

  const isloadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="green" height={30} wight={50} />
    </div>
  )

  const isfailureView = () => (
    <div className="loader-container">
      <h1>Something went Wrong!</h1>
      <p>Sorry, we cannot get data</p>
      <button type="button" className="failureButton">
        Try Again
      </button>
    </div>
  )

  const successView = () => {
    // const {
    //   backdrop_path,
    //   title,
    //   vote_average,
    //   runtime,
    //   genres,
    //   overview,
    //   release_date,
    // } = (singleMovie.singleMovieData === undefined) ? null : singleMovie.singleMovieData

    const background = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${
        singleMovie.singleMovieData === undefined
          ? 0
          : singleMovie.singleMovieData.backdrop_path
      })`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    }
    // const hours = Math.floor((singleMovie.singleMovieData.runtime === undefined ? 60 : singleMovie.singleMovieData.runtime)  / 60)
    // const minutes = (singleMovie.singleMovieData.runtime === undefined ? 60 : singleMovie.singleMovieData.runtime) - hours * 60

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    let currentPosts
    if (searchData !== undefined && searchData !== null) {
      currentPosts = searchData.searchData.slice(firstPostIndex, lastPostIndex)
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
              type="search"
              className="input"
              value={searchText}
              onChange={searchChange}
            />
            <button
              type="button"
              className="search-icon"
              onClick={searchDataResult}
            >
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
        {successToShow ? (
          <div className="single-popular-container">
            <div className="MoviesDetailsSection" style={background}>
              <div className="Movie-details">
                <h1>{singleMovie.singleMovieData.title}</h1>
                <p>{singleMovie.singleMovieData.vote_average}</p>
                <p>
                  {Math.floor(singleMovie.singleMovieData.runtime / 60)}H{' '}
                  {singleMovie.singleMovieData.runtime -
                    Math.floor(singleMovie.singleMovieData.runtime / 60) * 60}
                  M
                </p>
                <p>{singleMovie.singleMovieData.release_date}</p>
                <div>
                  <h1>genres</h1>
                  <ul>
                    {singleMovie.singleMovieData.genres.map(each => {
                      return <li key={each.id}>{each.name}</li>
                    })}
                  </ul>
                </div>
                <p className="description">
                  {singleMovie.singleMovieData.overview}
                </p>
              </div>
            </div>
            <div className="CastDetailsSection">
              <CastMovieDetails ids={ids} />
            </div>
          </div>
        ) : (
          <div className="popular-container">
            <div className="popular-body">
              {searchData.searchData.length === 0 ? (
                <p>{`Not find data for ${searchText}`}</p>
              ) : (
                currentPosts.map(each => (
                  <div className="popular-poster-body" key={each.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                      alt="popular-poster"
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
          </div>
        )}
      </>
    )
  }

  const renderResponse = () => {
    const {state} = singleMovie
    switch (state) {
      case apiContentResponse.in_progress:
        return isloadingView()
      case apiContentResponse.isFailed:
        return isfailureView()
      case apiContentResponse.success:
        return successView()
      default:
        null
    }
  }

  const totalpostsLength = () => {
    if (searchData === null || searchData === undefined) {
      return 1
    } else {
      return searchData
    }
  }

  return (
    <>
      {renderResponse()}
      {!successToShow && (
        <div className="pagination">
          <Pagination
            totalposts={totalpostsLength()}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  )
}

export default SingleMoviesDetails
