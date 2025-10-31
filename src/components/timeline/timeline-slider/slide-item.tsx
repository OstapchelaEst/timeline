import styles from './timeline-slider.module.scss'

interface Props {
  title: string
  text: string
}

export const SlideItem = ({ title, text }: Props) => {
  return (
    <div className={styles.slide}>
      <p className={styles.title}>{title}</p>
      <span className={styles.text}>{text}</span>
    </div>
  )
}
