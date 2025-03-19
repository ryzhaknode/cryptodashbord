import { useState, useEffect } from "react";
import styles from './MessageModal.module.scss'; // Стилі для модалки

interface MessageModalProps {
    message: string | null;
    isVisible: boolean;
}

const MessageModal = ({ message, isVisible }: MessageModalProps) => {

    if (!message || !isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default MessageModal;
