import React from 'react'
import { Link,NavLink } from 'react-router-dom';
// import mlogo from './images/mlogo.png'
import logo from './images/mlogo.png'
import mlogo from "./images/mlogo.png";
import l3 from "./images/l3.png";
import l2 from "./images/mlogo.png";
export default function Header() {
  return (
      <header className="shadow sticky z-50 top-0">
          <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                  <Link to="/" className="flex items-center">
                      <img
                          src={l3}
                        className="h-auto w-auto max-w-full max-h-20 object-contain"
                          alt="Logo"
                      />
                  </Link>
                  <div className="flex items-center lg:order-2">
                      <Link
                          to="/login"
                          className="text-gray-800 font-bold hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                      >
                          Log in
                      </Link>
                      <Link
                          to="#"
                          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                      >
                          Get started
                      </Link>
                  </div>
                  <div
                      className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                      id="mobile-menu-2"
                  >
                      <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                          <li>
                              <NavLink to="/"
                                  className={() =>
                                      `block font-bold py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Home
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to="/about"
                                  className={({isActive}) =>
                                      `font-bold  block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                 About
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to="/app"
                                  className={({isActive}) =>
                                      ` font-bold block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Contact
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to="/category"
                                  className={({isActive}) =>
                                      `block font-bold py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Explore 
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to="/contact"
                                  className={({isActive}) =>
                                      `font-bold block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                 Start Yours Business
                              </NavLink>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      </header>
  );
}


