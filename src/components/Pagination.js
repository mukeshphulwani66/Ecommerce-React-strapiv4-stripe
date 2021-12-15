import React from 'react'

const Pagination = ({pageCount,updatePage}) => {
    return (
        <div className="container pages">
                {
                 [...Array(pageCount).keys()].map(value=>{
                     return <button 
                      onClick={()=>updatePage(value+1)}
                      key={value} 
                      className="btn chip"
                      >{value+1}</button>
                 })
                }
     
        </div>
    )
}

export default Pagination
