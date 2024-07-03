import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

function List({ submissions, setSubmissions }) {
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleDelete = (index) => {
        const updatedSubmissions = submissions.filter((_, i) => i !== index);
        setSubmissions(updatedSubmissions);
        if (selectedSubmission === index) setSelectedSubmission(null);
    };

    const handleEdit = (index) => {
        setEditData({ ...submissions[index], index });
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSaveEdit = () => {
        const updatedSubmissions = submissions.map((submission, index) =>
            index === editData.index ? editData : submission
        );
        setSubmissions(updatedSubmissions);
        setIsEditing(false);
    };

    const handleDownloadPDF = (submission) => {
        const doc = new jsPDF();
        doc.text('Submission Details', 10, 10);
        doc.text(`Name: ${submission.name}`, 10, 20);
        doc.text(`Email: ${submission.email}`, 10, 30);
        doc.text(`Phone: ${submission.phone}`, 10, 40);
        doc.text(`Company: ${submission.company}`, 10, 50);
        doc.text(`Address: ${submission.address}`, 10, 60);
        doc.text(`Country: ${submission.country}`, 10, 70);
        doc.text(`Requested Products: ${submission.requestedProducts.map(product => product.name).join(', ')}`, 10, 80);
        doc.text(`Additional Information: ${submission.additionalInfo}`, 10, 90);
        doc.save('submission_details.pdf');
    };

    return (
        <div className="custom-list-container">
            <h2 className="custom-list-title">Ordered Products</h2>

            <div className="custom-card-grid">
                {submissions?.map((submission, index) => (
                    <div className="custom-card" key={index}>
                        <div className="custom-card-body">
                            {/* Assuming `productImage` is a property in submission.requestedProducts */}
                            {submission.requestedProducts.map((product, productIndex) => (
                                <React.Fragment key={productIndex}>
                                    <img src={product.image} alt={product.name} style={{ width: '50%' }} className="rounded"/>
                                    <h5 className="custom-card-title">{product.name}</h5>
                                    <p className="custom-card-text">{submission.name}</p>
                                    <p className="custom-card-text">{submission.company}</p>
                                    <div className="custom-button-group">
                                        <button onClick={() => setSelectedSubmission(index)} className="custom-btn custom-btn-info">
                                            Check Details
                                        </button>
                                        <button onClick={() => handleEdit(index)} className="custom-btn custom-btn-warning">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(index)} className="custom-btn custom-btn-danger">
                                            Delete
                                        </button>
                                        <button onClick={() => handleDownloadPDF(submission)} className="custom-btn custom-btn-success">
                                            Download PDF
                                        </button>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedSubmission !== null && submissions[selectedSubmission] && (
                <div className="custom-modal">
                    <div className="custom-modal-dialog">
                        <div className="custom-modal-header">
                            <h5 className="custom-modal-title">Submission Details</h5>
                            <button
                                type="button"
                                className="custom-modal-close"
                                onClick={() => setSelectedSubmission(null)}
                            >&times;</button>
                        </div>
                        <div className="custom-modal-body">
                            <p><strong>Name</strong> {submissions[selectedSubmission].name}</p>
                            <p><strong>Email</strong> {submissions[selectedSubmission].email}</p>
                            <p><strong>Phone</strong> {submissions[selectedSubmission].phone}</p>
                            <p><strong>Company</strong> {submissions[selectedSubmission].company}</p>
                            <p><strong>Address</strong> {submissions[selectedSubmission].address}</p>
                            <p><strong>Country</strong> {submissions[selectedSubmission].country}</p>
                            <p><strong>Requested Products</strong></p>
                            <ul>
                                {submissions[selectedSubmission].requestedProducts &&
                                    submissions[selectedSubmission].requestedProducts.map((product, index) => (
                                        <li key={index}>{product.name}</li>
                                    ))}
                            </ul>
                            <p><strong>Additional Information:</strong> {submissions[selectedSubmission].additionalInfo}</p>
                        </div>
                        <div className="custom-modal-footer">
                            <button type="button" className="custom-btn custom-btn-secondary" onClick={() => setSelectedSubmission(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditing && editData && (
                <div className="custom-modal">
                    <div className="custom-modal-dialog">
                        <div className="custom-modal-header">
                            <h5 className="custom-modal-title">Edit Submission</h5>
                            <button
                                type="button"
                                className="custom-modal-close"
                                onClick={() => setIsEditing(false)}
                            >&times;</button>
                        </div>
                        <div className="custom-modal-body">
                            <div className="custom-form-group">
                                <label className="custom-form-label">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    onChange={handleInputChange}
                                    className="custom-form-control"
                                />
                            </div>
                            <div className="custom-form-group">
                                <label className="custom-form-label">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleInputChange}
                                    className="custom-form-control"
                                />
                            </div>
                            <div className="custom-form-group">
                                <label className="custom-form-label">Phone:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editData.phone}
                                    onChange={handleInputChange}
                                    className="custom-form-control"
                                />
                            </div>
                            <div className="custom-form-group">
                                <label className="custom-form-label">Company:</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={editData.company}
                                    onChange={handleInputChange}
                                    className="custom-form-control"
                                />
                            </div>
                            <div className="custom-form-group">
                                <label className="custom-form-label">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editData.address}
                                    onChange={handleInputChange}
                                    className="custom-form-control"
                                />
                            </div>
                            <div className="custom-form-group">
                                <label className="custom-form-label">Country:</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={editData.country}
                                    onChange={handleInputChange}
                                    className="custom-form-control"
                                />
                            </div>
                            <div className="custom-form-group">
                                <label className="custom-form-label">Additional Information:</label>
                                <textarea
                                    name="additionalInfo"
                                    value={editData.additionalInfo}
                                    onChange={handleInputChange}
                                    className="custom-form-control"
                                />
                            </div>
                            <button type="button" className="custom-btn custom-btn-primary" onClick={handleSaveEdit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default List;
