import Content from '../components/Fragments/ArticleContent/Content';
import Footer from '../components/Layouts/Footer';
import Navbar from '../components/Layouts/Navbar';
import '../css/artilce.css';

const Article = () => {
    return (
        <div>
            <Content/>
            <Navbar/>
            <Footer/>
        </div>
    )
}

export default Article;