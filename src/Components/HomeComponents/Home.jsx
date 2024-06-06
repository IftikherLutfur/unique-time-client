import GetPublishers from "../Publishers/GetPublishers";
import Subscription from "../Subscription/Subscription";
import LiveNews from "./LiveNews";
import Slider from "./Slider";


const Home = () => {
    return (
        <div>
            <Slider/>
            <GetPublishers/>
            <Subscription/>
            <LiveNews/>
        </div>
    );
};

export default Home;