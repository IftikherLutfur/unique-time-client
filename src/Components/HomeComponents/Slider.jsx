import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Slider = () => {
    return (
        <div>
           <Carousel>
                <div>
                    <img src="https://www.newsletter.co.uk/webimg/TUFZMTIxNzk2MjA1.jpg?width=1200&enable=upscale" />
                    
                </div>
                <div>
                    <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/72BA/production/_121107392_capture.png" />
                    
                </div>
                <div>
                    <img src="https://static-prod.adweek.com/wp-content/uploads/2020/02/mcclatchy-files-bankruptcy-CONTENT-2020.jpg" />
                    
                </div>
            </Carousel> 
        </div>
    );
};

export default Slider;