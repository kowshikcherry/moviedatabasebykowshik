import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SingleRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    moviesData: {},
  }

  componentDidMount() {
    // console.log('Location object:')
    this.getSingleMoviesData()
  }

  getSingleMoviesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const upiUrlId = this.props.match.params.id
    const responseforjobs = await fetch(
      `https://api.themoviedb.org/3/movie/${upiUrlId}?api_key=44fa665c2eb7d1d4f0961f299cb047aa&language=en-US`,
    )
    const jobsdata = await responseforjobs.json()
    // console.log(jobsdata)
    this.setState({
      apiStatus: apiStatusConstants.success,
      moviesData: {...jobsdata},
    })
  }

  renderSuccessView = () => {
    const {moviesData} = this.state
    // console.log(moviesData)
    return (
      <div className="singlemainDiv">
        <img
          className="singleimg"
          src={`https://image.tmdb.org/t/p/w500${moviesData.poster_path}`}
        />
        <div className="singlecontantDiv">
          <h1>{moviesData.title}</h1>
          <ul>
            {moviesData.genres.map(i => (
              <li key={i.id}>{i.name}</li>
            ))}
          </ul>
          <p>Rating {moviesData.vote_average}</p>
          <p>Duration {moviesData.runtime}</p>
          <p>Release Date {moviesData.release_date}</p>
          <p>Overview{moviesData.overview}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderMyProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <div className="movieHeaderDiv">
          <Link to={`/movie/${this.props.match.params.id}/credits`}>
            <button className="movieHeader" type="button">
              Movie cast
            </button>
          </Link>
        </div>
        {this.renderMyProfile()}
      </>
    )
  }
}
export default withRouter(SingleRoute)
