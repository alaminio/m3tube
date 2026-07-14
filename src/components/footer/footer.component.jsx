import React from "react";

function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8 text-center text-xs text-white/40">
      <p>
        <span className="bg-brand-grad bg-clip-text font-semibold text-transparent">
          m3tube
        </span>{" "}
        by{" "}
        <a
          href="https://alamin.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white"
        >
          md al amin
        </a>{" "}
        · Powered by{" "}
        <a
          href="https://developers.google.com/youtube/v3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white"
        >
          YouTube Data API v3
        </a>
      </p>
    </footer>
  );
}

export default Footer;
