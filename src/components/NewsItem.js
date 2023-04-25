import React, { Component } from 'react'
import { Link } from "react-router-dom";
export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body text-center">
                        <h5 className="card-title">{title}<span class="badge rounded-pill text-bg-success ms-2">{source}</span></h5>
                        <p className="card-text">{description}.....</p>
                        <p className='card-text'><small className='text-primary'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <Link to={newsUrl} target="_blank" className="btn btn-outline-primary">Read More</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItem
