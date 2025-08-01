
import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const hotels = [
  {
    id: 1,
    name: "Royal Azur Hotel Thalassa",
    stars: 5,
    location: "Hammamet - Tunisie",
    offer: "✅ Nouveau // ✨ Luxe // 👶 Enfant -3 ans gratuit",
    price: 206,
    image: "hotel1_1.jpg",
    discount: 15,
    link: "hotel1"
  },
  {
    id: 2,
    name: "Hotel Royal Jiinene",
    stars: 4,
    location: "Sousse, Tunisie Aéroport",
    offer: "🏖 Vue Mer // 🍽️ Demi-pension // 🌅 Sunset Views",
    price: 99,
    image: "hotel2_1.jpg",
    discount: 10,
    link: "hotel2"
  },
  {
    id: 3,
    name: "Mahdia Beach & Aquapark",
    stars: 4,
    location: "Mahdia, Tunisie Station touristique",
    offer: "⛰ Nature & Spa // 🌲 Vue Forêt // 🔥 Cheminée",
    price: 117,
    image: "hotel3_1.jpeg",
    discount: 20,
    link: "hotel3"
  },
  {
    id: 4,
    name: "The Residence Douz",
    stars: 5,
    location: "Douz, Tunisie Palmeraie",
    offer: "🏙 Centre-ville // 📶 WiFi Gratuit // 🍳 Petit-déjeuner inclus",
    price: 312,
    image: "hotel4_1.jpg",
    discount: 5,
    link: "hotel4"
  },
  {
    id: 5,
    name: "Le Petit Palais & Spa",
    stars: 4,
    location: "Djerba, Tunisie Station touristique",
    offer: "🏝 All-Inclusive // 🏊 Piscine Privée // 🌴 Spa & Détente",
    price: 102,
    image: "hotel5_1.jpg",
    discount: 12,
    link: "hotel5"
  },
  {
    id: 6,
    name: "La Cigale",
    stars: 5,
    location: "Tabarka, Tunisie",
    offer: "🌿 Nature & Relax // 🐎 Activités Équestres // 🌄 Vue Panoramique",
    price: 260,
    image: "hotel6_1.jpg",
    discount: 8,
    link: "hotel6"
  }
];

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('src/Image/page.jpg')" }}>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Chi5a.tn
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-2">
              {[
                { path: "/inscrit", label: "Compte", icon: "user" },
                { path: "/", label: "Accueil", icon: "home" },
                { path: "/about", label: "À propos", icon: "info" },
                { path: "/contact", label: "Contact", icon: "mail" }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="group px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm uppercase tracking-wider transition-colors duration-300 hover:bg-gray-50 rounded-lg flex items-center"
                >
                  <span className="mr-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === "user" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      )}
                      {item.icon === "home" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      )}
                      {item.icon === "info" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                      {item.icon === "mail" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      )}
                    </svg>
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200">
              <ul className="space-y-2">
                {[
                  { path: "/inscrit", label: "Compte", icon: "user" },
                  { path: "/", label: "Accueil", icon: "home" },
                  { path: "/about", label: "À propos", icon: "info" },
                  { path: "/contact", label: "Contact", icon: "mail" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon === "user" && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        )}
                        {item.icon === "home" && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        )}
                        {item.icon === "info" && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                        {item.icon === "mail" && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        )}
                      </svg>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          <span className="inline-block px-4 py-2 bg-white bg-opacity-80 rounded-lg shadow-lg border-b-4 border-purple-500">
            Nos meilleurs Hôtels en Tunisie
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl">
              <div className="relative">
                <img 
                  src={`src/Image/${hotel.image}`} 
                  alt={hotel.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{hotel.discount}%
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < hotel.stars ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>

                <p className="mt-2 text-gray-600 text-sm">
                  <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {hotel.location}
                </p>

                <p className="mt-3 text-gray-700 text-sm">{hotel.offer}</p>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">à partir de</span>
                    <p className="text-xl font-bold text-red-600">
                      {hotel.price} <span className="text-base">TND</span>
                    </p>
                  </div>
                    <Link
                         to={`/${hotel.link}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors" >
                           Voir l'offre
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
<p>&copy; {new Date().getFullYear()} Chi5a.tn. Tous droits réservés.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;