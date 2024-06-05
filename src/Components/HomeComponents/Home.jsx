import Subscription from "../Subscription/Subscription";
import AllPublisher from "./AllPublisher";
import LiveNews from "./LiveNews";
import Slider from "./Slider";


const Home = () => {
    return (
        <div>
            <Slider/>
            <AllPublisher/>
            <Subscription/>
            <LiveNews/>
        </div>
    );
};

export default Home;