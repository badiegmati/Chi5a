import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const teamMembers = [
    {
      name: "Badie Gmati",
      email: "Badiegmati@email.com",
      phone: "+216 58 294 838",
      facebook: "https://www.facebook.com/gmati.badi",
      instagram: "https://www.instagram.com/badie_gmati?igsh=dGlvMzlwaDhyZzBj"
    },
    {
      name: "Ikram Boukhit",
      email: "boukhitikr10@email.com",
      phone: "+216 53 028 943",
      facebook: "https://www.facebook.com/ikram.boukhit.7?locale=fr_FR",
      instagram: "https://www.instagram.com/ikrambk937/?utm_source=ig_web_button_share_sheet"
    },
    {
      name: "Mayssa hamrouni",
      email: "mayssah395@email.com",
      phone: "+216 29 047 695",
      facebook: "https://www.facebook.com/hamrouni.mayssa.75?locale=fr_FR",
      instagram: "https://www.instagram.com/hamrouni__mayssa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      name: "Oumaima Dhouibi",
      email: "oumaima123@email.com",
      phone: "+216 12 345 678",
      facebook: "https://www.facebook.com/profile.php?id=100022302112990&sk=reels_tab",
      instagram: "https://www.instagram.com/___ou_maima___/?utm_source=ig_web_button_share_sheet"
    },
    {
      name: "Dardouri Youssef",
      email: "dardouriyoussef@email.com",
      phone: "+216 52 606 152",
      facebook: "https://www.facebook.com/dardouri.youssef.71?locale=fr_FR",
      instagram: "https://www.instagram.com/_youssef_dardouri_/?utm_source=ig_web_button_share_sheet"
    }
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" >
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


<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Notre Équipe
        </span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Rencontrez les talents derrière ce projet exceptionnel
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {teamMembers.map((member, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
          
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto mb-4"></div>
            </div>
            <div className="space-y-3 text-gray-700 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${member.email}`} className="hover:text-blue-600 transition-colors">
                  {member.email}
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="hover:text-blue-600 transition-colors">
                  {member.phone}
                </a>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <a 
                href={member.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a 
                href={member.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
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
};

export default About;