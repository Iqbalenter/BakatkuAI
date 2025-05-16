import BackButton from "../components/Elements/BackButton";
import SkillProgress from "../components/Fragments/ResultAnalysisContent/SkillProgress";
import Footer from "../components/Layouts/Footer";
import Navbar from "../components/Layouts/Navbar";

import '../css/result-analysis.css';

const ResultAnalysis = () => {
    return (
        <div className="result-analysis-container">
            <BackButton to="/" titleStyle={{ color: "#ffff", margin: "10px 60px", fontWeight: "700" }}>AI analysis results</BackButton>
            <SkillProgress/>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default ResultAnalysis;