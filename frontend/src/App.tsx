import { useState } from 'react';

interface dataType {
  message: string
}

function App() {
  const [data, setData] = useState<dataType | null>(null);

  const fetchData = () => {
    fetch('/api')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.log('Error fetching data:', error));
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {data ? (
        <pre>{data.message}</pre>
      ) : (
        <p>No data yet. Click the button to fetch data.</p>
      )}
    </div>
  );
}

export default App;
