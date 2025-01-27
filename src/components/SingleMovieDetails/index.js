import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
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

  useEffect(() => {
    setSingleMovie({state: apiContentResponse.in_progress})
    getSingleMovieApi()
  }, [])

  const getSingleMovieApi = async () => {
    const histroy = props
    const {match} = histroy
    const {params} = match
    const {id} = params
    setids(id)
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=232f4723165efc376cae1d6370598b57&language=en-US`
    const url2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=232f4723165efc376cae1d6370598b57&language=en-US`
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
    const {
      backdrop_path,
      title,
      vote_average,
      runtime,
      genres,
      overview,
      release_date,
    } = singleMovie.singleMovieData

    const background = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backdrop_path})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    }
    const hours = Math.floor(runtime / 60)
    const minutes = runtime - hours * 60

    return (
      <div className="single-popular-container">
        <div className="MoviesDetailsSection" style={background}>
          <div className="Movie-details">
            <h1>{title}</h1>
            <p>{vote_average}</p>
            <p>
              {hours}H {minutes}M
            </p>
            <p>{release_date}</p>
            <div>
              <h1>genres</h1>
              <ul>
                {genres.map(each => {
                  return <li key={each.id}>{each.name}</li>
                })}
              </ul>
            </div>
            <p className="description">{overview}</p>
          </div>
        </div>
        <div className="CastDetailsSection">
          <CastMovieDetails ids={ids} />
        </div>
      </div>
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

  return (
    <>
      <Header />
      {renderResponse()}
    </>
  )
}

export default SingleMoviesDetails
