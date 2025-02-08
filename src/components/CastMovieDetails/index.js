import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import CastPagination from '../CastPagination'
import './index.css'

const apiContentResponse = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  isFailed: 'ISFAILED',
  success: 'SUCCESS',
}

const CastMovieDetails = props => {
  const [castMovie, setCastMovie] = useState({
    state: apiContentResponse.initial,
    castMovieData: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(6)

  const getCastMovieApi = async () => {
    const {ids} = props
    const url2 = `https://api.themoviedb.org/3/movie/${ids}/credits?api_key=232f4723165efc376cae1d6370598b57&language=en-US`
    const response = await fetch(url2)
    if (response.ok) {
      const data = await response.json()
      // console.log(data.cast)
      setCastMovie({
        castMovieData: data.cast,
        state: apiContentResponse.success,
      })
    } else {
      setCastMovie({state: apiContentResponse.isFailed})
    }
  }

  useEffect(() => {
    setCastMovie({state: apiContentResponse.in_progress})
    getCastMovieApi()
  }, [])

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  let currentPosts
  if (
    castMovie.castMovieData !== undefined &&
    castMovie.castMovieData !== null
  ) {
    currentPosts = castMovie.castMovieData.slice(firstPostIndex, lastPostIndex)
  }

  const isloadingView = () => (
    <div className="cast-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="green" height={30} wight={50} />
    </div>
  )

  const isfailureView = () => (
    <div className="cast-loader-container">
      <button type="button" className="failureButton">
        Try Again
      </button>
    </div>
  )

  const successView = () => (
    <>
      <div className="cardDetails">
        {currentPosts.map(each => (
          <div className="castViewDetails" key={each.id}>
            <img
              className="profileImg"
              src={`https://image.tmdb.org/t/p/w500${each.profile_path}`}
              alt="cast-profile"
            />
            <div>
              <p className="names">
                Name : <span className="span">{each.original_name}</span>
              </p>
              <p className="names">
                Character : <span className="span">{each.character}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="paginationDiv">
        <CastPagination
          totalposts={castMovie.castMovieData.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  )

  const renderResponse = () => {
    const {state} = castMovie
    switch (state) {
      case apiContentResponse.in_progress:
        return isloadingView()
      case apiContentResponse.isFailed:
        return isfailureView()
      case apiContentResponse.success:
        return successView()
      default:
        return isloadingView()
    }
  }

  return <>{renderResponse()}</>
}

export default CastMovieDetails
