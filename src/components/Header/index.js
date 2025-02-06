import {useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const [searchText, setSearchText] = useState('')

  const searchDataResult = async () => {
    const {setSearchValue, setpopularData} = props
    setSearchValue(searchText)
    const url = `https://api.themoviedb.org/3/search/movie?api_key=232f4723165efc376cae1d6370598b57&language=en-US&query=${searchText}&page=1`
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data.results)
    if (response.ok) {
      setpopularData(data.results)
    } else {
      setpopularData(null)
    }
  }

  return (
    <div className="Search-headerSection1">
      <h1 className="main-Logo">movieDB</h1>
      <div className="search-header">
        <Link to="/">
          <h1 className="main-heading">Popular</h1>
        </Link>
        <Link to="/top-rated">
          <h1 className="main-heading">Top Rated</h1>
        </Link>
        <Link to="/upcoming">
          <h1 className="main-heading">Upcoming</h1>
        </Link>
      </div>
      <div className="searchBar">
        <input
          type="text"
          className="input"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
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
  )
}

export default Header
