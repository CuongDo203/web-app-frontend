import React from 'react'
import { Nav } from 'react-bootstrap'


function Sidebar() {
  return (
        <div className='col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100'>
            <div className='mt-2'>
                <Nav.Link className='text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline' role='button'>
                    <span className='f5-4'>Side Menu</span>
                </Nav.Link>
                <hr className='text-white d-none d-sm-block'></hr>
                <ul
                    className="nav nav-pills flex-column mt-2 mt-sm-0"
                >
                    <li className="nav-item my-1 py-2 py-sm-0">
                        <a href="#" className="nav-link text-white text-center text-small-start" aria-current="page">
                            <i ></i>
                            <span className='ms-2 d-none d-sm-inline'>Orders</span>
                        </a>
                    </li>
                    <li className="nav-item my-1 py-2 py-sm-0">
                        <a href="#" className="nav-link text-white text-center text-small-start" aria-current="page">
                            <i ></i>
                            <span className='ms-2 d-none d-sm-inline'>Products</span>
                        </a>
                    </li>
                    <li className="nav-item my-1 py-2 py-sm-0">
                        <a href="#" className="nav-link text-white text-center text-small-start" aria-current="page">
                            <i ></i>
                            <span className='ms-2 d-none d-sm-inline'>Categories</span>
                        </a>
                    </li>
                </ul>
                
            </div>
            <div class="dropdown open">
                <a
                    className="btn border-none dropdown-toggle text-white"
                    type="button"
                    id="triggerId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <i className='bi bi-person f5-4'></i>
                    <span className='fs-5 ms-3 d-none d-sm-inline'>Admin</span>
                </a>

                <div className="dropdown-menu" aria-labelledby="triggerId">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Logout</a>
                </div>
            </div>
            
        </div>
  )
}

export default Sidebar
