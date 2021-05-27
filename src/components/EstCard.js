import uuid from 'react-uuid';
import { TiStarFullOutline } from 'react-icons/ti'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EstCard= (props) => {

    const { id, name, image, region, stars, price } = props;


    return (
            <Link className="no-link" to={`accommodation/details/${id}`}>
            <div className="estcard">
                <div className="estcard__section flex">
                    <img className="estcard__img" src={image} alt={name + ' room'}/>
                    <div className="estcard__general">
                        <h3 className="estcard__title">{name}</h3>
                        <p className="estcard__region">{region} region</p>
                    </div>

                </div>
                <div className="flex flex--space flex--align-end">
                    <div>
                        <div className="estcard__stars flex flex--start">
                            {
                                [...Array(stars)].map(() => (
                                    <TiStarFullOutline key={uuid()}className="estcard__star"></TiStarFullOutline>
                                )
                            )}
                        </div> 
                        <p className="estcard__rating">{stars} stars</p>
                    </div>
                    <div
                    className="estcard__price"
                    ><p>from</p>
                    kr {price} <span>per night</span></div>
                </div>
            </div>
            </Link>
    )


}

export default EstCard;

EstCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    region: PropTypes.string,
    stars: PropTypes.number,
    price: PropTypes.number,
};

