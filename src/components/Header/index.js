import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {searchValue, onChangeSearch, onClickForSearch} = props
  // console.log(props)
  return (
    <nav className="nav-header">
      <div className="blog-container">
        <h1 className="blog-title">movieDB</h1>
        <ul className="nav-menu">
          <Link className="nav-link" to="/">
            <li onClick={() => onClickForSearch(false)}>Home</li>
          </Link>
          <Link className="nav-link" to="/top-rated">
            <li onClick={() => onClickForSearch(false)}>Top Rated</li>
          </Link>
          <Link className="nav-link" to="/upcoming">
            <li onClick={() => onClickForSearch(false)}>Upcoming</li>
          </Link>
        </ul>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={event => onChangeSearch(event.target.value)}
          />
          <Link
            onClick={() => onClickForSearch(true)}
            className="nav-link"
            to="/search"
          >
            search
          </Link>
        </div>
      </div>
      <hr className="hrforHeader" />
    </nav>
  )
}

export default withRouter(Header)
