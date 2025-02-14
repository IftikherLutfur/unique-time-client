import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UserUpdate from "../../Hooks/UserUpdate";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const CheckOut = ({ subscriptionData }) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const { user } = UseAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [userData] = UserUpdate();

    useEffect(() => {
        if (subscriptionData?.price) {
            axiosSecure.post('/create-payment-intent', { price: subscriptionData.price })
                .then(res => setClientSecret(res.data.clientSecret))
                .catch(err => console.error("Error fetching client secret:", err));
        }
    }, [axiosSecure, subscriptionData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;
        const card = elements.getElement(CardElement);
        if (!card) return;

        setError('');
        setSuccess('');

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });
            if (error) {
                setError(error.message);
                return;
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });
            if (confirmError) {
                setError(confirmError.message);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                setSuccess(paymentIntent.id);
                const updateRes = await axiosSecure.patch(`/isPremium/update/${user?.email}`, { isPremium: "yes" });
                if (updateRes.data.modifiedCount > 0) {
                    toast.success("Payment Successful");
                }
            }
        } catch (err) {
            setError("Payment failed. Please try again.");
            console.error("Payment error:", err);
        }
    };

    return (
        <form className="w-96 mx-auto mt-10" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <div className="w-full border-2 mt-4">
                <select className="w-full p-2 border rounded-md">
                    <option value="1 minutes">1 minute</option>
                    <option value="5 days">5 days</option>
                    <option value="10 days">10 days</option>
                </select>
            </div>
            <button className="btn w-full bg-pink-400 mt-5" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <Toaster />
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">Payment Successful! Transaction ID: {success}</p>}
        </form>
    );
};

export default CheckOut;
