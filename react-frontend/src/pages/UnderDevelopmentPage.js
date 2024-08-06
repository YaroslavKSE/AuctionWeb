import React from 'react'
import Layout from '../components/Layout/Layout'
import './styles/UnderDevelopmentPage.css'

const UnderDevelopmentPage = () => {
  return (
    <Layout>
      <div className="under-development-page">
        <div className="content">
          <h1>This Page is Under Development</h1>
          <div className="animation-container">
            <div className="gear-container">
              <div className="gear"></div>
              <div className="gear"></div>
            </div>
          </div>
          <p>We're working hard to bring you something amazing!</p>
          <p>Please check back soon for updates.</p>
          <a href="/" className="home-button">Return to Home</a>
        </div>
      </div>
    </Layout>
  )
}

export default UnderDevelopmentPage