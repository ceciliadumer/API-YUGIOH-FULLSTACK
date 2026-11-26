export async function GETPRODUCTS(request: Request) {
  const response = await fetch("https://api.vercel.app/products")
  const products = await response.json()
  return Response.json(products)
}

export async function GETNASA(request: Request) {
  const response = await fetch("https://tle.ivanstanojevic.me/api/tle")
  const nasa = await response.json()
  return Response.json(nasa)
}