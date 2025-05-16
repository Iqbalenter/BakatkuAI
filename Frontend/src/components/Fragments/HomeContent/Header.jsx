import BakatKuLogo from '../../../assets/BakatKuLogos.png'
import { Heading1, Heading4 } from '../../Elements/Heading/Index';
import Image from '../../Elements/Image/Index';
import Paragraph from '../../Elements/Paragraph/Index';
import { useNavigate } from 'react-router';

const Header = () => { 
  const navigate = useNavigate();
  return ( 
    <div className="home-header">
      <header className='container-fluid'>
        <div className="home-logo">
          <Image src={BakatKuLogo} width={50}/>
          <Heading1>BakatKuAI</Heading1>
        </div>

        <div className="home-hero">
          <Heading4>Discover your best potential with the BakatkuAI app!</Heading4>
          <Paragraph>With our advanced CV scanning feature, we help you identify and personalize your skills.</Paragraph>
        </div>

        <div className="header-button">
          <a className='btn' onClick={() => navigate('/send-cv')}>Get Started</a>
        </div>
      </header>
    </div>
  )
}

export default Header;
