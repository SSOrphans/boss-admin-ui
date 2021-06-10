import React from "react";

export const CardComponent = ({title, description, redirectTo, img}) => {
  
  return (
    <div className="card mb-5" style={{width: "18rem"}}>
      <img className="card-img-top" src={img || "https://via.placeholder.com/286x180"} alt={title}/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={redirectTo} className="btn btn-primary">Go</a>
        </div>
    </div>
  )
}
