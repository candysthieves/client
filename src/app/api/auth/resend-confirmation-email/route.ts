const API_URL = process.env.API_URL

export async function POST(req: Request) {
  const body = await req.json()

  const response = await fetch(`${API_URL}/auth/resend-confirmation-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response
}
