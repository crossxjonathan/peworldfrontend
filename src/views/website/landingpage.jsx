/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Slider from 'react-slick';
import hary from '../../assets/images/photo hary.svg';
import Bill from '../../assets/images/billgates.jpeg';
import louis from '../../assets/images/photo louis.svg';
import nial from '../../assets/images/photo nial.svg';
import Elon from '../../assets/images/elon_musk_royal_society.jpg';
import Mark from '../../assets/images/mark zuckerburg.jpg';


import titleOne from '../../assets/images/thumbnail landingpage 1.svg';
import titleTwo from '../../assets/images/thumbnail landingpage 2.svg';
import titleThree from '../../assets/images/thumnail landingpage 3.svg';
import infobar from '../../assets/images/Rectangle 526.png'

import { FcOk } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const setSlider = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 340,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const navigate = useNavigate();
    const handleButton = () => {
        navigate('/auth/login');
    };

    return (
        <div id="landingpage">
            <section>
                <div className='containerOne'>
                    <div className='textone paddingStart'>
                        <h1>The best talents of the nation for the revolution of Industry 4.0</h1>
                        <p>Join us in harnessing the power of innovation and technology. Our dedicated team of experts is here to drive your projects forward and achieve unparalleled success in the era of digital transformation.</p>
                        <div onClick={handleButton} className='textonebutton'>
                            Let&apos;s Started Now
                        </div>
                    </div>
                    <div className='imageone'>
                        <img src={titleOne} alt="imageone" />
                    </div>
                </div>
            </section>
            <section>
                <div className='containerOne'>
                    <div className='textone mobileCenter'>
                        <img src={titleTwo} alt="imagetwo" />
                    </div>
                    <div className='imageone paddingtwo'>
                        <h1>Why Choose Talent from Peworld</h1>
                        <p><FcOk /> Highly skilled professionals ready to innovate.</p>
                        <p><FcOk /> Proven track record of excellence.</p>
                        <p><FcOk /> Diverse expertise across multiple industries.</p>
                        <p><FcOk /> Committed to driving your success.</p>
                    </div>
                </div>
            </section>
            <section>
                <div className='containerOne'>
                    <div className='textone paddingSkill'>
                        <h1>Skill Talent</h1>
                        <p>Discover the diverse range of expertise our talents bring to your projects. From programming languages to innovative solutions, we&apos;ve got you covered.</p>
                        <div className='skillcontainer'>
                            <div className='skillLeft'>
                                <p><FcOk /> Java</p>
                                <p><FcOk /> Kotlin</p>
                                <p><FcOk /> PHP</p>
                                <p><FcOk /> JavaScript</p>
                            </div>
                            <div className='skillRight'>
                                <p><FcOk /> Golang</p>
                                <p><FcOk /> C++</p>
                                <p><FcOk /> Ruby</p>
                                <p><FcOk /> 10+ Other Languages</p>
                            </div>
                        </div>
                    </div>
                    <div className='imageone'>
                        <img src={titleThree} alt="imageone" />
                    </div>
                </div>
            </section>
            <section>
                <div className='colorContainer'>
                    <div className='containerOne'>
                        <div className='opinioncontainer'>
                            <div className='textone paddingcarrousel'>
                                <h1>Their opinion about peworld</h1>
                                <div className='sliderprofile'>
                                    <Slider {...setSlider}>
                                        <div className='card-profile'>
                                            <div className='framephoto'>
                                                <img src={hary} alt="hary" />
                                            </div>
                                            <h3>Harry Styles</h3>
                                            <p>Web Developer</p>
                                            <div className='textopinion'>
                                                "Working here has been an amazing journey. The team is incredibly supportive, and I’ve grown so much professionally."
                                            </div>
                                        </div>
                                        <div className='card-profile'>
                                            <div className='framephoto'>
                                                <img src={nial} alt="hary" />
                                            </div>
                                            <h3>Niall Horan</h3>
                                            <p>Web Developer</p>
                                            <div className='textopinion'>
                                                "This place offers the perfect blend of challenge and opportunity. I love being part of such an innovative environment."
                                            </div>
                                        </div>
                                        <div className='card-profile'>
                                            <div className='framephoto'>
                                                <img src={louis} alt="hary" />
                                            </div>
                                            <h3>Louis Tomlinson</h3>
                                            <p>Web Developer</p>
                                            <div className='textopinion'>
                                                "The collaborative spirit here is second to none. It's a joy to work with such talented and driven individuals."
                                            </div>
                                        </div>
                                        <div className='card-profile'>
                                            <div className='framephoto'>
                                                <img src={Bill} alt="Bill" />
                                            </div>
                                            <h3>Bill Gates</h3>
                                            <p>Founder Microsoft</p>
                                            <div className='textopinion'>
                                                "Every day here is a new learning experience. The company truly values personal growth and development."
                                            </div>
                                        </div>
                                        <div className='card-profile'>
                                            <div className='framephoto'>
                                                <img src={Elon} alt="elon" />
                                            </div>
                                            <h3>Elon Musk</h3>
                                            <p>CEO Tesla & Space X</p>
                                            <div className='textopinion'>
                                                "Being part of this team has been incredibly fulfilling. The projects are exciting, and the support is unparalleled."
                                            </div>
                                        </div>
                                        <div className='card-profile'>
                                            <div className='framephoto'>
                                                <img src={Mark} alt="mark" />
                                            </div>
                                            <h3>Mark Zuckerburg</h3>
                                            <p>CEO Meta</p>
                                            <div className='textopinion'>
                                                "The culture here is fantastic. It’s a perfect place to grow and make a real impact with your work."
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='containerOne'>
                    <div className='infobar'>
                        <div className='infoframe'>
                            <img src={infobar} alt="infobar" />
                            <h1>Join Us and Transform Your Future</h1>
                        </div>
                        <div onClick={handleButton} className='textonebutton'>
                            Get Started Today
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage;