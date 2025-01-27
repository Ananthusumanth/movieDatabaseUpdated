import {Link} from 'react-router-dom'
import './index.css'

const Header = () => {
  return (
    <div className="header-container">
      <div className="headerSection1">
        <h1 className="main-Logo">movieDB</h1>
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
      <div>
        <Link to="/search">
          <button type="button" className="Search">
            Search
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header
