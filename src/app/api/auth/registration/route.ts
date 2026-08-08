const API_URL = process.env.API_URL

export async function POST(req: Request) {
  const body = await req.json()

  console.log('API_URL:', API_URL)
  console.log('Body:', body)
  try {
    const url = `${API_URL}/auth/registration`

    console.log('Proxy to:', url)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    console.log('Backend status:', response.status)

    return response
  } catch (error) {
    console.error('Proxy error:', error)

    throw error
  }
}
