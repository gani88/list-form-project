import React, { useState, useRef, useEffect } from 'react';
import productsData from '../../public/productsMilitary.json';
import List from './List';

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        country: '',
        requestedProducts: [],
        additionalInfo: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [errors, setErrors] = useState({});

    const popoverRef = useRef(null); // Ref for popover

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    };

    const handleProductSelection = (product) => {
        setFormData({
            ...formData,
            requestedProducts: [...formData.requestedProducts, product]
        });
        setShowModal(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.company) newErrors.company = 'Company is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.country) newErrors.country = 'Country is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setSubmissions([...submissions, formData]);
            handleReset();
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            address: '',
            country: '',
            requestedProducts: [],
            additionalInfo: ''
        });
        setErrors({});
    };

    useEffect(() => {
        // Clean up popovers on component unmount or when errors change
        return () => {
            const popovers = popoverRef.current.querySelectorAll('.popover');
            popovers.forEach(popover => popover.remove());
        };
    }, [errors]);

    return (
        <div className="main-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-left' }}>
            <div className="container" style={{ width: '100%' }}>

                <div className="content__container">
                    <h1 className="heading__1">Military Manufacturers and Suppliers</h1>
                    <form onSubmit={handleSubmit} className="form mt-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} ref={popoverRef}>

                        {/* Form inputs that handle form data and product selection */}
                        <div className="form-group mt-3">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                data-bs-toggle="popover"
                                data-bs-content={errors.name || ''}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                data-bs-toggle="popover"
                                data-bs-content={errors.email || ''}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                data-bs-toggle="popover"
                                data-bs-content={errors.phone || ''}
                            />
                        </div>

                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                                data-bs-toggle="popover"
                                data-bs-content={errors.company || ''}
                            />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                data-bs-toggle="popover"
                                data-bs-content={errors.address || ''}
                            />
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                data-bs-toggle="popover"
                                data-bs-content={errors.country || ''}
                            />
                        </div>

                        {/* Requested Products */}
                        <div className="form-group">
                            <label>Requested Products</label>
                            <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)} style={{ marginRight: '1rem' }}>
                                Select Products
                            </button>
                        </div>

                        {/* Additional Information */}
                        <div className="form-group">
                            <label>Additional Information:</label>
                            <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleInputChange}
                                className="form-control"
                                rows="3"
                            />
                        </div>

                        {/* Form actions */}
                        <div className="form-actions" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <button type="submit" className="btn btn-primary" style={{ marginRight: '1rem' }}>Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ marginRight: '1rem' }}>Reset</button>
                        </div>
                    </form>
                </div>

                {/* Modal for product selection */}
                {showModal && (
                    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Select Products</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        {productsData.map(product => (
                                            <div className="col-4" key={product.id}>
                                                <div className="card" onClick={() => handleProductSelection(product)}>
                                                    <img src={product.image} className="card-img-top" alt={product.name} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{product.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Selected Products */}
                <div className="selected-products mt-5">
                    <h2>Selected Products</h2>
                    <div className="card-grid">
                        {formData.requestedProducts.map((product, index) => (
                            <div className="card" key={index}>
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* List Component */}
                <List submissions={submissions} setSubmissions={setSubmissions} />
            </div>
        </div>
    );
}

export default Form;
