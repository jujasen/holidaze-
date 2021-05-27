import { RiHotelLine, RiHome5Line } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchResult = (props) => {

    const { id, name, type, region } = props;

    return (
        <>
            <Link className="no-link" to={`accommodation/details/${id}`}>
                    <li className="searchresult__item flex">
                        {type === 'Hotel' ? <RiHotelLine className="searchresult__item-icon"></RiHotelLine> : <RiHome5Line className="searchresult__item-icon"></RiHome5Line>}
                        <div className="searchresult__item-info space__marg--l">
                            <h4>{name}</h4>
                            <p>{type} - {region} region</p>
                        </div>
                    </li>
            </Link>
        </>
    )


}

export default SearchResult;

SearchResult.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    region: PropTypes.string
};

