import React,{useState,useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {GET_ALL_PRODUCTS} from '../gqloperation/queries'
import Card from '../components/Card';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const Home = () => {
    const [page,setPage] = useState(1)
    const {loading,error,data,refetch} = useQuery(GET_ALL_PRODUCTS,{
        variables:{
            "pagination": {
              "page": page,
              "pageSize": 6
            }
         }
    })

    useEffect(() => {
       if(page !=1) refetch() 
    }, [page])

    const updatePage = (page)=>{
        setPage(page)
    }

    if(loading) return <h1>Loading Plz wait</h1>
    
    if(data){
        console.log(data)
    }
    return (
        <div>
            <Search />
            <div className="homeroot">
                {
                    data.products.data.map(({id,attributes})=>{
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
            <Pagination
             pageCount={data.products.meta.pagination.pageCount}
             updatePage={updatePage}
             />
        </div>
    )
}

export default Home
