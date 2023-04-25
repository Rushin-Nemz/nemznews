import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'


export class news extends Component {
    static defaultProps = {
        country: 'general',
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} - NemzWorldwide`;
    }
    async componentDidMount() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f33052022574f9383eb281703393dc1&page=${this.state.page}&pageSize=15`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            loading: false
        });
        this.props.setProgress(100);
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f33052022574f9383eb281703393dc1&page=${this.state.page - 1}&pageSize=15`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }
    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f33052022574f9383eb281703393dc1&page=${this.state.page + 1}&pageSize=15`;
        // https://newsapi.org/v2/top-headlines?country=us&apiKey=3f33052022574f9383eb281703393dc1
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parseData.articles,
            loading: false
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">Nemz Worldwide Top Headlines - {this.props.category}</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark mx-3" onClick={this.handlePrevClick}> &larr; Prev</button>
                    <button type="button" className="btn btn-outline-dark mx-3" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default news
