import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import SingleRoute from './components/SingleRoute'
import CastRoute from './components/CastRoute'

import './App.css'

class App extends Component {
  state = {
    searchValue: '',
    searchVisible: false,
  }

  onChangeSearch = value =>
    this.setState({searchValue: value, searchVisible: false})

  onClickForSearch = value => {
    if (value) {
      this.setState({searchVisible: true})
    } else {
      this.setState({searchValue: '', searchVisible: false})
    }
  }

  render() {
    const {searchValue, searchVisible} = this.state
    return (
      <BrowserRouter>
        <Header
          searchValue={searchValue}
          onChangeSearch={this.onChangeSearch}
          onClickForSearch={this.onClickForSearch}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home searchValue={searchValue} searchVisible={searchVisible} />
            )}
          />
          <Route
            exact
            path="/top-rated"
            render={() => (
              <Home searchValue={searchValue} searchVisible={searchVisible} />
            )}
          />
          <Route
            exact
            path="/upcoming"
            render={() => (
              <Home searchValue={searchValue} searchVisible={searchVisible} />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <Home searchValue={searchValue} searchVisible={searchVisible} />
            )}
          />
          <Route exact path="/movie/:id/credits" component={CastRoute} />
          <Route exact path="/movie/:id" component={SingleRoute} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
