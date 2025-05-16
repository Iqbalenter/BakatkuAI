import Logos from "../../assets/Logos.png"
import "../../css/footer.css"
import { Heading3, Heading4 } from "../Elements/Heading/Index";
import Image from "../Elements/Image/Index";

const Footer = () => {
    return (
        <div className="Footer">
            <div className="footer-header">
                <Image src={Logos}/>
                <Heading4>BakatkuAI</Heading4>
            </div>

            <Heading3>Find your potential</Heading3>
        </div>
    )
}

export default Footer;