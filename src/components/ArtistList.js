import React, { Component } from "react";
import ArtistSearch from "./ArtistSearch";
import Artist from "./Artist";
import './ArtistList.css';

export default class ArtistList extends Component {
    render() {
        let title;

        if (this.props.error) {
            title = <div><p>{this.props.error}</p></div>
        }
        else if (this.props.artists && this.props.artists.artists) {
            title =
                <div className="row">
                    <div className="col-10 mx-auto col-md-6 text-center test-uppercase mb-3">
                        <h1 className="text-slanted">Artists List</h1>
                    </div>
                </div>
        }
        else {
            title = <div></div>
        }

        return (
            <React.Fragment>
                <ArtistSearch value={this.props.value} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit} />
                <div className="container my-5">
                    {/* title */}
                    {title}
                    {/* end of title */}

                    <div className="row">
                        {
                            this.props.artists && this.props.artists.artists && this.props.artists.artists.items.map(artist => {
                                return (
                                    <Artist key={artist.id} artist={artist}
                                        handleDetails={() => this.props.handleDetails(0, this.props.access_token, artist)}
                                        access_token={this.props.access_token}
                                    />
                                )
                            })
                        }
                    </div>


                    {
                        this.props.artists && this.props.artists.artists &&
                        <div className="row">

                            <div className="col-4">
                                <button className="previous" onClick={this.props.previous} disabled={this.props.artistNumberShowingPage <= 12}>
                                    <i className="fa fa-arrow-left"></i>
                                    <span>{'\u00A0'}previous</span>
                                </button>
                            </div>

                            <div className="col-4">
                                <h6 className="total" >{this.props.artistNumberShowingPage} {'\u00A0'}of {'\u00A0'}{this.props.artists.artists.total}</h6>
                            </div>

                            <div className="col-4">
                                <button className="next" onClick={this.props.next} disabled={this.props.artistNumberShowingPage === this.props.artists.artists.total}>
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