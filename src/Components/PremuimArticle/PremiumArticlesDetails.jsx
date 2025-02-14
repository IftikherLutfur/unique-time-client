import { useLoaderData } from "react-router-dom";

const PremiumArticlesDetails = () => {
  const loader = useLoaderData();
  console.log(loader);

  return (
    <div className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10 border">
        <div className="flex flex-col items-center text-center">
          {/* Image with responsive behavior */}
          <img
            src={loader.image}
            alt={loader.title}
            className="w-full max-w-lg h-80 object-cover rounded-lg shadow-md"
          />
          <h1 className="text-3xl font-bold mt-6 text-gray-800">{loader.title}</h1>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">{loader.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumArticlesDetails;
