import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-subtitle font-semibold mb-4">FinTrack</h3>
            <p className="text-text-secondary dark:text-gray-400 mb-4">
              A modern financial tracking application to help you manage your expenses and income.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-subtitle font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-text-secondary dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Transaction History
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-subtitle font-semibold mb-4">Contact</h3>
            <p className="text-text-secondary dark:text-gray-400 mb-2">
              Have questions or feedback? Reach out to us.
            </p>
            <p className="text-text-secondary dark:text-gray-400">
              Email: support@fintrack.example.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-text-secondary dark:text-gray-400">
            &copy; {new Date().getFullYear()} FinTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;