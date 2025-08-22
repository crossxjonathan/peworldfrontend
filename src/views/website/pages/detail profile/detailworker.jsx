import React, { useEffect, useState } from 'react';
import map from '../../../../assets/images/map.png';
import imageDefault from '../../../../assets/images/profile1.png';
import portfoliodefault from '../../../../assets/images/Rectangle 641.png';
import experiencedefault from '../../../../assets/images/office-center.png';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../../configs/api';

const DetailWorkersProfile = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [detail, setDetail] = useState({});
  const [skill, setSkill] = useState({});
  const [portfolio, setPortfolio] = useState({});
  const [experience, setExperience] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  // const handleHire = () => {
  //   navigate('/hire');
  // };

  const handleDetailWorker = async () => {
    try {
      const res = await API.get(`/workers/${id}`);
      setDetail(res.data.data);
      console.log(res.data, '<<<<<<<<<<<<<<<<<<<<<res detail workers');
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleGetSkillById = async (id) => {
    try {
      const res = await API.get(`/skills/${id}`)
      setSkill(res.data.data)
      console.log(id, '<<<<<<<<<<<res skill');
    } catch (error) {
      console.log(error.message);
    }
  }

  
  const handleGetPortofolio = async (id) => {
    try {
      const res = await API.get(`/portfolio/${id}`);
      setPortfolio(res.data.data);
      console.log(res, '<<<<<<<<<<<<<<<<<<<<<res portfolio');
    } catch (error) {
      console.log(error.message);
    }
  }


  const handleGetExperience = async (id) => {
    try {
      const res = await API.get(`/experience/${id}`);
      setExperience(res.data.data);
      console.log(res, '<<<<<<<<<<<<<<<<<<<<<res experience');
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (id) {
      handleDetailWorker();
      handleGetSkillById(id);
      handleGetPortofolio(id);
      handleGetExperience(id);
    }
  }, [id]);

  if (!detail.name) {
    return <p>Loading...</p>;
  }

  return (
    <div id="workerspages">
      <section>
        <div className="homecolor">
          <div className="workerscontainer">
            <div className="rectanglepurple"></div>
            <div className="workerswrapper">
              <div className="RectangleWhiteLeft">
                <div className="personalProfile">
                  <div className="imageprofile">
                    <img src={detail.photo || imageDefault} alt="Profile" />
                  </div>
                  <div className="profiledata">
                    <h3>{detail.name}</h3>
                    <h2>{detail.job_desk}</h2>
                    <div className="domicilemap">
                      <img src={map} alt="mapdomicile" /> <p>{detail.domicile}</p>
                    </div>
                    <p>{detail.workplace}</p>
                    <p>{detail.description}</p>
                  </div>
                  <div onClick={() => navigate(`/recruiters/hire/${id}`)} className="hirebutton">
                    Hire
                  </div>
                  <div>
                    <h3>Skill</h3>
                    <div className="skillContainer">
                      {skill.length > 0 ? (
                        skill.map((item) => (
                          <div key={item.id} className="yellowSkill">
                          <p>{item.skill_name}</p>
                        </div>
                        ))
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="RectangleWhiteRight">
                <div className="titlePortfolio">
                  <div
                    className={`portfolio ${activeTab === 'portfolio' ? 'active' : ''}`}
                    onClick={() => setActiveTab('portfolio')}
                  >
                    <h3 className={activeTab === 'portfolio' ? 'active' : ''}>Portfolio</h3>
                    <hr className={`underline ${activeTab === 'portfolio' ? 'active' : ''}`} />
                  </div>
                  <div
                    className={`experience ${activeTab === 'experience' ? 'active' : ''}`}
                    onClick={() => setActiveTab('experience')}
                  >
                    <h3 className={activeTab === 'experience' ? 'active' : ''}>Experience</h3>
                    <hr className={`underline ${activeTab === 'experience' ? 'active' : ''}`} />
                  </div>
                </div>
                <div className="content">
                  {activeTab === 'portfolio' ? (
                    <div className="portfolio-container">
                      {portfolio.length > 0 ? (
                        portfolio.map((item) => (
                          <div key={item.id} className="portfolio-content">
                            <img src={item.upload_image || portfoliodefault} alt="Portfolio" />
                            <p>{item.application_name}</p>
                          </div>
                        ))
                      ) : (
                        <p>Portfolio Unavailable</p>
                      )}
                    </div>
                  ) : (
                    <div className="experience-container">
                      {experience.length > 0 ? (
                        experience.map(exp => (
                          <div key={exp.id} className="experience-content">
                            <img src={experiencedefault} alt="Experience" />
                            <div className="sub-experience">
                              <h1>{exp.position}</h1>
                              <h3>{exp.company_name}</h3>
                              <h2>{exp.month_company} {exp.year_company}</h2>
                              <p>{exp.description_company}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Experience Unavailable.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailWorkersProfile;
