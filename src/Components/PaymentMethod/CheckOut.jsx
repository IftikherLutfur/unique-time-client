import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import UserUpdate from "../../Hooks/UserUpdate";
import { formatISO } from "date-fns";

const CheckOut = ({ subscriptionData }) => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [clientSecret , setClientSecret] = useState("")
    const {user} = UseAuth();
    const stripe = useStripe();
    const elements = useElements();
    const total = subscriptionData.price;
    console.log(total);
    // const [cart] = UseSubscriptionCart();
    const axiosPublic = useAxiosPublic();
    const [userData] = UserUpdate();
    console.log(userData);
    // const useData = userData.map( data =>data?.email === user?.email) 
    // console.log(useData);

    useEffect(() => {
        axiosPublic.post('/create-payment-intent', {price:total})
            .then(res =>{
                setClientSecret(res.data.clientSecret)
            })

    }, [axiosPublic, total])

   

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log("payment error", error);
            setError(error.message)
        }
        else {
            console.log("Payment success", paymentMethod);
            setError('')
            
        }

        const {paymentIntent , error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: card,
                billing_details:{
                email:user?.email || "anonymous",
                name:user?.displayName || "anonymous"
                }
            }
        })
        if(confirmError){
            console.log('confirm error');
        }
        else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === "succeeded"){
                console.log("transaction id" ,paymentIntent.id);
                setSuccess(paymentIntent.id)
                    const info = {
                       isPremium: formatISO(new Date())
                    }
                    const updateRes = await axiosPublic.patch(`/user/update/${user.email}` , info)
                    console.log(updateRes.data);
                    return updateRes.data;
                   
            }
        }


    }
    return (
        <form className="w-96 mx-[330px] mt-10" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="w-96 border-2">
                <select className="w-full">
                    <option value="1 minutes">1 minutes</option>
                    <option value="5 days">5 days</option>
                    <option value="10 days">10 days</option>
                </select>
            </div>
            <div className="text-center">
                <button
                 className="btn w-full bg-pink-400 mt-5 text-center" 
                 type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>

            <p className="text-red-600">
                {error}
            </p>
            <p>{success}</p>
        </form>

    );
};

export default CheckOut;