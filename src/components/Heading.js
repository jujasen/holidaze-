import PropTypes from 'prop-types';

const Heading = (props) => {

    const { title,} = props;

    return (
        <>
            <h1 className="heading">{title}</h1>
        </>
    )


}

export default Heading;

Heading.propTypes = {
    title: PropTypes.string
};