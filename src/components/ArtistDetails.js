import React, { Component } from "react";
import './ArtistDetails.css';

export default class ArtistDetails extends Component {

    state = {
        details: [],
        url: 'https://api.spotify.com/v1/search?q=artist:' + this.props.selectedArtist.name + '&type=album&limit=12&offset=5',
        reminder: 0
    }

    async componentDidMount() {

        try {
            const data = await fetch(this.state.url, {
                method: 'GET',
                headers: new Headers({
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.access_token,
                    'Host': 'api.spotify.com',
                    'accept-encoding': 'gzip, deflate'
                })
            });

            const json_data = await data.json();

            if (json_data.items && json_data.items.length === 0) {
                console.log('no data')
            }
            else {
                console.log(json_data.total)
                await this.setState((state, props) => {
                    return { details: json_data, reminder: json_data.albums.total < 12 ? json_data.albums.total : 12 }
                },
                    () => { });

                console.log(this.state)
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    async handleIndex(index) {
        console.log('hello')
        try {
            let url = '';
            if (index === -1) {
                url = this.state.details.albums.previous;
            }
            if (index === 1) {
                url = this.state.details.albums.next;
            }
            console.log(url)

            const data = await fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.access_token,
                    'Host': 'api.spotify.com',
                    'accept-encoding': 'gzip, deflate'
                })
            });

            const json_data = await data.json();
            let nbPage = this.state.reminder;

            if (json_data.items && json_data.items.length === 0) {
                console.log('no data')
            }
            else {
                if (index === -1) {
                    nbPage = nbPage - 12;
                    console.log(nbPage)
                }
                if (index === 1) {
                    if (nbPage + 12 > this.state.details.albums.total) {
                        nbPage = this.state.details.albums.total;
                    }
                    else {
                        nbPage = nbPage + 12;
                    }
                    console.log(nbPage)
                }

            }
            await this.setState((state, props) => {
                return { details: json_data, reminder: nbPage }
            },
                () => { });
        }
        catch (error) {
            console.log(error);
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="page-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <h5>Spotify Artist Search</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row my-3"></div>
                    <div className="row">
                        <div className="col-6">
                            <h6 className="artist-title">{this.props.selectedArtist.name}</h6>
                            <h6 className="artist-title albums">Albums</h6>
                        </div>
                        <div className="col-6">
                            <button type="button"
                                className="back-button"
                                onClick={() => this.props.handleIndex(1)} >
                                <i class="fa fa-arrow-left"></i><span>{'\u00A0'}Back to result...</span>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.details && this.state.details.albums &&
                            this.state.details.albums.items.map(item => {
                                return (
                                    <div className="col-3 my-3">
                                        <div className="card">
                                            <img className="img-card-top" style={{ height: '200px' }} src={item.images[0].url} alt={item.name} />
                                            <div className="card-body text-capitalize" style={{ height: '150px' }}>
                                                <h6 className="album-name">
                                                    {item.name}
                                                    <br />
                                                    <span className="albums">{item.artists && item.artists.length > 0 ? item.artists[0].name : ''}</span>
                                                </h6>

                                                <h6 className="artist-title albums">{item.release_date}<br />{item.total_tracks} tracks</h6>
                                            </div>
                                            <div className="card-footer">
                                                <a href={`https://open.spotify.com/album/${item.id}`} target="_blank">Preview on Spotify</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        this.state.details && this.state.details.albums &&
                        <div className="row">

                            <div className="col-4">
                                <button className="previous" onClick={() => this.handleIndex(-1)} disabled={this.state.details.albums.total <= 12}>
                                    <i className="fa fa-arrow-left"></i>
                                    <span>{'\u00A0'}previous</span>
                                </button>
                            </div>

                            <div className="col-4">
                                <h6 className="total" >{this.state.reminder} {'\u00A0'}of {this.state.details.albums.total}</h6>
                            </div>

                            <div className="col-4">
                                <button className="next" onClick={() => this.handleIndex(1)} disabled={this.state.reminder === this.state.details.albums.total}>
                                    <span>next{'\u00A0'}</span>
                                    <i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    }

                </div>
            </React.Fragment>
        )
    }
}