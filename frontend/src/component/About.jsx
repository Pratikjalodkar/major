import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[400px]  bg-orange-100 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold tracking-wide">
          About <span className="text-yellow-200">Trendy Doors</span>
        </h1>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Who We Are
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          At <span className="text-pink-500 font-semibold">Trendy Doors</span>,
          we believe that style should be accessible to everyone. Whether you're
          looking for an elegant evening gown, a chic cocktail dress, or a
          stunning wedding outfit, we provide the latest fashion trends on
          **rent** at an affordable price.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Trendy Doors?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-pink-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-pink-600">Affordable Fashion</h3>
              <p className="text-gray-600 mt-2">
                Get the latest designer dresses at a fraction of the cost.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-pink-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-pink-600">Quality & Hygiene</h3>
              <p className="text-gray-600 mt-2">
                Every dress is carefully dry-cleaned and maintained for a
                flawless look.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-pink-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-pink-600">Easy Rental Process</h3>
              <p className="text-gray-600 mt-2">
                Browse, rent, wear, and return—it's that simple!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Business Expansion Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Expand Your Business With Us
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Not only do we help individuals look stunning, but **Trendy Doors**
            also supports **boutique owners and designers** to grow their
            businesses by listing their designs on our platform. If you own a
            boutique or sewing center, join us to **reach more customers** and
            showcase your collections.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "I rented a gown for my friend's wedding, and I felt like a
              princess! The quality was amazing!"
            </p>
            <h4 className="mt-4 text-pink-600 font-semibold">- Sarah K.</h4>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "Trendy Doors made it so easy for me to rent a designer dress for
              my event. Highly recommended!"
            </p>
            <h4 className="mt-4 text-pink-600 font-semibold">- Emily R.</h4>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "As a boutique owner, listing my designs on Trendy Doors helped
              me reach new customers!"
            </p>
            <h4 className="mt-4 text-pink-600 font-semibold">- Olivia M.</h4>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-pink-600 py-12 text-center ">
        <h2 className="text-3xl font-bold text-white">Start Your Trendy Journey Today!</h2>
        <p className="text-white text-lg mt-2 max-w-3xl mx-auto">
          Whether you're looking to rent a designer outfit or grow your fashion
          business, **Trendy Doors** is here for you.
        </p>
        <br /><br />
        <Link
    to="/cardpage"
    className="mt-6 px-6 py-3 bg-yellow-300 text-pink-800 font-semibold rounded-lg hover:bg-yellow-400 transition-all"
  >
    Join Now
  </Link>


      </div>
    </div>
  );
};

export default About;
