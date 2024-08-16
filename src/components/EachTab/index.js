import {Link} from 'react-router-dom'

import './index.css'

const EachTab = props => {
  const {i} = props
  // console.log(i)
  return (
    <li className="cardLiDiv">
      <img
        className="listCardImg"
        alt={`img${i.poster_path}`}
        src={`https://image.tmdb.org/t/p/w500${i.poster_path}`}
      />
      <div>
        <h3>title {i.original_title}</h3>
        <p>Rating {i.vote_average}</p>
        <Link to={`/movie/${i.id}`}>
          <button className="viewDetailsbutton" type="button">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}
export default EachTab
