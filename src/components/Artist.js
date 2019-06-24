import React, { Component } from "react";
import './Artist.css';
import StarRatings from 'react-star-ratings';

export default class Artist extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="col-xs-12 col-sm-6 col-md-3 my-3">
                    <div className="card" onClick={() => this.props.handleDetails(0, this.props.access_token, this.props.artist)}>
                        <img className="img-card-top" style={{ height: '15rem' }} src={this.props.artist.images && this.props.artist.images.length > 0 ? this.props.artist.images[0].url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'} alt={this.props.artist.name} />
                        <div className="card-body text-capitalize" style={{ height: '100px' }}>
                            <h6 className="artist-title">{this.props.artist.name}</h6>
                            <h6 className="artist-followers">{this.props.artist.followers.total.toLocaleString('en', { useGrouping: true })} followers</h6>
                        </div>
                        <div className="card-footer">
                            <div className="rating-container">
                                <StarRatings
                                    rating={this.props.artist.popularity * 5 / 100}
                                    starRatedColor='rgb(109, 122, 130)'
                                    starEmptyColor='rgb(203, 211, 227)'
                                    starHoverColor='rgb(230, 67, 47)'
                                    starDimension='15px'
                                    starSpacing='1px'
                                    numberOfStars={5}
                                    name={this.props.artist.name}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}