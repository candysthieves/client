type PaymentSuccessPageProps = {
  searchParams: Promise<{
    paymentId?: string
    session_id?: string
  }>
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const { paymentId, session_id } = await searchParams

  if (!paymentId || !session_id) {
    return (
      <main>
        <h1>Не удалось проверить платеж</h1>
        <p>В ссылке отсутствуют необходимые параметры.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Возврат после оплаты</h1>
      <p>Проверяем статус платежа…</p>
    </main>
  )
}
