import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../SectionTitle";
import { useLoaderData } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import Pay from "./Pay";


const PaymentMethod = () => {
    // TO DO : add published key;
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    const subscriptionData = useLoaderData();
    console.log(subscriptionData);
    return (
        <div className="py-28">
            <SectionTitle heading='Payment'/>
            
            <div className="px-28">
           <Elements stripe={stripePromise}>
           <CheckOut subscriptionData={subscriptionData}/>
           
           </Elements>

           <Pay></Pay>
            </div>            
        </div>
    );
};
export default PaymentMethod;