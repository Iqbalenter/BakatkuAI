const SkillList = ({ skills }) => {
    if (!skills || Object.keys(skills).length === 0) {
        return <p>There is no skill data.</p>;
    }

    const skillArray = Object.entries(skills)
        .map(([name, percentage]) => ({ name, percentage }))
        .sort((a, b) => b.percentage - a.percentage);

    const getLabel = (percentage) => {
        if (percentage >= 80) return "Very suitable";
        if (percentage >= 60) return "Medium";
        return "Less suitable";
    };

    const getColor = (percentage) => {
        const opacity = 0.6 + (percentage / 100) * 0.4;
        return `rgba(0, 80, 200, ${opacity})`;
    };

    return (
        <div className="skill-list-container">
            {skillArray.map((skill, index) => (
                <div key={index} className="skill-list">
                    <span className="skill-name">{skill.name}</span>
                    <span
                        className="skill-percentage"
                        style={{ backgroundColor: getColor(skill.percentage) }}
                    >
                        {getLabel(skill.percentage)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SkillList;
