import React, { Component } from "react";

export default class SearchArtist extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-8 mt-5 text-center">
                            <h1 className="text-slanted text-capitalize">
                                <strong className="text-danger">spotify api search</strong>
                            </h1>
                            <form className="mt-4" onSubmit={this.props.handleSubmit}>
                                <label htmlFor="search" className="text-capitalize">type your artists </label>
                                <div className="input-group-append">
                                    <input type="text" name="search" placeholder="Search for an artist..."
                                     className="form-control" value={this.props.value} 
                                     onChange={this.props.handleChange} />
                                     
                                    <button type="submit" className="input-group-text bg-primary text-white">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}