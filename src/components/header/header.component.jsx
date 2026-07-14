import React from "react";
import { Link } from "react-router-dom";
import HeaderSearch from "../header-search/header-search.component";

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-grad shadow-glow">
            <i className="fas fa-play text-sm text-white" aria-hidden="true"></i>
          </span>
          <span className="hidden text-lg font-bold tracking-tight sm:inline">
            m3<span className="bg-brand-grad bg-clip-text text-transparent">tube</span>
          </span>
        </Link>
        <div className="flex-1">
          <HeaderSearch />
        </div>
        <a
          href="https://github.com/alaminio/m3tube"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost hidden sm:inline-flex"
          aria-label="View on GitHub"
        >
          <i className="fab fa-github text-lg" aria-hidden="true"></i>
          <span className="hidden md:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
