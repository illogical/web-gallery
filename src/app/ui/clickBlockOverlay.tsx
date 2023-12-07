import { useEffect } from 'react';
import styles from './clickBlockOverlay.module.css';

interface ClickBlockOverlayProps {
    onClick: () => void;
}

export const ClickBlockOverlay: React.FC<ClickBlockOverlayProps> = ({ onClick }) => {
    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickAnywhere);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickAnywhere);
        };
      }, []);

    const handleClickAnywhere = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        onClick();

        document.removeEventListener("mousedown", handleClickAnywhere);
    }

    return <div className={`${styles.clickBlockOverlay}`} />;
}