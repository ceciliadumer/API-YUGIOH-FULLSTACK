"use client"

import { useEffect, useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  description: string
}

export  function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch products from your API route
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8">Loading products...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-600 my-2">{product.description}</p>
            <p className="font-bold text-lg">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  )
}


interface NasaData {
  type: string
  totalItems: number //obrigatório
  member: [] //obrigatório
} 


export default function NasaPage() {
  const [nasaData, setNasaData] = useState<NasaData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch products from your API route
    fetch("https://tle.ivanstanojevic.me/api/tle")
      .then((res) => res.json())
      .then((data) => {
        setNasaData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8">Loading NASA data...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">NASA Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nasaData.map((data) => (
          <div key={data.type} className="border rounded-lg p-4">
            <h2 className="font-semibold text-lg">{data.type}</h2>
            <p className="text-sm text-gray-600 my-2">{data.totalItems} items</p>
            <p className="font-bold text-lg">${data.member}</p>
          </div>
        ))}
      </div>
    </main>
  )
}