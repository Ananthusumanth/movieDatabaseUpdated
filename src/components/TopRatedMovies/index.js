import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Pagination from '../Pagination'
import './index.css'

const apiContentResponse = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  isFailed: 'ISFAILED',
  success: 'SUCCESS',
}

const TopRatedMovies = () => {
  const [topRated, setTopRated] = useState({
    state: apiContentResponse.initial,
    topRatedData: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setpostPerPage] = useState(6)
  const [searchText, setSearchText] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setTopRated({state: apiContentResponse.in_progress})
    getTopRatedApi()
  }, [])

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  let currentPosts
  if (topRated.topRatedData !== undefined && topRated.topRatedData !== null) {
    currentPosts = topRated.topRatedData.slice(firstPostIndex, lastPostIndex)
  }

  const getTopRatedApi = async () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=232f4723165efc376cae1d6370598b57&language=en-US&page=${currentPage}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setTopRated({
        topRatedData: data.results,
        state: apiContentResponse.success,
      })
    } else {
      setTopRated({state: apiContentResponse.isFailed})
    }
  }

  const searchDataResult = async () => {
    setSearchValue(searchText)
    setTopRated({state: apiContentResponse.in_progress})
    const url = `https://api.themoviedb.org/3/search/movie?api_key=232f4723165efc376cae1d6370598b57&language=en-US&query=${searchText}&page=${currentPage}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setTopRated({
        topRatedData: data.results,
        state: apiContentResponse.success,
      })
    } else {
      setTopRated({state: apiContentResponse.isFailed})
    }
  }

  const searchChange = event => {
    setSearchText(event.target.value)
  }

  const isloadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='green' height={30} wight={50} />
    </div>
  )

  const isfailureView = () => (
    <div className='loader-container'>
      <h1>Something went Wrong!</h1>
      <p>Sorry, we cannot get data</p>
      <button type='button' className='failureButton'>
        Try Again
      </button>
    </div>
  )

  const successView = () => {
    return (
      <div className='popular-container'>
        <div className='popular-body'>
          {topRated.topRatedData.length === 0 ? (
            <p>{`Not find data for ${
              searchValue === '' ? '....Nothing.....' : searchValue
            }`}</p>
          ) : (
            currentPosts.map(each => (
              <div className='popular-poster-body' key={each.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                  alt='top-rated'
                  className='posterImage'
                />
                <h1 className='title'>{each.title}</h1>
                <div className='viewDetails'>
                  <Link to={`/movie/${each.id}`}>
                    <button type='button' className='viewDetailsButton'>
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
    )
  }

  const renderResponse = () => {
    const {state} = topRated
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
    if (topRated.topRatedData === null || topRated.topRatedData === undefined) {
      return 1
    } else {
      return topRated.topRatedData.length
    }
  }

  return (
    <>
      <div className='Search-headerSection1'>
        <h1 className='main-Logo'>movieDB</h1>
        <div className='search-header'>
          <Link to='/'>
            <h1 className='main-heading'>Popular</h1>
          </Link>
          <Link to='/top-rated'>
            <h1 className='main-heading'>Top Rated</h1>
          </Link>
          <Link to='/upcoming'>
            <h1 className='main-heading'>Upcoming</h1>
          </Link>
        </div>
        <div className='searchBar'>
          <input
            role='textbox'
            type='search'
            className='input'
            value={searchText}
            onChange={searchChange}
          />
          <button
            type='button'
            className='search-icon'
            onClick={searchDataResult}
          >
            Search
          </button>
        </div>
      </div>
      {renderResponse()}
      <div className='pagination'>
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
export default TopRatedMovies
