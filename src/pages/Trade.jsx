import React from 'react';
import Form from '../components/Form';
import List from '../components/List';

function Trade() {
    return (
        <div className="main-container" style={{marginTop: '50px'}}>
            <h1>Trade Page</h1>

            <div className='page__content mb-5'>
                <Form />
            </div>

            {/* <div className='page__content mb-5'>
                <List />
            </div> */}
            
        </div>
    );
}

export default Trade;
