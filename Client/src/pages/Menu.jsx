import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ReserveButton from "../components/reserveButton";
import { fetchMenuItems } from "../services/menuService";
import BackToTop from "../components/BackToTop";

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSticky, setIsSticky] = useState(false);
  const [allDishes, setAllDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [buttonBackToTop, setButtonBackToTop] = useState(false);

  // Fetch menu items from Google Sheets
  useEffect(() => {
    const getMenuItems = async () => {
      try {
        setLoading(true);
        const { menuItems, categories } = await fetchMenuItems();

        setCategories([{ id: "all", name: "Todos" }]); 
        categories.forEach((category) => {
          setCategories((prev) => [...prev, { id: category, name: category.charAt(0).toUpperCase() + category.slice(1) }]);
        });

        console.log("Fetched menu items:", menuItems);
        // Transformar los datos si es necesario (por ejemplo, convertir precios a números)
        const formattedItems = menuItems.map((item) => ({
          name: item.nombre,
          price: Number(item.precio),
          category: item.categoria,
          description: item.descripcion,
          image: item.imagen,
        }));

        setAllDishes(formattedItems);
        setError(null);
      } catch (err) {
        console.error("Error loading menu:", err);
        setError("No se pudo cargar el menú. Por favor, inténtelo de nuevo más tarde.");

        // Cargar datos de respaldo en caso de error
        setAllDishes([
          {
            id: 1,
            name: "Nigiri Mixto",
            price: 18.99,
            category: "sushi",
            description: "Selección de 8 nigiris variados con pescados frescos de temporada sobre arroz de sushi.",
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3",
          },
          {
            id: 2,
            name: "Sashimi Premium",
            price: 24.99,
            category: "sushi",
            description: "Cortes finos de atún, salmón, pez mantequilla y lubina servidos con jengibre y wasabi fresco.",
            image: "https://content-cocina.lecturas.com/medio/2018/07/19/sushi-variado-tradicional_91be2c41_800x800.jpg",
          },
          {
            id: 3,
            name: "Maki California",
            price: 14.99,
            category: "sushi",
            description: "Roll relleno de surimi, aguacate y pepino, cubierto con tobiko y sésamo.",
            image: "https://misssushi.es/wp-content/uploads/WhatsApp-Image-2021-10-07-at-15.25.46-768x512.jpeg",
          },
          {
            id: 4,
            name: "Dragon Roll",
            price: 16.99,
            category: "sushi",
            description: "Roll de tempura de langostino y aguacate, cubierto con láminas de aguacate fresco.",
            image: "https://content-cocina.lecturas.com/medio/2018/07/19/sushi-variado-tradicional_91be2c41_800x800.jpg",
          },
          {
            id: 5,
            name: "Tonkotsu Ramen",
            price: 19.99,
            category: "ramen",
            description:
              "Caldo cremoso de hueso de cerdo cocido a fuego lento por 12 horas con chashu, huevo marinado y fideos artesanales.",
            image:
              "https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2025/02/recetas-de-comida-japonesa-super-faciles-para-hacer-en-casa.jpg",
          },
          {
            id: 6,
            name: "Miso Ramen",
            price: 18.99,
            category: "ramen",
            description: "Caldo de miso con dashi, cerdo, algas, cebolleta, maíz y huevo marinado.",
            image:
              "https://www.just-eat.es/CmsAssets/media/Images/Blogs/ES/comida-japonesa-que-va-mas-alla-del-sushi/Gyozas-con-salsa-de-soja.jpg",
          },
          {
            id: 7,
            name: "Wagyu Robatayaki",
            price: 32.99,
            category: "robata",
            description:
              "Ternera wagyu premium a la parrilla tradicional japonesa, servida con salsa trufa-ponzu y vegetales a la brasa.",
            image: "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?ixlib=rb-4.0.3",
          },
          {
            id: 8,
            name: "Ebi Tempura",
            price: 16.99,
            category: "tempura",
            description: "Langostinos en tempura ligera servidos con salsa tentsuyu y daikon rallado.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPnXHt7v15IR3VVABxAGLwkSjYrP59owqlsw&s",
          },
          {
            id: 9,
            name: "Yasai Tempura",
            price: 14.99,
            category: "tempura",
            description: "Selección de verduras de temporada en tempura ligera con salsa de dashi.",
            image:
              "https://s3.ppllstatics.com/diariovasco/www/multimedia/201906/19/media/cortadas/gastronomia-japonesa-kVy-Ro95ukZoQHafokVAU7O2puO-624x385@Diario%20Vasco-koyH-Ro95ukZoQHafokVAU7O2puO-624x385@Diario%20Vasco-kDwG-Ro95ukZoQHafokVAU7O2puO-624x385@Diario%20Vasco.jpg",
          },
          {
            id: 10,
            name: "Sake Premium",
            price: 15.99,
            category: "bebidas",
            description: "Sake premium servido frío en tokkuri tradicional.",
            image: "https://images.unsplash.com/photo-1617196701537-7329482cc9fe?ixlib=rb-4.0.3",
          },
          {
            id: 11,
            name: "Matcha Latte",
            price: 6.99,
            category: "bebidas",
            description: "Té verde matcha ceremonial batido con leche de su elección.",
            image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3",
          },
          {
            id: 12,
            name: "Gyoza de Cerdo",
            price: 12.99,
            category: "robata",
            description: "Empanadillas japonesas rellenas de cerdo y verduras, servidas con salsa de soja y aceite de sésamo.",
            image:
              "https://www.just-eat.es/CmsAssets/media/Images/Blogs/ES/comida-japonesa-que-va-mas-alla-del-sushi/Gyozas-con-salsa-de-soja.jpg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getMenuItems();
  }, []);

  // Filtrar los platos según la categoría activa
  const filteredDishes = activeCategory === "all" ? allDishes : allDishes.filter((dish) => dish.category === activeCategory);

  // Función para volver al inicio de la página
  const backToTopMenu = () => {
    window.scrollTo({ top: 470, behavior: "smooth" });
  };


  useEffect(() => {
    // Scroll suave
    document.documentElement.style.scrollBehavior = "smooth";

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Función para controlar cuándo se vuelve sticky el menú
    const handleScroll = () => {
      const categorySection = document.getElementById("menu-categories");
      if (categorySection) {
        const stickyPosition = categorySection.offsetTop;
        if (window.pageYOffset > stickyPosition) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
      if (window.scrollY > 550) {
        setButtonBackToTop(true);
      }
      else {
        setButtonBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.documentElement.style.scrollBehavior = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#322a27] min-h-screen text-white font-sans">
      {/* Navigation */}
      {!isSticky&&<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      <ReserveButton />
      {buttonBackToTop && <BackToTop />}
      

      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 md:px-8 z-10 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Nuestro <span className="text-[#ff3e01]">Menú</span>
            </h1>
            <p className="text-lg mb-8">
              Descubre todos nuestros platos tradicionales japoneses, elaborados con los ingredientes más frescos y las técnicas
              ancestrales.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Categories - Sticky Section */}
      <div id="menu-categories" className="bg-white text-[#322a27] py-6">
        <div
          className={`w-full transition-all duration-300 ${
            isSticky ? "fixed top-0 left-0 z-20 shadow-md bg-white py-3 px-4 rounded-b-3xl" : ""
          }`}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {setActiveCategory(category.id); backToTopMenu()}}
                  className={`px-6 py-1 rounded-full text-sm font-medium transition-colors
                    ${
                      activeCategory === category.id
                        ? "bg-[#ff3e01] text-white"
                        : "bg-[#322a27]/10 text-[#322a27] hover:bg-[#322a27]/20"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content Section */}
      <section className="py-24 bg-white text-[#322a27]">
        <div className="container mx-auto px-4 md:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="loader border-t-4 border-b-4 border-[#ff3e01] rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 bg-[#ff3e01] text-white px-6 py-2 rounded-full">
                Reintentar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDishes.map((dish, index) => (
                <div key={index} className="bg-[#322a27] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                  <img
                    src={dish.image || "https://dummyimage.com/700x500/36081d/ffffff.png&text=HikariSushi"}
                    alt={dish.name}
                    onError={(e) => (e.target.src = "https://dummyimage.com/600x400/36081d/ffffff.png&text=Unavailable+Pic")}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-white">{dish.name}</h3>
                      <span className="text-[#ff3e01] font-bold">{dish.price} €</span>
                    </div>
                    <p className="text-white/80 mb-4">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-[#ff3e01]/20 text-[#ff3e01] text-xs px-3 py-1 rounded-full capitalize">
                        {dish.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 bg-[#ff3e01]/10">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para probar nuestros platos?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Reserva tu mesa ahora y disfruta de una experiencia culinaria japonesa auténtica en Hikari.
          </p>
          <Link
            to="/login"
            className="bg-[#ff3e01] text-white px-8 py-3 rounded-full inline-block hover:bg-[#ff3e01]/80 transition-colors"
          >
            Reservar Mesa
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#322a27] border-t border-[#ff3e01]/20 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-[#ff3e01] font-bold text-2xl title">HIKARI</span>
              <span className="ml-2 text-white text-4xl simbol">i</span>
            </div>
            <div className="text-center mb-4 md:mb-0">
              <p className="text-white/60">© {new Date().getFullYear()} Hikari Restaurant. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/geysongualdron/" className="text-white hover:text-[#ff3e01]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/geysongualdron/" className="text-white hover:text-[#ff3e01]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/geysongualdron/" className="text-white hover:text-[#ff3e01]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Menu;
