const LiveNews = () => {
    return (
        <div className="max-w-screen-xl p-5 mx-auto dark:bg-gray-100 dark:text-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-0 lg:grid-rows-2">
                {[
                    {
                        title: "Bangladesh 2.0 made by Gen-Z",
                        image: "https://www.aljazeera.com/wp-content/uploads/2024/08/AP24218390125876-1722875844.jpg?resize=770%2C513&quality=80",
                        date: "05",
                        month: "Aug",
                    },
                    {
                        title: "End the of the facist era",
                        image: "https://www.shokalshondha.com/wp-content/uploads/elementor/thumbs/newspaers-headlines-qs72r2t5htutkrc4vsystac1b9po549v1brrko8obc.jpg",
                        date: "06",
                        month: "Aug",
                    },
                    {
                        title: "How to save yourself from the allergy?",
                        image: "https://img.freepik.com/free-photo/unrecognizable-doctor-extending-digital-tab-anonymous-patient-fill-questionnaire_1098-19318.jpg?t=st=1739479051~exp=1739482651~hmac=260a8608040eaacab72054982e81b1f7df66a96182aecf6e7d33602599693a3a&w=996",
                        date: "01",
                        month: "Aug",
                    },
                    {
                        title: "Officiis report has been publishesd as soon as possible",
                        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStkCb9JvKJwHLJRcpXigJap3JJQ3-HJtH21w&s",
                        date: "28",
                        month: "Dec",
                    },
                    {
                        title: "Soumya Sarkar is full fit to play ICC Champions Trophy 2025",
                        image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTGS2mZFPlCGhmYvxyDfzdTablnbwyXcWgvzYwyAHkffvKUzNj--VbFHRhgWngpOgVW0LcA7mX2Tnr9tYE",
                        date: "09",
                        month: "Feb",
                    },
                ].map((news, index) => (
                    <div
                        key={index}
                        className={`relative flex items-end justify-start w-full text-left bg-center bg-cover cursor-pointer h-96 group text-white ${
                            index === 0 ? "md:col-span-2 lg:row-span-2 lg:h-full" : ""
                        }`}
                        style={{ backgroundImage: `url(${news.image})` }}
                    >
                        {/* Black Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                        {/* Date and Title */}
                        <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                            <div className="flex flex-col justify-start text-center text-white">
                                <span className="text-3xl font-semibold leading-none tracking-wide">{news.date}</span>
                                <span className="leading-none uppercase">{news.month}</span>
                            </div>
                        </div>

                        <h2 className="z-10 p-5">
                            <a
                                rel="noopener noreferrer"
                                href="#"
                                className="font-medium text-md group-hover:underline lg:text-2xl lg:font-semibold text-white"
                            >
                                {news.title}
                            </a>
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveNews;
