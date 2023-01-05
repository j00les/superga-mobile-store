import { useEffect, useState } from 'react';

export const useFetch = (endpoint, id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const product = async () => {
      const params = id ? id : '';

      try {
        setLoading(true);
        const response = await fetch(
          `https://superga-react-app.herokuapp.com/pub${endpoint}/${params}`
        );

        if (!response.ok) throw { name: 'Cant fetch' };
        const data = await response.json();

        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    product();
  }, [endpoint, id]);

  return { data, error, loading };
};
