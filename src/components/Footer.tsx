import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kudizy. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
