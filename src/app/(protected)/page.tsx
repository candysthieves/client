import s from './page.module.css'

export default function Home() {
  return (
    <main className={s.container}>
      <h1 className={s.title}>Welcome to LumosApp</h1>
      <p className={s.subtitle}>Empowering your productivity journey</p>
      <div className={s.sampleBlock} />
    </main>
  )
}
