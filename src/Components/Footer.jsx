import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-sm text-slate-600 dark:text-white transition-colors duration-500 dark:from-slate-950 dark:via-slate-700 dark:to-slate-950">
      <div className="max-w-6xl mx-auto">
        © {new Date().getFullYear()} Journal App
      </div>
    </footer>
  );
};

export default Footer;
