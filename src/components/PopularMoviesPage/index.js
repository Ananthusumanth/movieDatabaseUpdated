import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Pagination from '../Pagination'
import Header from '../Header'
import './index.css'

const apiContentResponse = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  isFailed: 'ISFAILED',
  success: 'SUCCESS',
}

const PopularMoviesPage = () => {
  const [popular, setPopular] = useState({
    state: apiContentResponse.initial,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setpostPerPage] = useState(6)
  const [popularData, setpopularData] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setPopular({state: apiContentResponse.in_progress})
    getPopularApi()
  }, [])

  console.log(popularData)
  console.log(searchValue)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  let currentPosts
  if (popularData !== undefined && popularData !== null) {
    currentPosts = popularData.slice(firstPostIndex, lastPostIndex)
  }

  const getPopularApi = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=232f4723165efc376cae1d6370598b57&language=en-US&page=${currentPage}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setpopularData(data.results)
      setPopular({state: apiContentResponse.success})
    } else {
      setPopular({state: apiContentResponse.isFailed})
    }
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
    return (
      <div className="popular-container">
        <div className="popular-body">
          {popularData.length === 0 ? (
            <p>{`Not find data for ${
              searchValue === '' ? '.....Nothing.....' : searchValue
            }`}</p>
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
    )
  }

  const renderResponse = () => {
    const {state} = popular
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
    if (
      popularData === null ||
      popularData === undefined ||
      popularData.length === 0
    ) {
      return 1
    } else {
      return popularData.length
    }
  }

  return (
    <>
      <Header setSearchValue={setSearchValue} setpopularData={setpopularData} />
      {renderResponse()}
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
export default PopularMoviesPage
