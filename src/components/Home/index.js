import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import EachTab from '../EachTab'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    moviesData: [],
  }

  componentDidMount() {
    // console.log('Location object:')
    this.getMoviesData()
  }

  componentDidUpdate(prevProps) {
    const {match, searchVisible} = this.props
    const {url} = match
    if (url !== prevProps.match.url) {
      this.getMoviesData()
    } else if (searchVisible !== prevProps.searchVisible) {
      this.getMoviesData()
    }
  }

  getMoviesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    // console.log(this.props)
    const {location, searchValue} = this.props
    const {pathname} = location
    const pathName = pathname
    // console.log(pathName)
    let movieUrl
    if (pathName === '/') {
      movieUrl =
        'https://api.themoviedb.org/3/movie/popular?api_key=44fa665c2eb7d1d4f0961f299cb047aa&language=en-US&page=1'
    } else if (pathName === '/top-rated') {
      movieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=44fa665c2eb7d1d4f0961f299cb047aa&language=en-US&page=1`
    } else if (pathName === '/upcoming') {
      movieUrl =
        'https://api.themoviedb.org/3/movie/upcoming?api_key=44fa665c2eb7d1d4f0961f299cb047aa&language=en-US&page=1'
    } else if (pathName === '/search') {
      movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=44fa665c2eb7d1d4f0961f299cb047aa&language=en-US&query=${searchValue}&page=1`
    }
    // console.log(movieUrl)
    const responseforjobs = await fetch(movieUrl)
    // console.log(responseforjobs)
    const jobsdata = await responseforjobs.json()
    // console.log(jobsdata)
    this.setState({
      moviesData: [...jobsdata.results],
      apiStatus: apiStatusConstants.success,
    })
  }

  renderSuccessView = () => {
    const {moviesData} = this.state
    // console.log(moviesData)
    return (
      <ul className="sucessViewUl">
        {moviesData.map(i => (
          <EachTab key={i.id} i={i} />
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
    return <div>{this.renderMyProfile()}</div>
  }
}

export default withRouter(Home)
