import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome to LumosApp</h1>
      <p className={styles.subtitle}>Empowering your productivity journey</p>

      <div className={styles.features}>
        <div className={styles.card}>
          <h2>✨ Feature 1</h2>
          <p>Description of your first amazing feature that solves real problems.</p>
        </div>
        <div className={styles.card}>
          <h2>⚡ Feature 2</h2>
          <p>Description of your second amazing feature that users will love.</p>
        </div>
        <div className={styles.card}>
          <h2>🌟 Feature 3</h2>
          <p>Description of your third amazing feature that sets you apart.</p>
        </div>
      </div>
    </main>
  )
}
