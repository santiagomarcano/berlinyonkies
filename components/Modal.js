import ReactDOM from 'react-dom'

export default function Modal ({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center fadeIn'
      style={{ background: 'rgba(0, 0, 0, 0.3)' }}
      data-parent={true}
      onClick={e => {
        if (e.target.getAttribute('data-parent')) {
          onClose()
        }
      }}
    >
      {children}
    </div>,
    document.body
  )
}
