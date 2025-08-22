/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import searchicon from '../../../../assets/images/search.png';
import API from '../../../../configs/api';
import imageDefault from '../../../../assets/images/profile1.png';
import map from '../../../../assets/images/map.png';
import { useNavigate } from 'react-router-dom';

const HomeWorkers = () => {
    const [searchValue, setSearchValue] = useState('');
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState('ASC');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [skills, setSkills] = useState({});
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchWorkers(searchValue, currentPage, sortBy);
    };

    const fetchWorkers = (search = '', page = 1, sortOrder = 'ASC') => {
        setLoading(true);
        setError('');

        API.get('/workers', {
            params: {
                limit: 5,
                page: page,
                sort: sortOrder,
                sortby: 'name',
                search: search
            }
        })
            .then(res => {
                setWorkers(res.data.data);
                setTotalPages(res.data.totalPages);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error fetching data:', error);
                setError('Error fetching data. Please try again.');
                setLoading(false);
            });
    };

    const GetSkillById = async (id) => {
        try {
            const res = await API.get(`/skills/${id}`);
            setSkills(prevSkills => ({
                ...prevSkills,
                [id]: res.data.data
            }));
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    useEffect(() => {
        fetchWorkers(searchValue, currentPage, sortBy);
    }, [currentPage, searchValue, sortBy]);
    
    useEffect(() => {
        if (workers.length) {
            workers.forEach(worker => {
                // PENTING: pakai worker.id (bukan users_id)
                GetSkillById(worker.id);
            });
        }
    }, [workers]);

    const handlePageClick = (page) => {
        console.log('Current Page:', page);
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        console.log('Fetching Workers for page:', page);
        fetchWorkers(searchValue, page, sortBy);
    };

    const handleSortClick = (order) => {
        setSortBy(order);
        fetchWorkers(searchValue, currentPage, order);
    };

    return (
        <div id='workerspages'>
            <div className='homecolor'>
                <section>
                    <div className='topjob'>
                        <p>Top Job</p>
                    </div>
                    <div className='containerHome'>
                        <form className='searchwrapper' onSubmit={handleSearchSubmit}>
                            <div className='searchinput'>
                                <input
                                    type="search"
                                    placeholder='Search for any skill'
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className='searchright'>
                                <div className='searchicon'>
                                    <img src={searchicon} alt="searchicon" />
                                </div>
                                <div className='category'>
                                    Category
                                    <div className='subcategory'>
                                        <div className='subcategorycontent'>
                                            <a
                                                href="#"
                                                onClick={() => handleSortClick("ASC")}
                                                className={sortBy === "ASC" ? "active" : ""}
                                            >
                                                A - Z
                                            </a>
                                            <a
                                                href="#"
                                                onClick={() => handleSortClick("DESC")}
                                                className={sortBy === "DESC" ? "active" : ""}
                                            >
                                                Z - A
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className='searchbutton' onClick={handleSearchSubmit}>
                                    Search
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <section>
                    <div className='containerHome'>
                        <div className='tablewrapper'>
                            {loading ? (
                                <div className='containerLoading'>
                                    <p>Loading....</p>
                                </div>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                workers.map(worker => {
                                    return (
                                        <div key={worker.id} className='cardHome'>
                                            <div className='subLeftCard'>
                                                <div>
                                                    <img 
                                                        className='cardImage' 
                                                        src={worker.photo || imageDefault} 
                                                        alt="Profile" 
                                                    />
                                                </div>
                                                <div className='profile-data'>
                                                    <h3>{worker.name || 'Name:'}</h3>
                                                    <p>{worker.job_desk || 'Job:'}</p>
                                                    <div className='domicile'>
                                                        <img src={map} alt="domicileCard" />
                                                        <p>{worker.domicile || 'Domicile:'}</p>
                                                    </div>
                                                    <div className='skillContainer'>
                                                        {skills[worker.id] && skills[worker.id].length > 0 ? (
                                                            skills[worker.id].map(skill => (
                                                                <div key={skill.id} className='yellowSkill'>
                                                                    <p>{skill.skill_name}</p>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>Skills: Not Available</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div 
                                                onClick={() => navigate(`/workers/detail/${worker.id}`)} 
                                                className='subRightCard'
                                            >
                                                View Profile
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    <div className='pagination'>
                        <a href="#" onClick={() => handlePageClick(currentPage - 1)}>&laquo;</a>
                        {[...Array(totalPages)].map((_, index) => (
                            <a
                                key={index}
                                href="#"
                                className={index + 1 === currentPage ? "active" : ""}
                                onClick={() => handlePageClick(index + 1)}
                            >
                                {index + 1}
                            </a>
                        ))}
                        <a href="#" onClick={() => handlePageClick(currentPage + 1)}>&raquo;</a>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default HomeWorkers;
