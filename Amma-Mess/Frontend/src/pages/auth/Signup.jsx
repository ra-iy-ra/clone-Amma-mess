import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clusters, setClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/clusters')
      .then(response => setClusters(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // if (!name || !email || !password || !selectedCluster) {
    //   alert("Please fill in all fields and select a cluster.");
    //   return;
    // }
  
    axios.post('http://localhost:3001/api/auth/register', { name, email, password, cluster: selectedCluster })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.error("Registration error:", err.response?.data);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cluster"><strong>Cluster</strong></label>
            <select name="cluster" className="form-select" onChange={(e) => setSelectedCluster(e.target.value)}>
              <option value="">Select Cluster</option>
              {clusters.map(cluster => (
                <option key={cluster._id} value={cluster._id}>{cluster.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
        </form>
        <p>Already Have an Account?</p>
        <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
