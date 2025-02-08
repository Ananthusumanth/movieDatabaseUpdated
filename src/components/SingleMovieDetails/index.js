import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
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
  const [ids, setids] = useState()

  const getSingleMovieApi = async () => {
    const histroy = props
    const {match} = histroy
    const {params} = match
    const {id} = params
    setids(id)
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=232f4723165efc376cae1d6370598b57&language=en-US`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      setSingleMovie({
        singleMovieData: data,
        state: apiContentResponse.success,
      })
    } else {
      setSingleMovie({state: apiContentResponse.isFailed})
    }
  }

  useEffect(() => {
    setSingleMovie({state: apiContentResponse.in_progress})
    getSingleMovieApi()
  }, [])

  const isloadingView = () => (
    <div className="single-popular-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="green" height={30} wight={50} />
      </div>
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

  let background

  if (
    singleMovie.singleMovieData !== null &&
    singleMovie.singleMovieData !== undefined
  ) {
    background = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${singleMovie.singleMovieData.backdrop_path}`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    }
  }

  const successView = () => (
    <>
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
                {singleMovie.singleMovieData.genres.map(each => (
                  <li key={each.id}>{each.name}</li>
                ))}
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
    </>
  )

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
        return isloadingView()
    }
  }

  return <>{renderResponse()}</>
}

export default SingleMoviesDetails
