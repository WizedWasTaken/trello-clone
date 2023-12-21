import { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
}

function Test() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    fetch("./lotusrp/api/data.php")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Vite React with PHP Backend</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((item: Item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Test;
