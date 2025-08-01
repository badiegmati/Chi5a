import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import supabase from './supabase-client';

function Compte() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  const cin = queryParams.get('cin');
  const np = queryParams.get('np');
const hotelImages = {
  "Royal Azur Hotel Thalassa": [
    "src/Image/hotel1_1.jpg", 
    "src/Image/Image/hotel1_2.jpg", 
    "src/Image/hotel1_3.jpg",
    "src/Image/hotel1_4.jpg",
  ],
  "Hotel Royal Jiinene": [
    "src/Image/hotel2_1.jpg", 
    "src/Image/hotel2_2.jpg", 
    "src/Image/hotel2_3.jpg",
    "src/Image/hotel2_4.jpg"
  ],
  "Mahdia Beach & Aquapark": [
    "src/Image/hotel3_1.jpeg", 
    "src/Image/hotel3_2.jpeg", 
    "src/Image/hotel3_3.jpeg",
    "src/Image/hotel3_4.jpeg"
  ],
  "The Residence Douz": [
    "src/Image/hotel4_1.jpg", 
    "src/Image/hotel4_2.jpg", 
    "src/Image/hotel4_3.jpg",
    "src/Image/hotel4_4.jpg"
  ],
  "Le Petit Palais & Spa": [
    "src/Image/hotel5_1.jpg", 
    "src/Image/hotel5_2.jpg", 
    "src/Image/hotel5_3.jpg",
    "src/Image/hotel5_4.jpg"
  ],
  "La Cigale": [
    "src/Image/hotel6_1.jpg", 
    "src/Image/hotel6_2.jpg", 
    "src/Image/hotel6_3.jpg",
    "srcImage//hotel6_4.jpg"
  ]
};
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reservation')
          .select(`
            Cin,
            Nom_Prenom,
            Email,
            Nombre_personnes,
            Date_A,
            Date_S,
            Hotel
          `)
          .eq('Cin', cin)
          .eq('Nom_Prenom', np);

        if (error) throw error;

        if (data && data.length > 0) {
          setClientData(data);
          const initialIndices = {};
          data.forEach(reservation => {
            initialIndices[reservation.Hotel] = 0;
          });
          setCurrentImageIndices(initialIndices);
        } else {
          setError('Aucune réservation trouvée pour ce client');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (cin && np) {
      fetchClientData();
    } else {
      setError('Informations de connexion manquantes');
      setLoading(false);
    }
  }, [cin, np]);

  useEffect(() => {
    if (clientData.length > 0) {
      const intervals = clientData.map(reservation => {
        return setInterval(() => {
          setCurrentImageIndices(prev => ({
            ...prev,
            [reservation.Hotel]: (prev[reservation.Hotel] + 1) % hotelImages[reservation.Hotel].length
          }));
        }, 3000);
      });

      return () => intervals.forEach(interval => clearInterval(interval));
    }
  }, [clientData]);

  const navItems = [
    { path: "/inscrit", label: "Compte", icon: "user" },
    { path: "/", label: "Accueil", icon: "home" },
    { path: "/reservation", label: "Réserver", icon: "calendar" },
    { path: "/annuler", label: "Annuler", icon: "close" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Chargement de vos réservations...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-red-500 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Une erreur est survenue</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link 
              to="/inscrit" 
              className="inline-block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Vérifier mes informations
            </Link>
            <Link 
              to="/reservation" 
              className="inline-block w-full px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-300"
            >
              Faire une réservation
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              Chi5a.tn
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`px-4 py-2 flex items-center text-sm font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === "user" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                      {item.icon === "home" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                      {item.icon === "calendar" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                      {item.icon === "close" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                    </svg>
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <button 
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === "user" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                      {item.icon === "home" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                      {item.icon === "calendar" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                      {item.icon === "close" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                    </svg>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Bonjour, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{clientData[0]?.Nom_Prenom}</span>
          </h1>
          <p className="text-lg text-gray-600">Voici le récapitulatif de vos réservations</p>
        </section>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Vos informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Numéro CIN</p>
                  <p className="text-lg font-semibold text-gray-800">{clientData[0]?.Cin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-800">{clientData[0]?.Email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nom complet</p>
                  <p className="text-lg font-semibold text-gray-800">{clientData[0]?.Nom_Prenom}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nombre de réservations</p>
                  <p className="text-lg font-semibold text-gray-800">{clientData.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

  <section className="space-y-8">
  {clientData.map((reservation, index) => (
    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">
            Réservation #{index + 1}
          </h3>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
            {reservation.Hotel}
          </span>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">

        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
          <img
            src={hotelImages[reservation.Hotel][currentImageIndices[reservation.Hotel] || 0]}
            alt={reservation.Hotel}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h4 className="text-xl font-bold">{reservation.Hotel}</h4>
            <div className="flex space-x-2 mt-2">
              {hotelImages[reservation.Hotel].map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={() => setCurrentImageIndices(prev => ({
                    ...prev,
                    [reservation.Hotel]: imgIndex
                  }))}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImageIndices[reservation.Hotel] === imgIndex 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Image ${imgIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>


        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Date d'arrivée</p>
              <p className="text-lg font-semibold text-gray-800">{reservation.Date_A}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Date de départ</p>
              <p className="text-lg font-semibold text-gray-800">{reservation.Date_S}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Nombre de personnes</p>
              <p className="text-lg font-semibold text-gray-800">{reservation.Nombre_personnes}</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Galerie de l'hôtel</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hotelImages[reservation.Hotel].slice(0,4).map((img, imgIndex) => (
                <div 
                  key={imgIndex}
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => setCurrentImageIndices(prev => ({
                      ...prev,
                      [reservation.Hotel]: imgIndex
                    }))}
                    className="w-full h-full"
                  >
                    <img
                      src={img}
                      alt={`${reservation.Hotel} ${imgIndex + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  </button>
                  {currentImageIndices[reservation.Hotel] === imgIndex && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Actuelle
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</section>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Chi5a.tn</h3>
              <p className="text-gray-400">Votre plateforme de réservation d'hôtels en Tunisie.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@chi5a.tn</li>
                <li>+216 12 345 678</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Chi5a.tn. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Compte;