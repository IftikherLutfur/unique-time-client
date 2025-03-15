
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import UseSubscriptionCart from "../../Hooks/UseSubscriptionCart";

const Subscription = () => {

	// const {cart} = UseSubscriptionCart();
	// console.log(cart, "faltu sob")

	const axiosSecure = useAxiosSecure();
	const { data: premium = [] } = useQuery({
		queryKey: ['premium'],
		queryFn: async () => {
			const res = await axiosSecure.get('/premium')
			return res.data;
		}
	});
	return (
		<div>
			<section className="py-6">
				<div className="container mx-auto p-4 sm:p-10">
					<div className="mb-16 space-y-4 text-center text-black dark:text-white">
						<h1 className="text-4xl font-semibold">Pricing</h1>
						<p className="px-4 sm:px-8 lg:px-24">Sunt suscipit eaque qui iure unde labore numquam iusto alias explicabo, pariatur ipsam, cupiditate aliquid modi?</p>
						<div>
							<button className="px-4 py-1 font-semibold border rounded-l-lg dark:bg-violet-600 dark:border-violet-600">Monthly</button>
							<button className="px-4 py-1 border rounded-r-lg dark:border-violet-600">Annually</button>
						</div>
					</div>
					<div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-3">

						{premium?.map(sb => <div key={sb._id} className="relative bg-purple-600 text-white z-0 flex flex-col items-center p-8 border rounded-md">
							<span className="absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg dark:bg-violet-600 text-gray-50">Personal</span>
							<p className="my-6 text-4xl font-bold text-white">
								{sb.price}/{sb.time}</p>
							<p className="text-center"><small>{sb.title}</small></p>
							<ul className="flex-1 space-y-2">
								<li className="flex items-center space-x-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-violet-600">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
									</svg>
									<span>Lumet consectetur adipisicing</span>
								</li>
								<li className="flex items-center space-x-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-violet-600">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
									</svg>
									<span>Lumet consectetur adipisicing</span>
								</li>
								<li className="flex items-center space-x-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-violet-600">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
									</svg>
									<span>Lumet consectetur adipisicing</span>
								</li>
								<li className="flex items-center space-x-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-violet-600">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
									</svg>
									<span>Lumet consectetur adipisicing</span>
								</li>
							</ul>
							<NavLink to={`/premium/${sb._id}`}>
								<button className="px-4 py-2 mt-4 font-semibold uppercase border rounded-lg md:mt-12 sm:py-3 sm:px-8 border-white">Subscribe</button>
							</NavLink>
						</div>)}

					</div>
				</div>
			</section>
		</div>
	);
};

export default Subscription;