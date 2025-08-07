import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/protected')
      .then(res => setData(res.data))
      .catch(err => console.error('Unauthorized', err));
  }, []);

  return (
    <div>
      <h2>Dashboard (Protected)</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;
