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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {cartPremium.map((cart) => (
          <div
            key={cart._id}
            className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              className="w-full h-52 object-cover"
              src={cart.image}
              alt={cart.title}
            />
            <div className="p-5">
              <h5 className="text-xl font-semibold text-gray-800">{cart.title}</h5>
              <NavLink to={`/premiums/${cart._id}`}>
                <button className="w-full mt-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors">
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
