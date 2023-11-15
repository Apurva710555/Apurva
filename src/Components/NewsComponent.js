import React, { Component } from "react";

export default class NewsComponent extends Component {
    
    
    
  render() {
    let { title, description, imgUrl,newUrl , author, date } = this.props;
    return (
      <div>
        <div className="card m-2" style={{width: "18rem"}}>
          <img src={!imgUrl?"https://www.livemint.com/lm-img/img/2023/10/24/1600x900/CANADA-INDIA--20_1696148203552_1698134807392.JPG":imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-body-secondary">by {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a  rel="noopener" href={newUrl} target="_blank"className="btn btn-primary fst-italic">
               Read More
            </a>
          </div>
        </div>
      </div>
    );  
  }
}
