import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../SectionTitle";
import { NavLink } from "react-router-dom";


const PremiumArticle = () => {

    const axiosSecure = useAxiosSecure();

    // const { data: cartPremium = [] } = useQuery({
    //     queryKey: ['cartPremium'],
    //     queryFn: async () => {
    //       const res = axiosPublic.get('/premiumCard')
    //       console.log(res.data);
    //       return res.data
    //     }
    // })
    const [cartPremium, setCartPremium] = useState([]);

    useEffect(()=>{
        axiosSecure.get('/premiumCard')
        .then(res=>{
            setCartPremium(res.data);
        })
    },[axiosSecure])
    return (
        <div className="py-32">
              <SectionTitle heading={'Premium Articles'} subHeading={"Here is all premium articles you can only see the all article after buy our Subscription"}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-7 space-y-5 items-center mt-10">
                {cartPremium.map(cart=><div key={cart._id}
                 className="max-w-sm">
                    <img className="h-[300px] w-[600px]" src={cart.image} alt="" />
                <h5 className="text-2xl font-bold tracking-tight text-black">
                  {cart.title}
                </h5>
                <p>{cart._id}</p>
                <NavLink to={`/premiums/${cart._id}`}>
                <button className="btn w-full bg-orange-400">Read More</button>
                </NavLink>
              </div>)}
            </div>
        </div>
    );
};

export default PremiumArticle;