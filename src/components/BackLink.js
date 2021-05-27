import { IoIosArrowBack } from 'react-icons/io';
import { useHistory } from "react-router-dom";

const BackLink = () => {

    let history = useHistory();

    const goBack = () => {
        history.goBack()
    }

    return (
        <>
            <div className="backlink" onClick={goBack} >
                <IoIosArrowBack className="backlink__icon"></IoIosArrowBack>
                Back
            </div>
        </>
    )


}

export default BackLink;