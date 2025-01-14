import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
    return (
        <div className="w-full">
            <Carousel 
                showThumbs={false} // Hides thumbnails for better look
                autoPlay={true} // Enable autoplay
                infiniteLoop={true} // Enable infinite loop
                interval={3000} // Auto slide every 3 seconds
                dynamicHeight={true} // Dynamic height adjustment for each slide
            >
                <div className="w-full">
                    <img 
                        src="https://www.newsletter.co.uk/webimg/TUFZMTIxNzk2MjA1.jpg?width=1200&enable=upscale" 
                        alt="Slide 1" 
                        className="w-full h-[60vh] object-cover rounded-md"
                    />
                </div>
                <div className="w-full">
                    <img 
                        src="https://ichef.bbci.co.uk/news/976/cpsprodpb/72BA/production/_121107392_capture.png" 
                        alt="Slide 2" 
                        className="w-full h-[60vh] object-cover rounded-md"
                    />
                </div>
                <div className="w-full">
                    <img 
                        src="https://static-prod.adweek.com/wp-content/uploads/2020/02/mcclatchy-files-bankruptcy-CONTENT-2020.jpg" 
                        alt="Slide 3" 
                        className="w-full h-[60vh] object-cover rounded-md"
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;
