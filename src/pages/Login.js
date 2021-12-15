import React,{useState} from 'react'
import { useMutation } from '@apollo/client';
import { SIGNUP_USER, LOGIN_USER } from '../gqloperation/mutation';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const [loginUser,{loading,error,data}] = useMutation(LOGIN_USER)

    if(loading) return <h1>logging in...</h1>
    if(data){
        localStorage.setItem("jwt",data.login.jwt)
        navigate("/")
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        loginUser({
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
           <h3>Login </h3>
           <form onSubmit={handleSubmit}>
               <input 
                 type="text" 
                 placeholder="email or username"
                 name="identifier"
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
               <button type="submit" className="btn blue">Login</button>
           </form>
        </div>
    )
}

export default Login
