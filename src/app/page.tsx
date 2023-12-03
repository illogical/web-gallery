import Image from 'next/image'
import styles from './page.module.css'
import { MediaGallery } from './gallery/mediaGallery'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <MediaGallery />
      </div>
    </main>
  )
}
