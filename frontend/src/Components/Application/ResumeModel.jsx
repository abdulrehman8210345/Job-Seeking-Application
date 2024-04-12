// import React from 'react'

const ResumeModel = ({imageURL,onClose}) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={imageURL} alt="Resume" />
      </div>
    </div>
  )
}

export default ResumeModel