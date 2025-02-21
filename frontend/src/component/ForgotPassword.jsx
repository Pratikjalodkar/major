import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If using React Router

function ForgotPassword() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email/Username, 2: OTP

  const handleSendOtp = () => {
    // Here you would typically make an API call to send the OTP
    console.log('Sending OTP to:', usernameOrEmail);

    // After successful OTP sending (mock for now)
    setStep(2);
  };

  const handleResetPassword = () => {
    // Here you would make an API call to reset the password with OTP
    console.log('Resetting password with OTP:', otp);

    // After successful password reset (mock for now)
    alert('Password reset successful!');
    // Redirect to login page or other appropriate action
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        {step === 1 ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="usernameOrEmail">
                Username or Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="usernameOrEmail"
                type="text"
                placeholder="Enter username or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="otp">
                OTP
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-blue-500 hover:text-blue-700">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;