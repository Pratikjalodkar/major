import React, { useState } from "react";

const CategoriesPage = () => {
  // Dummy Data
  const categories = {
    Women: {
      PartyWear: [
        { id: 1, name: "Elegant Gown", image: "https://source.unsplash.com/300x400/?gown,fashion" },
        { id: 2, name: "Floral Dress", image: "https://source.unsplash.com/300x400/?floral,dress" },
        { id: 3, name: "Silk Evening Dress", image: "https://source.unsplash.com/300x400/?silk,elegant" },
        { id: 4, name: "Cocktail Dress", image: "https://source.unsplash.com/300x400/?cocktail,dress" },
      ],
      WeddingWear: [
        { id: 5, name: "Bridal Dress", image: "https://source.unsplash.com/300x400/?bridal,wedding" },
        { id: 6, name: "Traditional Saree", image: "https://source.unsplash.com/300x400/?saree,wedding" },
        { id: 7, name: "Wedding Lehenga", image: "https://source.unsplash.com/300x400/?lehenga,wedding" },
        { id: 8, name: "Chiffon Saree", image: "https://source.unsplash.com/300x400/?chiffon,saree" },
      ],
    },
    Men: {
      CasualWear: [
        { id: 9, name: "Casual Shirt", image: "https://source.unsplash.com/300x400/?shirt,casual" },
        { id: 10, name: "Jeans & T-Shirt", image: "https://source.unsplash.com/300x400/?jeans,t-shirt" },
        { id: 11, name: "Casual Jacket", image: "https://source.unsplash.com/300x400/?jacket,casual" },
        { id: 12, name: "Short Sleeve Shirt", image: "https://source.unsplash.com/300x400/?short-sleeve-shirt" },
      ],
      FormalWear: [
        { id: 13, name: "Business Suit", image: "https://source.unsplash.com/300x400/?business,suit" },
        { id: 14, name: "Classic Blazer", image: "https://source.unsplash.com/300x400/?blazer,formal" },
        { id: 15, name: "Dress Shirt", image: "https://source.unsplash.com/300x400/?dress-shirt" },
        { id: 16, name: "Formal Trousers", image: "https://source.unsplash.com/300x400/?trousers,formal" },
      ],
    },
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust this to show more/less items per page

  const getCurrentItems = (category) => {
    const allItems = categories[category];
    return Object.keys(allItems).flatMap((subCategory) =>
      allItems[subCategory]
    );
  };

  const paginate = (category) => {
    const items = getCurrentItems(category);
    const totalItems = items.length;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = (category) => {
    const items = getCurrentItems(category);
    return Math.ceil(items.length / itemsPerPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header and Description */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif italic text-purple-700 mb-4">Trendy Doors</h1>
        <p className="text-xl text-gray-700 mb-8">
          Discover the latest trends in fashion at Trendy Doors. From elegant gowns to classic suits, find the perfect wear for every occasion.
        </p>
      </div>

      {/* Categories for Women */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">👗 Women's Dresses</h2>

        {/* Subcategories for Women */}
        {Object.keys(categories.Women).map((category, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              {category.replace(/([A-Z])/g, " $1")}
            </h3>

            {/* Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginate("Women").map((dress) => (
                <div
                  key={dress.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
                >
                  <img src={dress.image} alt={dress.name} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">{dress.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-6">
              <button
                className="bg-sky-500 text-white px-4 py-2 rounded-l-md"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              >
                Previous
              </button>
              <button
                className="bg-sky-500 text-white px-4 py-2 rounded-r-md"
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages("Women")))
                }
              >
                Next
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Categories for Men */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">👔 Men's Dresses</h2>

        {/* Subcategories for Men */}
        {Object.keys(categories.Men).map((category, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              {category.replace(/([A-Z])/g, " $1")}
            </h3>

            {/* Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginate("Men").map((dress) => (
                <div
                  key={dress.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
                >
                  <img src={dress.image} alt={dress.name} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">{dress.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-6">
              <button
                className="bg-sky-500 text-white px-4 py-2 rounded-l-md"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              >
                Previous
              </button>
              <button
                className="bg-sky-500 text-white px-4 py-2 rounded-r-md"
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages("Men")))
                }
              >
                Next
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoriesPage;
