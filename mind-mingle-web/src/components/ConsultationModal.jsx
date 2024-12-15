import { Modal } from 'antd'
import styles from './consultation-modal.module.css'
import { useNavigate } from 'react-router-dom';

const ConsultationModal = ({ open, onClose }) => {
    const navigate = useNavigate();
    const handleVoiceButton = () => {
        navigate('/voice')
    }

    const handleChatButton = () => {
        navigate('/chat')
    }

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
          <button onClick={handleChatButton} className={styles.option}>
            Chat
          </button>
          <button onClick={handleVoiceButton} className={styles.option}>
            Voice
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConsultationModal;