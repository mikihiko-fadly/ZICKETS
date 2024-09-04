import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Get in Touch</h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          We’re here to help! Feel free to contact us with any inquiries or questions. Your feedback is important to us.
        </p>
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Send Us a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Message</label>
                <textarea
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition ease-in-out duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact Information</h2>
            <ul className="space-y-6">
              <li className="flex items-center text-gray-600">
                <svg className="w-6 h-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.293 3.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L17 5.414 10.293 12H6v-4.293L14.586 4l-1.293-1.293a1 1 0 010-1.414zM5 18h10v2H5v-2z" />
                </svg>
                <span>Pasim, Bandung, Jawa Barat</span>
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-6 h-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h12M9 16h6M6 10v10m6-10v10m6-10v10" />
                </svg>
                <span>+62 821 6295 3765</span>
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-6 h-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4M16 6H4m12 6l-6-6M4 18h12m-6-6l6 6" />
                </svg>
                <span>fadlyariansyahputra@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
