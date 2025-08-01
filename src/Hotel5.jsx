import React from "react";
import { Link } from "react-router-dom";
import './App.css';

export default function Hotel5() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Royal Azur Hotel Thalassa</h1>
              <p className="text-blue-200 mt-2 text-sm md:text-base">Hammamet, Tunisie - Station touristique</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center bg-blue-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <img src="src/Image/phone.png" alt="Téléphone" className="w-5 h-5 mr-2 filter brightness-0 invert" />
              <p className="font-medium">+216 72 280 000</p>
            </div>
          </div>
          
          <nav className="mt-6">
            <ul className="flex space-x-6 text-sm md:text-base">
              <li>
                <a href="#accueil" className="hover:text-blue-200 transition-colors duration-300 font-medium pb-1 border-b-2 border-transparent hover:border-blue-300">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#chambres" className="hover:text-blue-200 transition-colors duration-300 font-medium pb-1 border-b-2 border-transparent hover:border-blue-300">
                  Chambres
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-200 transition-colors duration-300 font-medium pb-1 border-b-2 border-transparent hover:border-blue-300">
                  Services
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Gallery Section */}
      <section id="accueil" className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenue au Royal Azur Hotel Thalassa</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="overflow-hidden rounded-xl shadow-lg group">
                <img
                  src={`src/Image/hotel5_${i}.jpg`}
                  alt="Royal Azur Hotel Thalassa"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="chambres" className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Services & Équipements</h2>
            <div className="overflow-hidden rounded-xl shadow-xl mb-8">
              <img 
                src="src/Image/hotel5_6.png" 
                alt="Chambre Standard" 
                className="w-full h-auto object-cover transition-opacity duration-300 hover:opacity-90" 
              />
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold text-blue-800 mb-3">Hébergement</h2>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Découvrez l'Hôtel Royal Azur Thalassa</h3>
                <p className="text-gray-600 leading-relaxed">
                  L'Hôtel Royal Azur Thalassa propose une découverte Tunisienne à travers une déambulation dans ses
                  espaces à caractère culturel profond. Grâce à son emplacement unique, contemplez le soleil se coucher
                  avec vue sur mer depuis notre piscine à débordement et profitez d'infrastructures d'une qualité exceptionnelle.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Emplacement de l'Hôtel Royal Azur Thalassa</h3>
                <p className="text-gray-600 leading-relaxed">
                  Situé à un kilomètre de la célèbre médina de Hammamet, dans un jardin méditerranéen dominant l'une des plus
                  belles criques de sable fin du Cap Bon. À 1.3 km de la plage de Aziza et à 2.6 km de celle de Mrezga.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Restaurant et Bar</h3>
                <p className="text-gray-600 mb-3">L'Hôtel Royal Azur Thalassa met à disposition de ses clients différents restaurants :</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Gastronomie Internationale en buffet
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Dîner Thématique avec 3 soirées par semaine (pêcheur, asiatique & oriental)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Le restaurant est d'une capacité de 400 couverts
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    La Kasbah : restaurant à la carte avec spécialité tunisienne
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Hébergement de l'Hôtel Royal Azur Thalassa</h3>
                <p className="text-gray-600 mb-3">L'hôtel dispose de 116 Premium Rooms réparties comme suit :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Premium Double Room', 'Premium Triple Room', 'Premium Family Room', 'Premium Room'].map((room, index) => (
                    <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{room}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="services" className="py-12 px-4 bg-gradient-to-r from-blue-800 to-blue-600">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/reservation"
              state={{ hotelName: "Royal Azur Hotel Thalassa" }}
              className="inline-block bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold text-center
                         shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Réserver Maintenant
            </Link>
            <Link
              to="/"
              className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-center
                         shadow-lg hover:bg-white/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Royal Azur Hotel Thalassa</h3>
              <p className="text-blue-300">Hammamet, Tunisie</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-800 text-center text-blue-300 text-sm">
            &copy; 2025 Royal Azur Hotel Thalassa. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}