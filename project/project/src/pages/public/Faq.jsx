import React from 'react'

function Faq() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">What is this platform?</h2>
          <p className="text-gray-600">
            This is a comprehensive learning management system designed to facilitate corporate training and development.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">How do I get started?</h2>
          <p className="text-gray-600">
            Register for an account or contact your organization's administrator to get access to the platform.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Who can use this platform?</h2>
          <p className="text-gray-600">
            The platform is designed for employees, trainers, HR professionals, IT staff, and L&D teams within organizations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Faq