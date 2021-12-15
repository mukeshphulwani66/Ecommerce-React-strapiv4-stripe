import React from 'react'
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_CATEGORY } from '../gqloperation/queries';
import Card  from '../components/Card'
const ProductByCategory = () => {
    const {cid} = useParams()
    const {loading,data,error} =  useQuery(GET_PRODUCT_BY_CATEGORY,{
        variables:{
            categoryId:cid
        }
    })
    if(loading) return <h1>loading...</h1>
    return (
        <div>
            <div className="homeroot">
                {
                    data.category.data.attributes.products.data.map(({id,attributes})=>{
                      return <Card
                        key={id}
                        id={id}
                        name={attributes.name}
                        price={attributes.price}
                        description={attributes.description}
                        img={attributes.images.data[0].attributes.url}
                      />
                    })
                }
            </div>
        </div>
    )
}

export default ProductByCategory
