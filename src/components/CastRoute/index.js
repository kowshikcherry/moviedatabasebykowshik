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
      `https://api.themoviedb.org/3/movie/${upiUrlId}/credits?api_key=44fa665c2eb7d1d4f0961f299cb047aa&language=en-US`,
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
    return (
      <ul className="castUlDiv">
        {moviesData.cast.map(each => (
          <li className="castliElemnt" key={each.id}>
            <img
              className="imgforCast"
              src={`https://image.tmdb.org/t/p/w500${each.profile_path}`}
            />
            <div className="castcontantDiv">
              <h1>{each.original_name}</h1>
              <h3>{each.name}</h3>
            </div>
          </li>
        ))}
      </ul>
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
        <div className="movieHeaderDiv1">
          <Link to={`/movie/${this.props.match.params.id}`}>
            <button className="movieHeader1" type="button">
              Single Movie
            </button>
          </Link>
        </div>
        {this.renderMyProfile()}
      </>
    )
  }
}
export default withRouter(SingleRoute)
