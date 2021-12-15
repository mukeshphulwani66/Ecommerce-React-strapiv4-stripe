import React,{useState} from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { strip } from 'jest-docblock';
import { useCart } from 'react-use-cart';
import {BACKEND_URL} from '../helpers'
const stripePromise = loadStripe('pk_test_51H6fgDEta3rHzkPYbtgOgBW4xVO0aynjcrwjMT95rfBIt2x15bodKHgQbR3P0VsTHtYbR9LeW9uIHXwspH6NkmNf00vO9mSJLB');


const CheckoutForm = () => {
    const [formData,setFormData] = useState({})
    const [payProcessing,setPayProcessing] = useState(false)
    const [error,setError] = useState(false)
    const [done,setDone] = useState(false)

    const stripe = useStripe();
    const elements = useElements();
    const {cartTotal,items,emptyCart} = useCart()
    const [paybutton,setPayButton] = useState(true)
    //amount,shippingAddress,city,state,pin,token
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    
    const makePaymentRequest = async (allformData)=>{
        try{
            const res = await fetch(`${BACKEND_URL}/api/orders`,{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify(allformData)
    
            })
            if(res.status != 200) throw Error('Payment failed')
            return await res.json()
        }catch(err){
            console.log(err)
            setError(true)
        }

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (elements == null) {
          return;
        }
       const cardElement = elements.getElement(CardElement)
       const payload = await stripe.createToken(cardElement)
     
       const allFormData = {
           ...formData,
           token:payload.token.id,
           amount:cartTotal,
           items:items
       }
        setPayProcessing(true)
        await makePaymentRequest(allFormData)
        setDone(true)
        setPayProcessing(false)
        emptyCart()

      };
    if(error) return <h1 className="red-text">Payment failed</h1>
    if(done) return <h1 className="green-text">Payment done successfully</h1>
    if(payProcessing) return <h1>Payment is processing...</h1>
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
             name="shippingAddress"
             placeholder="shipping address"
             onChange={handleChange}
             required
            />
            <input 
             type="text"
             name="city"
             placeholder="city"
             onChange={handleChange}
             required
            />
            <input 
             type="text"
             name="state"
             placeholder="state"
             onChange={handleChange}
             required
            />
            <input 
             type="number"
             name="pin"
             placeholder="pin code"
             onChange={handleChange}
             required
            />
            <CardElement onChange={(e)=>{
                if(e.complete){
                  setPayButton(false)
                }else{
                    setPayButton(true)
                }
            }} />
            <br />
            <button className="blue btn" type="submit" disabled={(!stripe || !elements) || paybutton}>
                Pay
            </button>
        </form>
    )
}

const Checkout = ()=>{
    return(
        <Elements stripe={stripePromise}>
         <CheckoutForm />
       </Elements>
    )
}



export default Checkout
