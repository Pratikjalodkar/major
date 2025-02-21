import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after signup
import i3 from './images/i3.png';

const SignUpPage = () => {
  const navigate = useNavigate(); // Redirect user after successful signup
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile_no: '',
    address: '',
    role: 'customer', // Default user type
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setIsSubmitting(true);

    // Frontend validation
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@gmail\.com$/i.test(formData.email))
      newErrors.email = 'Email must be valid and end with @gmail.com';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      newErrors.password =
        'Password must be at least 6 characters, with uppercase, lowercase, number, and a special character';
    }

    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = 'Passwords do not match';

    if (!formData.mobile_no) newErrors.mobile_no = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile_no))
      newErrors.mobile_no = 'Mobile number must be 10 digits';

    if (!formData.address) newErrors.address = 'Address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // API call
    try {
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Sign Up Successful! Please check your email for verification.');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
      } else {
        setErrors(data);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${i3})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        </div>

        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {[
            { name: 'username', label: 'Username', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'confirm_password', label: 'Confirm Password', type: 'password' },
            { name: 'mobile_no', label: 'Mobile No.', type: 'tel' },
          ].map(({ name, label, type }) => (
            <div className="mb-4" key={name}>
              <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="userType" className="block text-gray-700 font-bold mb-2">
              Sign Up As:
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
