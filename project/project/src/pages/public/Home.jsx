import { Link } from 'react-router-dom'
import { FaChalkboardTeacher, FaUserGraduate, FaChartLine, FaRocket, FaComments, FaCertificate } from 'react-icons/fa'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transform Your Organization's Learning Experience
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              A comprehensive learning management system that empowers your team with personalized training paths, certifications, and insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="bg-white text-primary-700 hover:bg-gray-100 transition-colors py-3 px-8 rounded-md font-semibold shadow-lg">
                Get Started
              </Link>
              <Link to="/features" className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors py-3 px-8 rounded-md font-semibold">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute right-0 top-0 opacity-10 h-full overflow-hidden">
          <svg width="500" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="150" r="100" fill="white" />
            <circle cx="450" cy="300" r="70" fill="white" />
            <circle cx="350" cy="400" r="120" fill="white" />
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Key Features</h2>
            <p className="text-lg text-gray-600">
              Discover how LearnSphere can revolutionize learning and development in your organization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <FaChalkboardTeacher className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Customized Learning Paths</h3>
              <p className="text-gray-600">
                Create personalized training journeys based on roles, departments, and individual needs to ensure targeted skill development.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <FaUserGraduate className="text-secondary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Role-Based Access</h3>
              <p className="text-gray-600">
                Different interfaces and permissions for admins, trainers, department heads, and employees to streamline the learning experience.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <FaChartLine className="text-accent-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Advanced Analytics</h3>
              <p className="text-gray-600">
                Comprehensive dashboards and reports to track progress, identify learning gaps, and measure training effectiveness.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <FaCertificate className="text-success-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Automated Certifications</h3>
              <p className="text-gray-600">
                Automatically issue and track certifications, with renewal reminders for compliance and professional development.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <FaComments className="text-warning-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Feedback System</h3>
              <p className="text-gray-600">
                Collect and analyze learner feedback to continuously improve course content and the overall learning experience.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-error-100 rounded-lg flex items-center justify-center mb-4">
                <FaRocket className="text-error-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">AI-Powered Recommendations</h3>
              <p className="text-gray-600">
                Intelligent course suggestions based on user behavior, skill gaps, and organizational priorities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your learning & development?</h2>
                <p className="text-white/90 mb-6">
                  Join thousands of organizations already using LearnSphere to elevate their training programs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register" className="bg-white text-primary-700 hover:bg-gray-100 transition-colors py-3 px-6 rounded-md font-semibold">
                    Get Started
                  </Link>
                  <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors text-white py-3 px-6 rounded-md font-semibold">
                    Contact Sales
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 p-6 md:p-0">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Team learning together" 
                  className="rounded-lg md:rounded-l-lg md:rounded-r-none shadow-lg object-cover h-64 w-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">
              Organizations of all sizes are achieving their learning objectives with LearnSphere.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Jane Doe</h4>
                  <p className="text-sm text-gray-600">HR Director, Tech Corp</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "LearnSphere has revolutionized how we approach employee development. The customizable learning paths and detailed analytics have made our training programs much more effective."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700 font-bold text-xl">
                  MS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Mark Smith</h4>
                  <p className="text-sm text-gray-600">L&D Manager, Global Finance</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The role-based dashboards have been a game-changer for our organization. Our trainers can focus on content creation while department heads can easily track their team's progress."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center text-accent-700 font-bold text-xl">
                  AT
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Alex Turner</h4>
                  <p className="text-sm text-gray-600">CTO, Innovate Inc</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a technology company, we needed an LMS that could keep up with rapid changes. The AI recommendations and flexible course creation tools have helped us stay ahead in our industry."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">95%</p>
              <p className="text-gray-600">Completion Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">500+</p>
              <p className="text-gray-600">Organizations</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">10k+</p>
              <p className="text-gray-600">Courses Created</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">1M+</p>
              <p className="text-gray-600">Learners Served</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home