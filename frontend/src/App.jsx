import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link,NavLink } from 'react-router-dom'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      {/* <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-3xl font-bold text-gray-800">FashionRent</div>
        <nav>
          <ul className="flex space-x-6">
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer"><Link to="/">Home</Link></li>
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer"><Link to="/collections">Collections</Link></li>
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer"><Link to="/about">About</Link></li>
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer"><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section
  className="flex flex-col items-center justify-center text-center bg-cover bg-center py-28"
  style={{
    backgroundImage: "url('https://www.aachho.com/cdn/shop/articles/CELEB-INSPIRED_1944x.png?v=1674218535')",
    backgroundSize: "contain", // Ensure the image fits within the section
    backgroundRepeat: "no-repeat", // Prevent the image from repeating
    backgroundPosition: "center", // Center the image
    height: "80vh", // Adjust the height to ensure visibility
    
  }}
      >
        {/* <h1 className="text-6xl font-extrabold text-black drop-shadow-lg mb-4">
          Step Into Style
        </h1>
        <p className="text-xl  text-black mb-40  max-w-2xl">
          Discover our exclusive range of high-fashion outfits for rent. Experience luxury without the price tag.
        </p> */}
        <button className="px-8 py-4 mt-80 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 shadow-lg">
          Start Renting
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
  {[
    {
      image: "https://sc04.alicdn.com/kf/H75d873aa6cd74e5abfe50a38a9bcef2a5.jpg",
      title: "Premium Quality",
      description: "Handpicked designer outfits to make you shine at any event.",
    },
    {
      image: "https://media.istockphoto.com/id/517269673/photo/hanger-for-clothes.jpg?s=612x612&w=0&k=20&c=BlKUAo05Dzgi3lgI2FJN-f2mHZSglk4wXeyKkzE5ChQ=",
      title: "Affordable Pricing",
      description: "Look fabulous without breaking the bank.",
    },
    {
      import :"https://hej-support.org/wp-content/uploads/2021/07/3.png",
      title: "Sustainable Fashion",
      description: "Contribute to a greener planet with our eco-friendly services.",
    },
  ].map((feature, index) => (
    <div
      key={index}
      className="relative group overflow-hidden border rounded-lg shadow-md"
    >
      {/* Image with blur effect */}
      <div className="overflow-hidden">
        <img
          src={feature.image}
          alt="Feature Image"
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110 "
        />
      </div>
      {/* Text content with zoom effect */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300">
        <h3 className="text-xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {feature.title}
        </h3>
        <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {feature.description}
        </p>
      </div>
    </div>
  ))}
</div>

<div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
                            <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                                Get in touch: 
                            </h1>
                            <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 mt-2">
                                Fill in the form to start a conversation
                            </p>

                            <div className="flex items-center mt-8 text-gray-600">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-gray-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    Acme Inc, Street, State, Postal Code
                                </div>
                            </div>

                            <div className="flex items-center mt-4 text-gray-600">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-gray-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    +44 1234567890
                                </div>
                            </div>

                            <div className="flex items-center mt-2 text-gray-600">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-gray-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    info@acme.org
                                </div>
                            </div>
                        </div>

                        <form className="p-6 flex flex-col justify-center">
                            <div className="flex flex-col">
                                <label for="name" className="hidden">
                                    Full Name
                                </label>
                                <input
                                    type="name"
                                    name="name"
                                    id="name"
                                    placeholder="Full Name"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label for="email" className="hidden">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label for="tel" className="hidden">
                                    Number
                                </label>
                                <input
                                    type="tel"
                                    name="tel"
                                    id="tel"
                                    placeholder="Telephone Number"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

      </section>

      {/* Trending Collection Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Trending Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {["Glamour Gowns", "Party Wear", "Elegant Sarees", "Casual Chic", "Wedding Special", "Designer Picks"].map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={`https://source.unsplash.com/500x500/?${item}`}
                alt={item}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item}</h3>
                <p className="text-gray-600 text-sm mb-4">Curated styles for every occasion.</p>
                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-800-600 to-amber-800-400 text-center text-black shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">Your Style, Your Way</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Join thousands of happy customers who have elevated their fashion game with FashionRent. Sign up today and start your journey!
        </p>
        <button className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-100 shadow-lg">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-800 text-center text-gray-400">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">About Us</h3>
            <p className="text-gray-400">We redefine fashion by making luxury accessible to everyone.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/collections" className="hover:text-white">Collections</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center">
              <Link to="#" className="text-gray-400 hover:text-white">Facebook</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Instagram</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Twitter</Link>
            </div>
          </div>
        </div>
        <p className="mt-8">&copy; 2025 FashionRent. All rights reserved.</p>
      </footer>
    </div>
        
    </>
  )
}

export default App
