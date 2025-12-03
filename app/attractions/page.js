"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'

export default function Page() {
  const [attractions, setAttractions] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttractions() {
      const res = await fetch(`/api/attractions`);
      const data = await res.json();
      setAttractions(data);
      setLoading(false);
    }
    fetchAttractions();
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Attractions</h1>
     <div>
        <Link href="/attractions/new">Create New Attraction</Link>
      </div>
      <ul>
        {attractions.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <img src={item.coverimage} height={200} alt={item.name} />
            <p>{item.detail}</p>
            <Link href={`/attractions/${item.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

