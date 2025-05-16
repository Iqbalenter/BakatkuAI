import BackButton from "../components/Elements/BackButton";
import Result from "../components/Fragments/ResultAnalysisContent2/ResultAnalysis";
import Footer from "../components/Layouts/Footer";
import Navbar from "../components/Layouts/Navbar";

import '../css/result-analysis2.css';

const ResultAnalysis2 = () => {
    return (
        <div className="result-analysis-container2">
            <BackButton to="/result-analysis" titleStyle={{ color: "#ffff", margin: "10px 60px", fontWeight: "700" }}>AI analysis results</BackButton>
            <Result/>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default ResultAnalysis2;