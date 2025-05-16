import Image from "../../Elements/Image/Index";
import SendEmailIcon from "../../../assets/icon-park-outline_send-email.png";
import Paragraph from "../../Elements/Paragraph/Index";
import { Heading3 } from "../../Elements/Heading/Index";
const Main = () => {
    return (
        <div>
            <div className="title">
                <Heading3>Verifikasi Email</Heading3>
            </div>

            <div className="verif-container">
                <Paragraph className="text1">Verifikasi Email anda Telah dikirim</Paragraph>
                <Image src={SendEmailIcon} width={50}/>
                <Paragraph className="text2">Cek email anda berkala</Paragraph>
            </div>
        </div>
    )
}

export default Main;
