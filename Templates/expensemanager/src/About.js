import React from 'react'
import "./About.css"
import insta from './img/insta.png'
import linkedin from './img/linkedin.png'
import git from './img/git.png'
import mail from './img/mail.webp'

const About = () => {
    return (
        <>
            <div className="about-section">
                <h1>About Us Page</h1>
                <p>Some text about who we are and what we do.</p>
            </div>

            <h2 id="our-team">Our Team</h2>
            <div className="row">
                <div className='container1'>
                    <div className="column">
                        <h2 className='name'>DEVESH MEHTA</h2>
                        <p className="college">U22CS035-SVNIT, Surat</p>
                        <p className='about-text'>"Hello there! I'm a passionate individual currently embarking on my second year of the Bachelor of Technology (B.Tech) journey. I have a penchant for maintaining a serene disposition and a deep-seated love for crafting projects that drive my enthusiasm. Beyond my passion for projects, I also take pride in my strong and effective leadership skills."
                        </p>
                    </div>
                        <div className='icons'>
                            <div className='icon'><a href='https://www.instagram.com/devesh_1217/'><img src={insta}/></a></div>
                            <div className='icon'><a href='https://www.linkedin.com/in/devesh1217/'><img src={linkedin}/></a></div>
                            <div className='icon'><a href='https://github.com/devesh1217'><img src={git}/></a></div>
                            <div className='icon'><a href='mailto:devesh1217@yahoo.com'><img src={mail}/></a></div>
                        </div>
                </div>
                <div className='container1'>
                    <div className="column">
                        <h2 className='name'>HANUSHA JAIN</h2>
                        <p className="college">U22CS066-SVNIT, Surat</p>
                        <p className='about-text'>"Hello there, I'm a dedicated and hardworking individual, driven by a deep passion for technology. I'm currently in my second year of a B.Tech program and have consistently delivered strong academic performance. My technical skills are a point of pride, and I thoroughly enjoy working collaboratively in teams. I'm excited to bring my enthusiasm and expertise to our projects and contribute to their success</p>
                    </div>
                        <div className='icons'>
                            <div className='icon'><a href='#'><img src={insta}/></a></div>
                            <div className='icon'><a href='https://www.linkedin.com/in/hanusha-jain-332b06288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'><img src={linkedin}/></a></div>
                            <div className='icon'><a href='https://github.com/HanushaJain66'><img src={git}/></a></div>
                            <div className='icon'><a href='mailto:hanushajain04@gmail.com'><img src={mail}/></a></div>
                        </div>z
                </div>
                <div className='container1'>
                    <div className="column">
                        <h2 className='name'>DARSHAN VEKARIYA</h2>
                        <p className="college">U22CS030-SVNIT, Surat</p>
                        <p className='about-text'>Hello, I'm the guy who loves a good challenge and is always ready to find solutions. I'm currently in my second year of a B.Tech program and have a knack for picking up new skills. With a positive and smart approach, I'm here to make things happen and add that extra spark to our projects. Let's conquer challenges together!".</p>
                    </div>
                        <div className='icons'>
                            <div className='icon'><a href='https://instagram.com/v_darshan_2510?igshid=MzMyNGUyNmU2YQ=='><img src={insta}/></a></div>
                            <div className='icon'><a href='#'><img src={linkedin}/></a></div>
                            <div className='icon'><a href='#'><img src={git}/></a></div>
                            <div className='icon'><a href='mailto:u22cs030@coed.svnit.ac.in'><img src={mail}/></a></div>
                        </div>
                </div>
                <div className='container1'>
                    <div className="column">
                        <h2 className='name'>LAVANYA PINJARKAR</h2>
                        <p className="college">U22CS064-SVNIT, Surat</p>
                        <p className='about-text'>"Hello there, I'm a dedicated and hardworking individual, driven by a deep passion for technology. I'm currently in my second year of a B.Tech program and have consistently delivered strong academic performance. My technical skills are a point of pride, and I thoroughly enjoy working collaboratively in teams. </p>
                    </div>
                        <div className='icons'>
                            <div className='icon'><a href='https://instagram.com/_lavanya_pinjarkar_?igshid=MzMyNGUyNmU2YQ=='><img src={insta}/></a></div>
                            <div className='icon'><a href='http://www.linkedin.com/in/lavanya-pinjarkar-616384277'><img src={linkedin}/></a></div>
                            <div className='icon'><a href='https://github.com/Lavanya5904'><img src={git}/></a></div>
                            <div className='icon'><a href='mailto:u22cs064@coed.svnit.ac.in'><img src={mail}/></a></div>
                        </div>
                </div>
            </div>

        </>
    )
}

export default About
