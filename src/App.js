import React, { Component } from "react";
import './App.css';
import ArtistList from "./components/ArtistList";
import ArtistDetails from "./components/ArtistDetails";

class App extends Component {

  state = {
    loggedIn: this.getHashParams().access_token ? true : false,
    clientToken: this.getHashParams().access_token,
    artists: [],
    pageIndex: 1,
    search: '',
    query: "",
    selectedArtist: null,
    error: null,
    artistNumberShowingPage: 0,
    albums: []
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g;
    var q = window.location.search.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  async getArtists(url, index) {
    try {
      const data = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.clientToken,
          'Host': 'api.spotify.com',
          'accept-encoding': 'gzip, deflate'
        })
      });

      const json_data = await data.json();

      const pages = this.state.artistNumberShowingPage;

      let reminder = 0;

      if (json_data.artists && json_data.artists.items.length === 0) {
        await this.setState(() => {
          return { error: 'sorry no result found' }
        })
      }
      else {
        await this.setState(() => {
          return { artists: json_data }
        })

        await this.setState(() => {
          return { error: null }
        })

        switch (index) {
          case 1: reminder = json_data.artists.total < pages + 12 ? json_data.artists.total : pages + 12; break;
          case -1: reminder = json_data.artists.total < 12 ? json_data.artists.total : pages - 12; break;
          default: reminder = json_data.artists.total < 12 ? json_data.artists.total : 12;
        }

        await this.setState(() => {
          return { artistNumberShowingPage: reminder }
        })

      }
    }
    catch (error) {
      window.location.href = "http://localhost:3000";
    }
  }

  displayPage = (index) => {
    switch (index) {
      default:
      case 1:
        return (<ArtistList
          access_token={this.state.clientToken}
          artists={this.state.artists}
          handleDetails={this.handleDetails}
          value={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          previous={this.previousArtistPage}
          next={this.nextArtistPage}
          error={this.state.error}
          artistNumberShowingPage={this.state.artistNumberShowingPage}
        />)
      case 0:
        return (<ArtistDetails
          access_token={this.state.clientToken}
          handleIndex={this.handleIndex}
          selectedArtist={this.state.selectedArtist}
        />)
    }
  }

  handleIndex = index => {
    this.setState({
      pageIndex: index
    })
  }

  handleDetails = (index, token, artist) => {
    this.setState({
      pageIndex: index,
      clientToken: token,
      selectedArtist: artist
    })

  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    }, () => {

    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.search && this.state.search != '') {
      this.getArtists('https://api.spotify.com/v1/search?q=' + this.state.search + '&type=artist&limit=12&offset=0', 0);
    }
    else {
      this.setState(() => {
        return { error: 'sorry.... field empty' }
      })
    }
  }

  previousArtistPage = () => {
    this.getArtists(this.state.artists.artists.previous, -1);
  }

  nextArtistPage = () => {
    this.getArtists(this.state.artists.artists.next, 1);
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?

          <React.Fragment>
            {this.displayPage(this.state.pageIndex)}
          </React.Fragment>

          :
          <React.Fragment>
            <div className="parent">
              <div className="child">
                <a href='http://localhost:3333/login'>
                  <button type="button" className="spotify-login-button">
                    <i className="fa fa-spotify fa-2x login-spotify-icon"></i>login spotify
                  </button>
                </a>
              </div>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
