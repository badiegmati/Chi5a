import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from './supabase-client';
import './App.css';
function Reservation() {
  const [reservation, setReservation] = useState({
    cin: '',
    np: '',
    email: '',
    num: 1,
    date_A: '',
    date_S: '',
    hotel: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validation des dates
    if (new Date(reservation.date_A) >= new Date(reservation.date_S)) {
      setError('La date de départ doit être après la date d\'arrivée');
      setLoading(false);
      return;
    }

    try {
      // Vérifier si le client existe déjà
      const { data: existingClient, error: clientError } = await supabase
        .from('client')
        .select('*')
        .eq('Cin', reservation.cin);

      if (clientError) throw clientError;

      if (existingClient && existingClient.length > 0) {
        // Client existe déjà, vérifier les réservations pour les dates
        const { data: existingReservation, error: reservationError } = await supabase
          .from('reservation')
          .select('*')
          .eq('Cin', reservation.cin)
          .eq('Hotel', reservation.hotel)
          .lte('Date_A', reservation.date_S)
          .gte('Date_S', reservation.date_A);

        if (reservationError) throw reservationError;

        if (existingReservation && existingReservation.length > 0) {
          throw new Error('Vous avez déjà une réservation pour cet hôtel sur ces dates');
        }
      } else {
        // Nouveau client - insérer d'abord le client
        const { error: clientInsertError } = await supabase
          .from('client')
          .insert([{
            Cin: reservation.cin,
            Nom_Prenom: reservation.np,
            Email: reservation.email
          }]);

        if (clientInsertError) throw clientInsertError;
      }

      // Insérer la réservation
      const { error: reservationInsertError } = await supabase
        .from('reservation')
        .insert([{
          Cin: reservation.cin,
          Nom_Prenom: reservation.np,
          Email: reservation.email,
          Nombre_personnes: reservation.num,
          Date_A: reservation.date_A,
          Date_S: reservation.date_S,
          Hotel: reservation.hotel
        }]);

      if (reservationInsertError) throw reservationInsertError;

      setMessage('Réservation effectuée avec succès!');
      // Réinitialiser le formulaire après succès
      setReservation({
        cin: '',
        np: '',
        email: '',
        num: 1,
        date_A: '',
        date_S: '',
        hotel: ''
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('src/Image/page.jpg')" }}>
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
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="backdrop-blur-lg bg-white/20 border-2 border-white/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl w-full max-w-md md:max-w-2xl mt-16 md:mt-24">
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Réservation</h1>
              <p className="text-blue-100">Remplissez le formulaire pour réserver votre séjour</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="cin"
                    name="cin"
                    value={reservation.cin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                    placeholder="Numéro CIN"
                    required
                    pattern="[0-9]{8}"
                    title="Le CIN doit contenir 8 chiffres"
                  />
                  <label 
                    htmlFor="cin"
                    className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500"
                  >
                    CIN
                  </label>
                </div>


                <div className="relative">
                  <input
                    type="text"
                    id="np"
                    name="np"
                    value={reservation.np}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                    placeholder="Nom complet"
                    required
                  />
                  <label 
                    htmlFor="np"
                    className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500"
                  >
                    Nom & Prénom
                  </label>
                </div>


                <div className="relative md:col-span-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={reservation.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                    placeholder="Adresse email"
                    required
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500"
                  >
                    Email
                  </label>
                </div>


                <div className="relative">
                  <input
                    type="number"
                    id="num"
                    name="num"
                    min="1"
                    max="10"
                    value={reservation.num}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
                    placeholder="Nombre"
                    required
                  />
                  <label 
                    htmlFor="num"
                    className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500"
                  >
                    Personnes
                  </label>
                </div>


                <div className="relative">
                  <select
                    id="hotel"
                    name="hotel"
                    value={reservation.hotel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="">Sélectionnez un hôtel</option>
                    <option value="Royal Azur Hotel Thalassa">Royal Azur Hotel Thalassa</option>
                    <option value="Hotel Royal Jiinene">Hotel Royal Jiinene</option>
                    <option value="Mahdia Beach & Aquapark">Mahdia Beach & Aquapark</option>
                    <option value="The Residence Douz">The Residence Douz</option>
                    <option value="Le Petit Palais & Spa">Le Petit Palais & Spa</option>
                    <option value="La Cigale">La Cigale</option>
                  </select>
                  <label 
                    htmlFor="hotel"
                    className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500"
                  >
                    Hôtel
                  </label>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>


                <div className="relative">
                  <input
                    type="date"
                    id="date_A"
                    name="date_A"
                    value={reservation.date_A}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <label 
                    htmlFor="date_A"
                    className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500"
                  >
                    Arrivée
                  </label>
                </div>


                <div className="relative">
                  <input
                    type="date"
                    id="date_S"
                    name="date_S"
                    value={reservation.date_S}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                    min={reservation.date_A || new Date().toISOString().split('T')[0]}
                  />
                  <label 
                    htmlFor="date_S"
                    className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500"
                  >
                    Départ
                  </label>
                </div>
              </div>


              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 ${
                    loading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Confirmer la réservation
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>


              {message && (
                <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-green-700 font-medium">{message}</p>
                  </div>
                </div>
              )}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Chi5a.tn. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Reservation;