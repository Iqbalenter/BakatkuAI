import Header from "../components/Fragments/HomeContent/Header"
import Card from "../components/Fragments/HomeContent/Card"
import Footer from "../components/Layouts/Footer"
import Navbar from "../components/Layouts/Navbar"
import "../css/home.css"

const Home = () => {
    return (
        <div>
            <Header/>
            <Card/>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default Home;