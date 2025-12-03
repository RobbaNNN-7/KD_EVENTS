import './RecentProjects.css';

const RecentProjects = () => {
    const projects = [
        {
            title: 'National Literary Festival 5.0',
            description: 'A grand university event featuring concerts, competitions, and cultural performances.',
            attendance: '1500+',
            image: '/assets/images/concert.jpg'
        },
        {
            title: 'Tech Innovation Summit',
            description: 'A high-profile corporate seminar with industry leaders and networking sessions.',
            attendance: '500+',
            image: '/assets/images/event-1.jpeg',
        },
        {
            title: 'National Music Festival 2.0',
            description: 'An evening of traditional music, dance, and cultural performances.',
            attendance: '800+',
            image: '/assets/images/NMF.jpg'
        }
    ];

    return (
        <section id="recent-projects">
            <h2>Recent Projects</h2>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div className="project-card" key={index}>
                        <img src={project.image} alt={project.title} />
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <span className="attendance">Attendance: {project.attendance}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentProjects;
