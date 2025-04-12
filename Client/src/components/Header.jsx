import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { use } from "react";

function Header({ isMenuOpen, setIsMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isMenuPage, setIsMenuPage] = useState(false);

  useEffect(() => {
    // Check if the current path is the menu page
    console.log(location.pathname, " ha cambiado");
    const path = location.pathname;
    if (path === "/menu") {
      setIsMenuPage(true);
      console.log("menu page");
    } else {
      setIsMenuPage(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate 20% of the viewport height
      const scrollThreshold = window.innerHeight * 0.2;

      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-20 border-b px-4 md:px-8 py-4 transition-all duration-700 ${
        scrolled ? "bg-black/40 border-black/10 backdrop-blur-sm" : "bg-[#322a27] border-[#ff3e01]/10"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span
              className={`font-bold text-3xl title transition-colors duration-300 ${scrolled ? "text-white" : "text-[#ff3e01]"}`}
            >
              HIKARI
            </span>
            <span
              className={`ml-2 text-4xl hidden md:block simbol transition-colors duration-700
              ${scrolled ? " text-[#ff3e01]" : "text-white"}`}
            >
              i
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {!isMenuPage ? (
            <>
              <a href={"#about"} className="text-white hover:text-[#ff3e01] transition-colors">
                Nosotros
              </a>
              <a href={"#menu"} className="text-white hover:text-[#ff3e01] transition-colors">
                Menú
              </a>
              <a href={"#gallery"} className="text-white hover:text-[#ff3e01] transition-colors">
                Galería
              </a>
              <a href={"#contact"} className="text-white hover:text-[#ff3e01] transition-colors">
                Contacto
              </a>
            </>
          ) : (
            <>
              <Link to="/" className="text-white hover:text-[#ff3e01] transition-colors">
                Nosotros
              </Link>
              <Link to="/" className="text-white hover:text-[#ff3e01] transition-colors">
                Menú
              </Link>
              <Link to="/" className="text-white hover:text-[#ff3e01] transition-colors">
                Galería
              </Link>
              <Link to="/" className="text-white hover:text-[#ff3e01] transition-colors">
                Contacto
              </Link>
            </>
          )}

          <Link to="/login" className="bg-[#ff3e01] px-4 py-1 rounded-full hover:bg-[#ff3e01]/80 transition-colors">
            Reservar
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex-col mt-2 py-3 px-4 space-y-2">
          {!isMenuPage ? (
            <>
              <a
                href={isMenuPage ? "/#about" : "#about"}
                className="block border-b-white/10 border-b-[1px] bg-black/0 hover:bg-black/40 transition-all  rounded-md p-2 text-white hover:text-[#ff3e01]"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </a>
              <a
                href={isMenuPage ? "/#menu" : "#menu"}
                className="block border-b-white/10 border-b-[1px] bg-black/0 hover:bg-black/40 transition-all  rounded-md p-2 text-white hover:text-[#ff3e01]"
                onClick={() => setIsMenuOpen(false)}
              >
                Menú
              </a>
              <a
                href={isMenuPage ? "/#gallery" : "#gallery"}
                className="block border-b-white/10 border-b-[1px] bg-black/0 hover:bg-black/40 transition-all  rounded-md p-2 text-white hover:text-[#ff3e01]"
                onClick={() => setIsMenuOpen(false)}
              >
                Galería
              </a>
              <a
                href={isMenuPage ? "/#contact" : "#contact"}
                className="block border-b-white/10 border-b-[1px] bg-black/0 hover:bg-black/40 transition-all  rounded-md p-2 text-white hover:text-[#ff3e01]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
              <Link to="/login" className="block bg-[#ff3e01] px-4 py-3 rounded-full text-center hover:bg-[#ff3e01]/80 mt-3">
                Reservar
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="block border-b-white/10 border-b-[1px] bg-black/0 hover:bg-black/40 transition-all  rounded-md p-2 text-white hover:text-[#ff3e01]"
              >
                Nosotros
              </Link>
              <Link
                to="/"
                className="block border-b-white/10 border-b-[1px] bg-black/0 hover:bg-black/40 transition-all  rounded-md p-2 text-white hover:text-[#ff3e01]"
              >
                Menú
              </Link>
              <Link
                to="/"
                className="block border-b-white/10 border-b-[1px] bg-black/0 hover:bg-black/40 transition-all  rounded-md p-2 text-white hover:text-[#ff3e01]"
              >
                Galería
              </Link>
              <Link
                to="/"
                className="block border-b-white/10 border-b-[1px] bg-black/0 hover:bg-black/40 transition-all  rounded-md p-2 text-white hover:text-[#ff3e01]"
              >
                Contacto
              </Link>
              <Link to="/login" className="block bg-[#ff3e01] px-4 py-3 rounded-full text-center hover:bg-[#ff3e01]/80 mt-3">
                Reservar
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
