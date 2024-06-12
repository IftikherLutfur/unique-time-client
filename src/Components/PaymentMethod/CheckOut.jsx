import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UserUpdate from "../../Hooks/UserUpdate";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";


const CheckOut = ({ subscriptionData }) => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [clientSecret, setClientSecret] = useState("")
    const { user } = UseAuth();
    // const [userInfo] = useUserData();
    // console.log(userInfo)
    const stripe = useStripe();
    const elements = useElements();
    const total = subscriptionData.price;
    // const [cart] = UseSubscriptionCart();
    const axiosSecure = useAxiosSecure();
    const [userData] = UserUpdate();
    console.log(userData)
    // const useData = userData.map( data =>data?.email === user?.email) 
    // console.log(useData);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: total })
            .then(res => {
                console.log('clientSecret', res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })

    }, [axiosSecure, total])

    const handleUpdate = async (user) => {
        console.log(user);

    }


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

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("transaction id", paymentIntent.id);
                setSuccess(paymentIntent.id)
                const info = {
                    isPremium: "yes"
                }
                const updateRes = await axiosSecure.patch(`/isPremium/update/${user?.email}`, info)
                console.log('update', updateRes.data)
                if(updateRes.data.modifiedCount>0){
                    toast.success("Payment Successful")
                }
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
                <button onClick={() => handleUpdate(user)}
                    className="btn w-full bg-pink-400 mt-5 text-center"
                    type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <Toaster/>
            </div>

            <p className="text-red-600">
                {error}
            </p>
            <p>{success}</p>
        </form>

    );
};

export default CheckOut;