import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ReserveButton from "../components/reserveButton";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      id: 1,
      name: "Sushi Nigiri",
      price: 5.99,
      description: "Arroz con pescado fresco encima.",
      image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/64EF898D-2EDD-4B47-A456-E6A7D137AC91/Derivates/00f76cac-64f6-4573-be4f-e604a7d99143.jpg",
    },
    {
      id: 2,
      name: "Sashimi de Salmón",
      price: 7.49,
      description:
        "Finas láminas de salmón crudo.",
      image: "https://www.mardenoruega.es/globalassets/recipes/salmon/sashimi-salmon-new.jpg?width=685&height=685&transform=DownFill&hash=fba299725e710be3904d981c54ac8876",
    },
    {
      id: 3,
      name: "Ramen Tonkotsu",
      price: 8.99,
      description:
        "Sopa de fideos con caldo de cerdo y chashu (carne de cerdo).",
      image: "https://www.craftycookbook.com/wp-content/uploads/2023/04/tonkotsu.jpg",
    },
  ];

  const ImgAbout = [
    "https://editorialtelevisa.brightspotcdn.com/dims4/default/b39d0f4/2147483647/strip/true/crop/995x560+3+0/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fwp-content%2Fuploads%2F2019%2F09%2Fcomida-japonesa-cruda.jpg",
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3",
  ];

  const GalleryImages = [
    "https://misssushi.es/wp-content/uploads/WhatsApp-Image-2021-10-07-at-15.25.46-768x512.jpeg",
    "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3",
    "https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2025/02/recetas-de-comida-japonesa-super-faciles-para-hacer-en-casa.jpg",
    "https://s3.ppllstatics.com/diariovasco/www/multimedia/201906/19/media/cortadas/gastronomia-japonesa-kVy-Ro95ukZoQHafokVAU7O2puO-624x385@Diario%20Vasco-koyH-Ro95ukZoQHafokVAU7O2puO-624x385@Diario%20Vasco-kDwG-Ro95ukZoQHafokVAU7O2puO-624x385@Diario%20Vasco.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPnXHt7v15IR3VVABxAGLwkSjYrP59owqlsw&s",
    "https://www.just-eat.es/CmsAssets/media/Images/Blogs/ES/comida-japonesa-que-va-mas-alla-del-sushi/Gyozas-con-salsa-de-soja.jpg?bid=922b2184339c40c0bff266e6f7502b25",
  ];

  const testimonials = [
    {
      text: "La mejor experiencia japonesa que he tenido fuera de Tokio. El nigiri de otoro simplemente se deshace en la boca, y el servicio es impecable.",
      name: "Laura Méndez",
      role: "Chef profesional",
      initials: "LM",
    },
    {
      text: "El ramen tonkotsu de Hikari es simplemente adictivo. El caldo tiene una profundidad de sabor increíble y el ambiente del restaurante es muy auténtico.",
      name: "Alejandro Ruiz",
      role: "Crítico gastronómico",
      initials: "AR",
    },
    {
      text: "Celebré mi aniversario en Hikari y fue perfecto. La atención al detalle, tanto en la comida como en el servicio, creó una velada inolvidable.",
      name: "Carmen Soto",
      role: "Cliente habitual",
      initials: "CS",
    },
  ];

  useEffect(() => {
    // Agregar comportamiento de scroll suave al elemento html
    document.documentElement.style.scrollBehavior = "smooth";

    // Limpiar el efecto al desmontar
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
  return (
    <div className="bg-[#322a27] min-h-screen text-white font-sans">
      {/* Navigation */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <ReserveButton />

      {/* Hero Section */}
      <section
        className="relative h-[100vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607301406259-dfb186e15de8?ixlib=rb-4.0.3')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 md:px-8 z-10 relative">
          <div className="max-w-2xl px-10 sm:px-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-white">Auténtica </span>
              <span className="text-[#ff3e01]">Experiencia</span>
              <span className="text-white"> Japonesa</span>
            </h1>
            <p className="text-lg mb-8">
              Descubre la perfecta armonía de sabores tradicionales y creatividad moderna en cada plato de nuestra cocina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="bg-[#ff3e01] text-white px-8 py-3 rounded-full text-center hover:bg-[#ff3e01]/80 transition-colors"
              >
                Reservar Mesa
              </Link>
              <a
                href="#menu"
                className="border border-white text-white px-8 py-3 rounded-full text-center hover:bg-white/10 transition-colors"
              >
                Ver Menú
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-10 sm:px-auto bg-[#322a27]">
        <div className="container mx-auto px-4 md:px-8 ">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl mb-2 font-bold">
                Sobre <span className="text-[#ff3e01]">Hikari</span>
              </h2>
              <div className="w-20 h-1 bg-[#ff3e01] mb-6"></div>
              <p className="mb-6">
                En Hikari, que significa "luz" en japonés, nos dedicamos a iluminar su experiencia gastronómica con la auténtica
                cocina japonesa. Nuestros chefs, entrenados en Tokio, combinan técnicas tradicionales con toques contemporáneos.
              </p>
              <p>
                Cada plato es una obra de arte meticulosamente elaborada, utilizando solo los ingredientes más frescos y de la más
                alta calidad. Nuestro ambiente tranquilo y elegante completa la experiencia, transportándolo al corazón de Japón.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {ImgAbout.map((img, index) => (
                <img key={index} src={img} alt="Sake" className="rounded-lg h-64 w-full object-cover" />
              ))}
            </div>
            {}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section id="menu" className="py-20 bg-white text-[#322a27]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-2">
              Nuestro <span className="text-[#ff3e01]">Menú</span>
            </h2>
            <div className="w-20 h-1 bg-[#ff3e01] mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-[#322a27]/80">
              Explora nuestra selección de platos tradicionales y creaciones exclusivas, elaborados con los ingredientes más
              frescos y técnicas auténticas japonesas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-[#322a27] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={item.image} alt={item.name} className="h-60 w-full object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <span className="text-[#ff3e01] font-bold">{item.price} €</span>
                  </div>
                  <p className="text-white/80 mb-4">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="bg-[#ff3e01] text-white px-8 py-3 rounded-full inline-block hover:bg-[#ff3e01]/80 transition-colors"
            >
              Ver Menú Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-[#322a27]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-2">
              Nuestra <span className="text-[#ff3e01]">Galería</span>
            </h2>
            <div className="w-20 h-1 bg-[#ff3e01] mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-white/80">
              Explora el ambiente y sabores de Hikari a través de nuestra galería. Cada imagen cuenta una historia sobre nuestra
              pasión por la cocina japonesa.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GalleryImages.map((img, index) => (
              <img key={index} src={img} alt="Interior" className="rounded-lg hover:opacity-80 transition-opacity h-52 object-cover w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white text-[#322a27]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-2">
              Lo Que Dicen Nuestros <span className="text-[#ff3e01]">Clientes</span>
            </h2>
            <div className="w-20 h-1 bg-[#ff3e01] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#322a27] p-6 rounded-xl shadow-lg text-white">
                <div className="flex items-center mb-4">
                  <div className="flex text-[#ff3e01]">
                    {"★★★★★".split("").map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                  </div>
                </div>
                <p className="mb-6 italic text-white/80">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-[#ff3e01] flex items-center justify-center text-white font-bold">
                      {testimonial.initials}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-20 bg-[#322a27]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-2">
              <span className="text-[#ff3e01]">Contacto</span> y Ubicación
            </h2>
            <div className="w-20 h-1 bg-[#ff3e01] mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-white/80">
              Estamos ubicados en el centro de la ciudad. Reserva tu mesa o contáctanos para más información.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center md:flex-row gap-12">

            <div className="md:w-1/2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-[#322a27]">
                <h3 className="text-xl font-bold mb-4">Horario</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Lunes - Jueves:</span>
                    <span>12:00 - 22:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Viernes</span>
                    <span>12:00 - 00:00</span>
                  </li>
                  
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-[#322a27]">
                <h3 className="text-xl font-bold mb-4">Contacto</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#ff3e01]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>123 Calle Principal, Ciudad</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#ff3e01]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>+34 123 456 789</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#ff3e01]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>info@hikari-restaurant.com</span>
                  </li>
                </ul>
                <div className="flex mt-4 space-x-4">
                  <a href="https://www.linkedin.com/in/geysongualdron/" className="text-[#322a27] hover:text-[#ff3e01]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/geysongualdron/" className="text-[#322a27] hover:text-[#ff3e01]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/geysongualdron/" className="text-[#322a27] hover:text-[#ff3e01]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl shadow-lg overflow-hidden h-80">
                {/* Aquí iría un mapa real usando Google Maps o similar */}
                <div className="bg-gray-200 h-full w-full rounded-lg flex items-center justify-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50860.986818133046!2d-3.591271749999977!3d37.18094625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fce62d32c27d%3A0x9258f79dd3600d72!2sGranada!5e0!3m2!1sen!2ses!4v1744198831560!5m2!1sen!2ses" width="100%" height="100%" className="rounded-md"loading="lazy"></iframe>

                </div>
              </div>
            </div>
          </div>
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

export default Home;
