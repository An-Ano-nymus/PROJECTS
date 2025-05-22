import React, { useState, useEffect } from 'react';
import { Menu, X, Github as GitHub, Linkedin, Mail, ExternalLink, ChevronRight, Download, Play } from 'lucide-react';
import './index.css';

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const linkedInPosts = [
    "urn:li:ugcPost:7212702536871419904",
    "urn:li:ugcPost:7230858344675033088",
    "urn:li:share:7209986750696370176",
    "urn:li:share:7195839082491514880",
    "urn:li:share:7191419856502558722",
    "urn:li:share:7187112415510040576"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const totalScroll = docHeight - windowHeight;
      const progress = Math.min(position / totalScroll, 1);
      setScrollProgress(progress);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (id: string) => {
    setNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-indigo-700">
            RG<span className="text-amber-500">.</span>
          </a>
          
          <div className="hidden md:flex space-x-10">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => navigateTo(item.toLowerCase())}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 relative ${
                  activeSection === item.toLowerCase() ? 'text-indigo-600' : 'text-gray-700'
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
          
          <button onClick={() => setNavOpen(true)} className="md:hidden text-gray-700">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {navOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-lg p-6 transform transition-transform">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-indigo-700">Menu</span>
              <button onClick={() => setNavOpen(false)}>
                <X size={24} className="text-gray-700" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => navigateTo(item.toLowerCase())}
                  className={`text-left py-2 px-4 rounded-lg transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main>
        <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-gray-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="animate-fade-in">
                  <h2 className="text-indigo-600 font-medium mb-2">Hello, I'm</h2>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                    Raghav Garg
                  </h1>
                  <h3 className="text-xl md:text-2xl text-gray-700 mb-6">
                    B.Tech Student &amp; <span className="text-indigo-600">ML Enthusiast</span>
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-lg">
                    A passionate software developer and machine learning enthusiast with a strong foundation in Python, TensorFlow, and web development. Currently pursuing B.Tech in Information Technology at Bharati Vidyapeeth College of Engineering, Delhi.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="#contact" 
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Contact Me
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/raghav-garg-245b5b244/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium inline-flex items-center"
                    >
                      <Linkedin className="mr-2" size={18} />
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:w-2/5">
                <div className="relative">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D5603AQEgEoeqvCxjng/profile-displayphoto-shrink_800_800/B56ZZJ1pPzGUAg-/0/1744995522540?e=1750291200&v=beta&t=KPlgA7UNoHl1J2ohgHuCxe-R224JO7CmWfGiAEOx4qU"
                    alt="Raghav Garg"
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-xl mx-auto"
                  />
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-88 md:h-88 border-2 border-amber-400 rounded-full" />
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 border-2 border-dashed border-indigo-300 rounded-full animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                About <span className="text-indigo-600">Me</span>
              </h2>
              <div className="bg-white shadow-lg rounded-xl p-8 mb-10">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  As a B.Tech student in Information Technology at Bharati Vidyapeeth College of Engineering, Delhi, I'm passionate about leveraging technology to solve real-world problems. My academic journey has equipped me with strong foundations in machine learning, web development, and data analysis.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  I've developed several innovative projects, including a Face Accessories Detector achieving 76% accuracy, an autonomous driving system for GTA 5, and an interactive weather forecasting tool. These projects demonstrate my ability to apply theoretical knowledge to practical applications.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Currently serving as a Technical Executive at CSI and volunteering with NSS, I'm actively involved in organizing technical workshops and community service projects. I'm seeking opportunities to apply my skills in challenging real-world projects while continuing to grow in software development and artificial intelligence.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-indigo-600 mb-1">3+</p>
                  <p className="text-gray-600 text-sm">Projects Completed</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-indigo-600 mb-1">2</p>
                  <p className="text-gray-600 text-sm">Years Experience</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-indigo-600 mb-1">76%</p>
                  <p className="text-gray-600 text-sm">ML Model Accuracy</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-indigo-600 mb-1">10+</p>
                  <p className="text-gray-600 text-sm">Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              My <span className="text-indigo-600">Expertise</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
                  <div className="w-8 h-8 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Programming Languages</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Python</span>
                      <span className="text-gray-500">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">C++</span>
                      <span className="text-gray-500">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">JavaScript</span>
                      <span className="text-gray-500">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">HTML/CSS</span>
                      <span className="text-gray-500">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
                  <div className="w-8 h-8 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Frameworks & Libraries</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">TensorFlow</span>
                      <span className="text-gray-500">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Scikit Learn</span>
                      <span className="text-gray-500">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Flask</span>
                      <span className="text-gray-500">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">NumPy/Pandas</span>
                      <span className="text-gray-500">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
                  <div className="w-8 h-8 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Concepts & Tools</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Machine Learning</span>
                      <span className="text-gray-500">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Data Analysis</span>
                      <span className="text-gray-500">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Computer Vision</span>
                      <span className="text-gray-500">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Data Structures</span>
                      <span className="text-gray-500">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              My <span className="text-indigo-600">Work</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-blue-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">👓</div>
                      <div className="font-semibold">Face Accessories Detector</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Face Accessories Detector</h3>
                  <p className="text-gray-600 mb-4">
                    A deep learning model using CNN to detect face accessories like glasses and masks. 
                    Achieved 76% accuracy with a custom dataset and implemented real-time video processing.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">TensorFlow</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">OpenCV</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Python</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">CNN</span>
                  </div>
                  <a 
                    href="https://github.com/An-Ano-nymus/PROJECTS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">🚗</div>
                      <div className="font-semibold">GTA 5 Autonomous Driving</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">GTA 5 Autonomous Driving</h3>
                  <p className="text-gray-600 mb-4">
                    An autonomous driving system for GTA 5 using computer vision and deep learning. 
                    Successfully navigates virtual roads avoiding crashes using CNN for lane detection.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">OpenCV</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">TensorFlow 2.0</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Python</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Deep Learning</span>
                  </div>
                  <a 
                    href="https://github.com/An-Ano-nymus/PROJECTS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">🌤️</div>
                      <div className="font-semibold">Weather Forecasting Tool</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Interactive Weather Forecasting Tool</h3>
                  <p className="text-gray-600 mb-4">
                    A web application providing real-time weather updates for user-selected map locations. 
                    Implemented using WebGL for map rendering and integrated with weather APIs.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">WebGL</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">JavaScript</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">HTML/CSS</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Weather API</span>
                  </div>
                  <a 
                    href="https://github.com/An-Ano-nymus/PROJECTS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h3 className="text-2xl font-bold text-center mb-8">
                Recent <span className="text-indigo-600">Updates</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {linkedInPosts.map((postId, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <iframe
                      src={`https://www.linkedin.com/embed/feed/update/${postId}?collapsed=1`}
                      height="570"
                      width="100%"
                      frameBorder="0"
                      allowFullScreen
                      title={`LinkedIn Post ${index + 1}`}
                      className="w-full"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              Experience & <span className="text-indigo-600">Education</span>
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-indigo-200"></div>
                
                <div className="mb-16 relative">
                  <TimelineItem 
                    year="July - August 2024"
                    title="Summer Trainee - Data Science"
                    organization="Veeyo Tech"
                    position="left"
                    description={[
                      "Gained hands-on experience in data analysis, machine learning, and data visualization techniques.",
                      "Worked on real-world datasets to develop predictive models and actionable insights.",
                      "Utilized tools like Python, Pandas, and TensorFlow for implementing data science solutions."
                    ]}
                  />
                  
                  <TimelineItem 
                    year="2022 - Present"
                    title="Bachelor of Technology in Information Technology"
                    organization="Bharati Vidyapeeth College of Engineering, Delhi"
                    position="right"
                    description={[
                      "Graduation expected in 2026",
                      "Relevant coursework: Data Structures & Algorithms, Operating Systems, Artificial Intelligence",
                      "CGPA: 8.5/10"
                    ]}
                  />
                  
                  <TimelineItem 
                    year="2023 - Present"
                    title="Technical Executive"
                    organization="Computer Society of India (CSI)"
                    position="left"
                    description={[
                      "Organize technical workshops and events for students",
                      "Collaborate with team members to design and implement technical solutions",
                      "Contribute to community building and knowledge sharing initiatives"
                    ]}
                  />
                  
                  <TimelineItem 
                    year="2022 - Present"
                    title="Volunteer"
                    organization="National Service Scheme (NSS)"
                    position="right"
                    description={[
                      "Participate in community service projects",
                      "Collaborate with team members to organize social welfare activities",
                      "Develop leadership and communication skills through hands-on experiences"
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              Get In <span className="text-indigo-600">Touch</span>
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-indigo-600" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">raghavgarg92004@gmail.com</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Linkedin className="text-indigo-600" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/in/raghav-garg-245b5b244/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Connect with me
                  </a>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GitHub className="text-indigo-600" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">GitHub</h3>
                  <a 
                    href="https://github.com/An-Ano-nymus/PROJECTS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    View my repositories
                  </a>
                </div>
              </div>
              
              <div className="mt-12 bg-gray-50 rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-bold mb-6 text-center">Send Me a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="#home" className="text-2xl font-bold text-white">
                RG<span className="text-amber-500">.</span>
              </a>
              <p className="text-gray-400 mt-2">
                Striving to make an impact through technology.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://github.com/An-Ano-nymus/PROJECTS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
              >
                <GitHub size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/raghav-garg-245b5b244/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:raghavgarg92004@gmail.com"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Raghav Garg. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TimelineItem = ({ year, title, organization, position, description }) => {
  return (
    <div className={`mb-12 md:mb-20 flex flex-col md:flex-row ${position === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <div className="md:w-1/2 mb-4 md:mb-0">
        <div className={`md:${position === 'right' ? 'ml-12' : 'mr-12'} bg-white rounded-xl p-6 shadow-md relative`}>
          <div className={`hidden md:block absolute top-6 ${position === 'right' ? 'left-0 transform -translate-x-full' : 'right-0 transform translate-x-full'} w-0 h-0 border-y-8 border-y-transparent ${position === 'right' ? 'border-r-12 border-r-white' : 'border-l-12 border-l-white'}`}></div>
          
          <span className="text-sm font-medium text-indigo-600 mb-2 block">{year}</span>
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <h4 className="text-gray-600 mb-4">{organization}</h4>
          <ul className="text-gray-700 space-y-2">
            {description.map((item, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight size={16} className="text-indigo-600 mt-1 mr-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white shadow"></div>
    </div>
  );
};

export default App;
