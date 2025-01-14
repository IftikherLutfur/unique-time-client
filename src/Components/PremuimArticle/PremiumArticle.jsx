import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../SectionTitle";
import { NavLink } from "react-router-dom";

const PremiumArticle = () => {
  const axiosSecure = useAxiosSecure();
  const [cartPremium, setCartPremium] = useState([]);

  useEffect(() => {
    axiosSecure.get("/premiumCard").then((res) => {
      setCartPremium(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="py-20 px-6 md:px-12">
      <SectionTitle
        heading={"Premium Articles"}
        subHeading={
          "Here are all premium articles. You can only see the full article after purchasing our subscription."
        }
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        {cartPremium.map((cart) => (
          <div
            key={cart._id}
            className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover"
              src={cart.image}
              alt={cart.title}
            />
            <div className="p-4">
              <h5 className="text-xl font-semibold text-gray-800">{cart.title}</h5>
              <NavLink to={`/premiums/${cart._id}`}>
                <button className="btn w-full mt-4 bg-purple-500 font-semibold py-1 text-white hover:bg-purple-600 transition-colors">
                  Read More
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumArticle;
