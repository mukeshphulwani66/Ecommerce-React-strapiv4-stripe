import React from 'react'
import { useQuery } from '@apollo/client';
import {GET_ALL_CATEGORIES} from '../gqloperation/queries'
import { Link } from 'react-router-dom';
const Category = () => {
    const {data,loading,error} =  useQuery(GET_ALL_CATEGORIES)
    if(loading) return <h1>categories are loading..</h1>
    return (
        <div className="category">
            {
                data.categories.data.map(({id,attributes})=>{
                    return <Link key={id} to={`/caregory/${id}`}><h4 className="chip btn white">{attributes.name}</h4></Link> 
                })
            }
        </div>
    )
}

export default Category
