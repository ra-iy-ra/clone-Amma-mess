import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/user-profile')
      .then(response => setUser(response.data))
      .catch(err => console.log(err));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="container">
        <h3>User Profile</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Cluster</th>
              <th scope="col">Meal Plan</th>
              <th scope="col">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.cluster.name}</td>
              <td>{user.mealPlan}</td>
              <td>{user.paymentStatus}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
