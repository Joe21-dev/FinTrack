import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  CreditCard, 
  Wallet, 
  LineChart, 
  Calendar, 
  Bell, 
  Shield 
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-10 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Take Control of Your Finances
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  Track expenses, monitor income, and achieve your financial goals with our intuitive financial tracking app.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <Button variant="secondary" size="lg">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/signup">
                        <Button variant="secondary" size="lg">
                          Get Started
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:bg-opacity-20">
                          Login
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Financial Dashboard Preview" 
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to manage your personal finances in one place.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BarChart3 size={40} className="text-primary-500" />,
                  title: "Expense Tracking",
                  description: "Effortlessly log and categorize your expenses with our intuitive interface."
                },
                {
                  icon: <Wallet size={40} className="text-primary-500" />,
                  title: "Budget Management",
                  description: "Set budgets for different categories and receive alerts when you're close to limits."
                },
                {
                  icon: <LineChart size={40} className="text-primary-500" />,
                  title: "Financial Insights",
                  description: "Visualize your spending patterns with beautiful, interactive charts."
                },
                {
                  icon: <CreditCard size={40} className="text-primary-500" />,
                  title: "Multiple Input Methods",
                  description: "Add transactions manually, via voice commands, or by scanning receipts."
                },
                {
                  icon: <Calendar size={40} className="text-primary-500" />,
                  title: "Recurring Transactions",
                  description: "Set up recurring transactions for regular income and expenses."
                },
                {
                  icon: <Bell size={40} className="text-primary-500" />,
                  title: "Smart Notifications",
                  description: "Get timely reminders for upcoming bills and budget alerts."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index + 1}
                  variants={fadeIn}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
                Get started in minutes and take control of your finances.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create an Account",
                  description: "Sign up for free and set up your profile in just a few clicks."
                },
                {
                  step: "02",
                  title: "Add Your Transactions",
                  description: "Log your income and expenses manually or using our automated tools."
                },
                {
                  step: "03",
                  title: "Gain Financial Insights",
                  description: "View your financial reports and make informed decisions."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index + 1}
                  variants={fadeIn}
                >
                  <div className="bg-primary-50 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-primary-500 font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-secondary dark:text-gray-400">{item.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-16 h-1 bg-primary-200 dark:bg-primary-800 transform -translate-x-8"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Trust & Security Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center">
                <motion.div 
                  className="md:w-2/3 mb-8 md:mb-0 md:pr-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-4">Your Data is Secure</h2>
                  <p className="text-lg mb-6 text-text-secondary dark:text-gray-400">
                    We take security seriously. Your financial data is encrypted and protected with the highest standards.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Bank-level 256-bit encryption",
                      "Secure user authentication",
                      "Regular security audits",
                      "No third-party data sharing"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Shield size={20} className="text-success-500 mr-2 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="md:w-1/3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                  variants={fadeIn}
                >
                  <img 
                    src="https://images.pexels.com/photos/5699397/pexels-photo-5699397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Security" 
                    className="rounded-xl shadow-md"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of users who have improved their financial habits with FinTrack.
              </p>
              <div className="flex justify-center">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button variant="secondary" size="lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/signup">
                    <Button variant="secondary" size="lg">
                      Get Started for Free
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;