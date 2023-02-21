import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="home-container">
        <h1 className="home-title">Find the Job That Fits Your Life</h1>
        <p className="text">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="find-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
