import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from './supabase-client';
import './App.css';

function Login() {
  const [credentials, setCredentials] = useState({
    cin: '',
    np: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Vérifier si le client existe dans Supabase
      const { data, error } = await supabase
        .from('client')
        .select('*')
        .eq('Cin', credentials.cin)
        .eq('Nom_Prenom', credentials.np);

      if (error) throw error;

      if (data?.length > 0) {
        setMessage('Connexion réussie! Redirection...');
        // Redirection vers la page de compte avec les paramètres
        setTimeout(() => {
          navigate(`/compte?cin=${encodeURIComponent(credentials.cin)}&np=${encodeURIComponent(credentials.np)}`);
        }, 1500);
      } else {
        throw new Error('Identifiants incorrects ou compte inexistant');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('src/Image/page.jpg')" }}>
      {/* Header amélioré */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo avec animation au survol */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Chi5a.tn
              </Link>
            </div>
      
            {/* Navigation Desktop améliorée */}
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
      
            {/* Bouton Mobile amélioré */}
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

          {/* Menu Mobile */}
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
  
      {/* Formulaire de connexion amélioré */}
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="backdrop-blur-lg bg-white/10 border-2 border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl w-full max-w-md">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
              <p className="text-blue-100">Accédez à votre espace personnel</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ CIN */}
              <div className="relative">
                <input
                  type="text"
                  id="cin"
                  name="cin"
                  value={credentials.cin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border-b-2 border-white/50 focus:border-cyan-400 focus:outline-none text-white placeholder-transparent peer"
                  placeholder=" "
                  required
                  pattern="[0-9]{8}"
                  title="Le CIN doit contenir 8 chiffres"
                />
                <label 
                  htmlFor="cin"
                  className="absolute left-0 -top-3.5 text-white/80 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                >
                  Numéro CIN
                </label>
                <div className="absolute right-0 bottom-3">
                  <svg className="w-5 h-5 text-white/60 peer-focus:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Champ Nom & Prénom */}
              <div className="relative">
                <input
                  type="text"
                  id="np"
                  name="np"
                  value={credentials.np}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border-b-2 border-white/50 focus:border-cyan-400 focus:outline-none text-white placeholder-transparent peer"
                  placeholder=" "
                  required
                />
                <label 
                  htmlFor="np"
                  className="absolute left-0 -top-3.5 text-white/80 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                >
                  Nom & Prénom
                </label>
                <div className="absolute right-0 bottom-3">
                  <svg className="w-5 h-5 text-white/60 peer-focus:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
                  loading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Se connecter
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </span>
                )}
              </button>

              {/* Lien vers l'inscription */}
              <div className="text-center pt-4">
                <p className="text-white/80">
                  Pas encore inscrit ?{' '}
                  <Link 
                    to="/reservation" 
                    className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 transition-colors"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>

              {/* Messages d'état */}
              {message && (
                <div className="mt-6 p-4 bg-green-50/90 border-l-4 border-green-500 rounded-r-lg">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-green-700 font-medium">{message}</p>
                  </div>
                </div>
              )}
              {error && (
                <div className="mt-6 p-4 bg-red-50/90 border-l-4 border-red-500 rounded-r-lg">
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

export default Login;