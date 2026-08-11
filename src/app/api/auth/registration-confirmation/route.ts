// // DO NOT DELETE:
// const API_URL = process.env.API_URL
//
// export async function POST(req: Request) {
//   const body = await req.json()
//
//   console.log('CONFIRMATION BODY:', body)
//   console.log('CONFIRMATION START')
//
//   const response = await fetch(`${API_URL}/auth/registration-confirmation`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   })
//
//   console.log('CONFIRMATION BACKEND STATUS:', response.status)
//
//   if (response.status === 204) {
//     return new Response(null, {
//       status: 204,
//     })
//   }
//
//   const responseText = await response.text()
//
//   console.log('CONFIRMATION BACKEND RESPONSE:', responseText)
//
//   return new Response(responseText, {
//     status: response.status,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }

const API_URL = process.env.API_URL

export async function POST(req: Request) {
  const body = await req.json()

  const response = await fetch(`${API_URL}/auth/registration-confirmation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (response.status === 204) {
    return new Response(null, {
      status: 204,
    })
  }

  return response
}
