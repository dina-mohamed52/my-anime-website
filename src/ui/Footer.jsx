import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-800  w-full overflow-x-hidden text-white p-10 text-right">
      <div className="container mx-auto">
        <p className="text-sm">&copy; 2024 My Anime. All Rights Reserved.</p>
        {/* <div className="flex justify-center mt-2">
          <a href="#" className="text-white hover:text-gray-400 mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-white hover:text-gray-400 mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-white hover:text-gray-400 mx-2">
            Contact Us
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
