const SkillDescription = ({ name, description }) => {
    return (
        <div className="skill-description-container">
            <h3>{name}</h3>
            <div className="description-skill">
                <h5>Brief Description</h5>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default SkillDescription;