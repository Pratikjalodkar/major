import React from "react";
import image1 from "./images/24b1.avif";
import image2 from "./images/e063.avif";
import image3 from "./images/canva.png";
import image4 from "./images/bridal.jpg";
import image5 from "./images/bride2.png";
import image6 from "./images/emergency.jpg";
import image7 from "./images/unique.png";
import image8 from "./images/image8.png";
const First = () => {
  return (
    <>
      <div className="flex h-screen w-full max-w-full gap-[5px] p-2">
        <div className="flex-1 flex items-center justify-center bg-red-300 m-2 ">
          {" "}
          <img
            src={image1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex items-center justify-center border-x-orange-500 m-2 ">
          {" "}
          <img
            src={image3}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex items-center justify-center bg-green-300 m-2 ">
          <img
            src={image2}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <br />
      <hr />
      <br className="bg-black" />
      <div>
        <div class="flex flex-col items-center justify-center  bg-gray-100 p-4">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Our Features</h1>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl">
            <div class="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl">
              <img
                src="https://dhb8p39s5y2g5.cloudfront.net/website-imgs/3hr_delivery_icon.png"
                alt="Pan India Delivery"
                class="w-16 h-16 mb-2 transition-transform transform hover:scale-110"
              />
              <h2 class="text-sm font-medium text-gray-700">
                Pan India Delivery
              </h2>
            </div>

            <div class="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl">
              <img
                src="https://dhb8p39s5y2g5.cloudfront.net/website-imgs/cod_icon.png"
                alt="COD (Partial Advance)"
                class="w-16 h-16 mb-2 transition-transform transform hover:scale-110"
              />
              <h2 class="text-sm font-medium text-gray-700">
                COD (Partial Advance)
              </h2>
            </div>

            <div class="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl">
              <img
                src="https://dhb8p39s5y2g5.cloudfront.net/website-imgs/easy_return_icon.png"
                alt="In Store Trial"
                class="w-16 h-16 mb-2 transition-transform transform hover:scale-110"
              />
              <h2 class="text-sm font-medium text-gray-700">Easy Return</h2>
            </div>

            <div class="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl">
              <img
                src="https://dhb8p39s5y2g5.cloudfront.net/website-imgs/shipping_both_ways_icon.png"
                alt="We Ship Both Ways"
                class="w-16 h-16 mb-2 transition-transform transform hover:scale-110"
              />
              <h2 class="text-sm font-medium text-gray-700">
                We Ship Both Ways
              </h2>
            </div>

            <div class="flex flex-col items-center p-4 bg-white shadow-md rounded-2xl">
              <img
                src="https://dhb8p39s5y2g5.cloudfront.net/website-imgs/QC_icon.png"
                alt="Quality Check & Hygiene"
                class="w-16 h-16 mb-2 transition-transform transform hover:scale-110"
              />
              <h2 class="text-sm font-medium text-gray-700">
                Quality Check & Hygiene
              </h2>
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div>
        <div className="flex flex-col items-center justify-center p-4">
          {/* Main Container */}
          <div className="flex flex-row w-full max-w-6xl bg-white overflow-hidden">
            {/* Left Image */}
            <div className="w-1/3">
              <img
                src={image4}
                alt="Full Image"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-95"
              />
            </div>

            {/* Right Image */}
            <div className="flex flex-col items-center justify-center ml-3">
              <img
                src={image5}
                alt="Right Image"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-95"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center   p-4">
        <div className="flex flex-row w-full max-w-6xl bg-white  overflow-hidden">
          <img
            src={image6}
            alt="Right Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center   p-4">
        <div className="flex flex-row w-full max-w-6xl bg-white  overflow-hidden">
          <div className=" mx-auto my-8 p-6 bg-gradient-to-r from-white to-gray-100 border border-gray-200 rounded-xl shadow-lg">
            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-800 text-justify">
              Welcome to{" "}
              <span className="text-pink-500 font-semibold">Trendy Doors</span>,
              your ultimate destination for elegant, stylish, and affordable
              rental dresses! Whether you're attending a wedding, a glamorous
              party, or a corporate event, we believe every occasion deserves a
              touch of sophistication without breaking the bank. Our curated
              collection features the latest trends, from dazzling gowns to chic
              cocktail dresses, tailored to make you feel confident and radiant.
              At{" "}
              <span className="text-pink-500 font-semibold">Trendy Doors</span>,
              we prioritize quality, comfort, and style, ensuring every piece is
              crafted to perfection. Step into a world of effortless
              elegance—rent your dream dress today and let us help you create
              unforgettable memories. <span className="animate-pulse">✨</span>
            </p>
          </div>{" "}
        </div>
      </div>

      <div><div className="flex flex-col items-center justify-center   p-4">
        <div className="flex flex-row w-full max-w-6xl bg-white  overflow-hidden">
          <img
            src={image8}
            alt="Right Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div></div>

      <div>
        <div>
        <div className="flex flex-col items-center justify-center p-4">
  {/* Main Container */}
  <div className="flex flex-row w-full max-w-6xl bg-white overflow-hidden rounded-lg shadow-md">
    {/* Left Image */}
    <div className="w-1/3">
      <img
        src={image7}
        alt="Full Image"
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-95"
      />
    </div>

    {/* Right Section */}
    <div className="flex flex-col items-center justify-center w-2/3 p-6">
      <div className="bg-gradient-to-r from-gray-100 via-white to-gray-50 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Why Choose Us?
        </h2>
        <p className="text-gray-700 text-center text-lg leading-relaxed">
          At{" "}
          <span className="text-gray-800 font-semibold">
            Trendy Doors
          </span>
          , we not only offer dress rentals but also empower individuals and businesses to grow by providing opportunities to sell and showcase their unique designs. Whether you own a boutique, manage a sewing center, or create custom garments, you can easily enroll with us to reach a wider audience and promote your business effectively. we make every occasion special with our curated collection of
          stylish, high-quality rental dresses. Our designs are trendy yet
          timeless, ensuring you always stand out. Experience affordability,
          elegance, and convenience—all in one place. Let us help you create
          unforgettable memories with the perfect outfit!
        </p>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      
      <div>
        <div className="bg-gradient-to-r from-pink-100 via-white to-pink-50 p-8 rounded-lg shadow-lg max-w-3xl mx-auto my-10">
          <h2 className="text-3xl font-bold text-pink-600 text-center mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-700 text-center text-lg leading-relaxed">
            At <span className="text-pink-500 font-semibold">Trendy Doors</span>
            , we make every occasion special with our curated collection of
            stylish, high-quality rental dresses. Our designs are trendy yet
            timeless, ensuring you always stand out. Experience affordability,
            elegance, and convenience—all in one place. Let us help you create
            unforgettable memories with the perfect outfit!
          </p>
        </div>
      </div>
    </>
  );
};

export default First;
