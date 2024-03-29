import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
function AdminBlog(){
    return(
        <div>
            <div id='hidden'></div>
            <Header/>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12'>
                        <h1>Testing</h1>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AdminBlog;