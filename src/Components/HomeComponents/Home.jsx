import { useState, useEffect } from "react";
import GetPublishers from "../Publishers/GetPublishers";
import Subscription from "../Subscription/Subscription";
import LiveNews from "./LiveNews";
import Slider from "./Slider";

const Home = () => {
    const [showAd, setShowAd] = useState(false);
    const [adTimer, setAdTimer] = useState(10);
    const [showHero, setShowHero] = useState(true);
    const [news] = useState([
        "🚀 Breaking: Tech giants announce AI-powered search engine!",
        "🏏 Sports: Bangladesh wins thrilling match against India!",
        "🌍 World: Global summit on climate change begins today.",
        "💰 Finance: Stock market hits record high this morning!",
        "📱 Gadgets: New smartphone with 200MP camera launched!",
    ]);

    useEffect(() => {
        setTimeout(() => setShowHero(false), 2000);
    }, []);

    useEffect(() => {
        const adCount = parseInt(localStorage.getItem("adCount")) || 0;
        const lastAdTime = parseInt(localStorage.getItem("lastAdTime")) || 0;
        const now = Date.now();

        if (now - lastAdTime > 24 * 60 * 60 * 1000) {
            localStorage.setItem("adCount", "0");
        }

        if (adCount < 2) {
            const timer = setTimeout(() => {
                setShowAd(true);
                localStorage.setItem("adCount", adCount + 1);
                localStorage.setItem("lastAdTime", now.toString());
                
                let countdown = 10;
                const interval = setInterval(() => {
                    countdown--;
                    setAdTimer(countdown);
                    if (countdown <= 0) {
                        setShowAd(false);
                        clearInterval(interval);
                    }
                }, 1000);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubscription = () => {
        alert("✅ Subscription successful! Check your email for confirmation.");
    };

    return (
        <main>
            {showHero && (
                <section className="absolute inset-0 w-full h-full flex items-center justify-center text-center  ">
                    <div className="p-6 rounded-lg">
                        <h1 className="text-4xl font-bold text-yellow-400">Welcome to Unique Time</h1>
                        <p className="mt-2 text-lg text-white">Stay updated with the latest happenings around the world.</p>
                    </div>
                </section>
            )}
            
            <Slider />
            
            <div className="bg-zinc-800 text-white py-3 flex items-center justify-between px-4 overflow-hidden">
                <marquee className="text-lg font-semibold">
                    {news.join("   |   ")}
                </marquee>
            </div>
            
           

            <LiveNews />
            <GetPublishers />
            <Subscription />

            {showAd && (
                <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white text-center p-6 shadow-lg animate-fadeIn">
                    <h2 className="text-2xl font-bold">🔥 Limited Time Offer! 🔥</h2>
                    <p className="text-lg mt-2">Get 50% OFF on our premium subscription. Don't miss out!</p>
                    <p className="mt-2">Closing in {adTimer} seconds...</p>
                    <button className="mt-4 bg-white text-red-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition">
                        Claim Offer Now
                    </button>
                    <button 
                        onClick={() => setShowAd(false)}
                        className="absolute top-2 right-4 text-white text-2xl font-bold cursor-pointer hover:text-gray-300"
                    >
                        ✖
                    </button>
                </div>
            )}

            <section className="bg-gray-50 text-white py-8 px-4 text-center">
                <h2 className="text-xl font-bold text-orange-400 uppercase tracking-widest mb-2">
                    Subscribe Now
                </h2>
                <p className="text-black mb-4">
                    Subscribe now to receive fresh deals & offers by email.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button onClick={handleSubscription} className="bg-purple-500 hover:bg-orange-400 text-white font-bold py-2 w-20 rounded-md transition">
                        Sign up
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Home;
