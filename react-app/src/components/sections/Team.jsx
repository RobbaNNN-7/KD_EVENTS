import './Team.css';

const Team = () => {
    const teamMembers = [
        {
            name: 'Hammad Asif',
            title: 'Co-founder & Management Lead',
            education: 'Management Sciences, NUST',
            phone: '03184849969',
            email: 'hammadasif7860@gmail.com',
            image: '/assets/images/hd.png'
        },
        {
            name: 'Fatima Syed',
            title: 'Co-founder & Creative Director',
            education: 'Management Sciences, NUST',
            phone: '0318-5064123',
            email: 'fatimasyed377@gmail.com',
            image: '/assets/images/hd.png'
        },
        {
            name: 'Mohsin Mushtaq',
            title: 'Co-founder & Technical Lead',
            education: 'Civil Engineering, NUST',
            phone: '0304-4885738',
            email: 'mmalikmohsin77@gmail.com',
            image: '/assets/images/hd.png'
        }
    ];

    return (
        <section id="team">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <div className="member-image">
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="member-info">
                            <h3>{member.name}</h3>
                            <p className="member-title">{member.title}</p>
                            <p className="member-edu">{member.education}</p>
                            <div className="member-contact">
                                <a href={`tel:${member.phone}`}><i className="fas fa-phone"></i></a>
                                <a href={`mailto:${member.email}`}><i className="fas fa-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
