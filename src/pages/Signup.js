import React,{useState} from 'react'
import { useMutation } from '@apollo/client';
import { SIGNUP_USER, LOGIN_USER } from '../gqloperation/mutation';
import { useNavigate } from 'react-router';

const Signup = () => {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const [signupUser,{loading,error,data}] = useMutation(SIGNUP_USER)

    if(loading) return <h1>sigining up ...</h1>
    if(data){
      localStorage.setItem("jwt",data.register.jwt)
      navigate('/')
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        signupUser({
            variables:{
                input:formData
            }
        })
    }
    const handleChange = (e)=>{
          setFormData({
            ...formData,
            [e.target.name]:e.target.value
          })
    }
    return (
        <div className="container" style={{maxWidth:"500px"}}>
            {
                error && 
                <div className="card-panel red">{error.message}</div>
            }
           <h3>Signup </h3>
           <form onSubmit={handleSubmit}>
               <input 
                 type="text" 
                 placeholder="username"
                 name="username"
                 onChange={handleChange}
                 required
               />
               <input 
                 type="email" 
                 placeholder="email"
                 name="email"
                 onChange={handleChange}
                 required
               />
               <input 
                 type="password" 
                 placeholder="password"
                 name="password"
                 onChange={handleChange}
                 required
               />
               <button type="submit" className="btn blue">Signup</button>
           </form>
        </div>
    )
}

export default Signup

