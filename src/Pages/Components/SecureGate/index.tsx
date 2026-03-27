import { useEffect, useState } from 'react';

// https://jsonplaceholder.typicode.com/posts

const SecureGate = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetch('https://jsonplaceholder.typicode.com/posts');
      const jsonData = await data.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data, 'data');

  return <div> Secure Gate </div>;
};

export default SecureGate;
