import React from 'react'

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our learning management system. We are dedicated to providing high-quality educational experiences 
          and professional development opportunities for organizations and individuals.
        </p>
        <p className="text-lg text-gray-700">
          Our platform brings together learners, trainers, and administrators in a collaborative environment 
          designed to facilitate effective learning and skill development.
        </p>
      </div>
    </div>
  )
}

export default About