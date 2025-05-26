import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/history', label: 'History' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeAllMenus}>
            <span className="text-primary-500 text-2xl font-bold">FinTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-body font-medium transition-colors hover:text-primary-500 ${
                  location.pathname === link.path
                    ? 'text-primary-500'
                    : 'text-text-primary dark:text-text-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-text-primary dark:text-text-light" />
              ) : (
                <Sun size={20} className="text-text-primary dark:text-text-light" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User size={20} className="text-primary-500" />
                  <span className="font-medium">{user?.name}</span>
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-card shadow-dropdown"
                    >
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-body font-medium">{user?.name}</p>
                        <p className="text-small text-text-secondary dark:text-gray-400">{user?.email}</p>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            logout();
                            closeAllMenus();
                          }}
                          className="flex items-center w-full p-2 text-left rounded-button hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <LogOut size={18} className="mr-2 text-error-500" />
                          <span>Log out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-text-primary dark:text-text-light" />
              ) : (
                <Sun size={20} className="text-text-primary dark:text-text-light" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-text-primary dark:text-text-light" />
              ) : (
                <Menu size={24} className="text-text-primary dark:text-text-light" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    <div className="p-3 mb-2 bg-gray-50 dark:bg-gray-700 rounded-card">
                      <p className="text-body font-medium">{user?.name}</p>
                      <p className="text-small text-text-secondary dark:text-gray-400">{user?.email}</p>
                    </div>
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`text-body font-medium transition-colors hover:text-primary-500 ${
                          location.pathname === link.path
                            ? 'text-primary-500'
                            : 'text-text-primary dark:text-text-light'
                        }`}
                        onClick={closeAllMenus}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        logout();
                        closeAllMenus();
                      }}
                      className="flex items-center py-2 text-left text-error-500"
                    >
                      <LogOut size={18} className="mr-2" />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" onClick={closeAllMenus}>
                      <Button variant="outline" fullWidth>
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={closeAllMenus}>
                      <Button variant="primary" fullWidth>
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;