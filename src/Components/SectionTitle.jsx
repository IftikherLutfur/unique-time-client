
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div>
          <h1 className="text-2xl uppercase text-black dark:text-white text-center font-bold"><em>{heading}</em></h1>  
          <p className="text-center text-black dark:text-white mx-12">{subHeading}</p>          
        </div>
    );
};

export default SectionTitle;