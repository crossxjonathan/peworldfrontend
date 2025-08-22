/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import searchicon from '../../../../assets/images/search.png';
import API from '../../../../configs/api';
import imageDefault from '../../../../assets/images/hire-1714369_1280.jpg';
import map from '../../../../assets/images/map.png';
import { useNavigate } from 'react-router-dom';
import nohistory from '../../../../assets/images/no history.svg';

const History = () => {
    const [hire, setHire] = useState([]);

    const handleGetHireWorkers = async () => {
        try {
            const res = await API.get('/hire/workers');
            setHire(res.data.data)
            console.log(res, '<<<<<<<<<<<<<<<<<<res hire workers');
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleGetHireRecruiters = async () => {
        try {
            const res = await API.get('/hire/recruiters');
            setHire(res.data.data)
            console.log(res, '<<<<<<<<<<<<<<<<<<res hire recruiters');
        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        handleGetHireWorkers()
        handleGetHireRecruiters()
    }, []);


    return (
        <div id='workerspages'>
            <div className='homecolor'>
                <section>
                    <div className='topjob'>
                        <p>Top Job</p>
                    </div>
                </section>
                <section>
                    <div className='containerHome'>
                        <div className='tablewrapper'>
                            {hire.length > 0 ? (
                                hire.map((item) => (
                                    <div key={item.id} className='cardHome'>
                                        <div className='subLeftCard'>
                                            <div>
                                                <img className='cardImageHistory' src={imageDefault} alt="Profile" />
                                            </div>
                                            <div className='profile-data'>
                                                <h3>{item.hire_name || 'Name:'}</h3>
                                                <p>{item.message_purpose || 'No Message....'}</p>
                                                <p>{item.hire_description || 'No Description.....'}</p>
                                            </div>
                                        </div>
                                        <div className='subRightCard'>
                                            Chat
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='Nohistory'>
                                    <img src={nohistory} alt="nohistory" />
                                    <h1>No History</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default History;
