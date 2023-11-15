import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsComponent from "./NewsComponent";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.any,
    category: PropTypes.string,
  };

  constructor() {
    super();
    // console.log("hii how are you");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async func() {
    this.props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a2e2f7e9b6334b2b85f8ff29a9f7d246&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)

    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    // let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a2e2f7e9b6334b2b85f8ff29a9f7d246&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.func();
  }

  // togglePrev = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apikey=a2e2f7e9b6334b2b85f8ff29a9f7d246&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   page: this.state.page - 1,
  //   //   loading: false,
  //   // });
  //   this.setState({page: this.state.page - 1})
  //   this.func();
  // };

  // toggleNext = async () => {
  //   // const nextPage = this.state.page + 1;
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a2e2f7e9b6334b2b85f8ff29a9f7d246&page=${nextPage}&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   page: nextPage,
  //   //   loading: false,
  //   // });
  //   this.setState({page: this.state.page - +1})
  //   this.func();
  // };

  fetchMoreData = async () => {
   
    this.setState({
      page: this.state.page + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a2e2f7e9b6334b2b85f8ff29a9f7d246&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    

    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
   
  };

  render() {
    return (
      <>s
        <div className="container my-3">
          <h1 className="text-center fw-bolder">News headline about {this.props.category}</h1>
          {this.state.loading && <Spinner />}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={
              <h4>
                <Spinner />{" "}
              </h4>
            }
          >
            <div className="row mt-5">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsComponent
                    key={element.url} 
                      title={element.title ? element.title.slice(0, 50) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imgUrl={element.urlToImage}
                      newUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>

          {/* <div className="d-flex justify-content-between  my-5">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark btn-sm"
            onClick={this.togglePrev}
          >
            Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark btn-sm"
            onClick={this.toggleNext}
          >
            Next
          </button>
        </div> */}
        </div>
      </>
    );
  }
}

export default News;
