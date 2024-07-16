import React from 'react'
import './footer.css'

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row footer-description">
                    <div className="col-md-6">
                        <p>&copy; 2023 Your company. All rights reserved.</p>
                    </div>
                    <div className="col-md-6">
                        <div className="text-end">Terms of Service | Privacy Policy</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
