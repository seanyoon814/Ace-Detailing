import React from 'react';
import DetailPic from '../../images/detailgarage.png'
function DetailVancouver(){
    return(
        <>
        <div className='row justify-content-center'>
            <div className='col-12 text-center pb-5' style={{marginTop:'10vh'}}>
                <img src={DetailPic} alt='NL272' style={{maxWidth:'60%', maxHeight:'auto'}}></img>
            </div>
        </div>
        <div className='row justify-content-center'>
            <div className='col-4 text-center'>
                <p className="paragraph instrument-sans btn-ripple" style={{fontWeight:'500', opacity:'1'}}>"SOLUTIONS DESIGNED
FOR EVERY PHASE OF DETAILING"<br/><span style={{fontSize:'0.6em', fontWeight:'300'}}>- LABOCOSMETICA</span></p>
            </div>
        </div>
        <div className='row justify-content-center'>
                        <div className='col-4 text-center'>
                <p className='paragraph lato-light' style={{opacity:1}}>NASIOL CANADA WARRANTY : NL272</p>
                <table>
                        <tr>
                            <td><b>5 YEARS</b> <br/>without annual top coat</td>
                            <td><b>10 YEARS</b> <br/>without annual top coat</td>
                            <td><b>Declared on Carfax</b></td>
                        </tr>
                </table>
            </div>
            <div className='col-4 text-center'>
                <p className='paragraph lato-light' style={{opacity:1}}>NASIOL CANADA WARRANTY : ZR53</p>
                <table>
                    <tr>
                        <td><b>5 YEARS</b> <br/>without annual top coat</td>
                        <td><b>10 YEARS</b> <br/>without annual top coat</td>
                        <td><b>Declared on Carfax</b></td>
                    </tr>
                </table>
            </div>
        </div>
        </>
    );
}

export default DetailVancouver