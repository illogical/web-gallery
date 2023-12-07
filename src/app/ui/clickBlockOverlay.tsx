import styles from './clickBlockOverlay.module.css';

interface ClickBlockOverlayProps {

}

export const ClickBlockOverlay: React.FC<ClickBlockOverlayProps> = () => {
    return <>
        <div className={`${styles.clickBlockOverlay}`}></div>
    </>
}