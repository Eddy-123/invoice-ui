"use client";

import Link from "next/link";
import React, { useState } from "react";
import { URLS } from "../../utils/urls";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { title: "Téléverser", link: URLS.HOME },
    { title: "Factures", link: URLS.INVOICES },
  ];

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href={URLS.HOME}>
          <span className="text-lg font-bold">Kudizy Invoice Generator</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navigation.map((navItem) => (
            <Link key={`${navItem.title}:${navItem.link}`} href={navItem.link}>
              <span className="hover:text-gray-300">{navItem.title}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden block focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-blue-700 p-4">
          {navigation.map((navItem) => (
            <Link key={`${navItem.title}:${navItem.link}`} href={navItem.link}>
              <span className="block py-2 px-4 hover:bg-blue-800 rounded">
                {navItem.title}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
