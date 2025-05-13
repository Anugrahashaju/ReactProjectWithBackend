import React from 'react'

function Features() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Interactive Learning</h2>
          <p className="text-gray-600">Engage with dynamic course content and interactive exercises designed to enhance your learning experience.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Progress Tracking</h2>
          <p className="text-gray-600">Monitor your learning journey with detailed progress tracking and performance analytics.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Expert Support</h2>
          <p className="text-gray-600">Access to qualified trainers and mentors to guide you through your learning path.</p>
        </div>
      </div>
    </div>
  )
}

export default Features