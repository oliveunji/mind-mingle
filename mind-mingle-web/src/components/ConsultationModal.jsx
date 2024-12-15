import { Modal } from 'antd'
import styles from './consultation-modal.module.css'

export function ConsultationModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      className={styles.modal}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <div className={styles.container}>
        <h3 className={styles.title}>Select Consultation Type</h3>
        <div className={styles.options}>
          <button onClick={() => onClose('chat')} className={styles.option}>
            Chat
          </button>
          <button onClick={() => onClose('voice')} className={styles.option}>
            Voice
          </button>
        </div>
      </div>
    </Modal>
  )
}