import Header from '../components/Fragments/FillIdentityContent/Header';
import FormIdentity from '../components/Fragments/FillIdentityContent/FormIdentity';

import '../css/fill-identity.css'
import Footer from '../components/Layouts/Footer';

const FillIdentity = () => {
    return (
        <div className="fill-identity">
            <Header/>
            <FormIdentity/>
            <Footer/>
        </div>
    )
}

export default FillIdentity;