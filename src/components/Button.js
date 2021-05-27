import PropTypes from 'prop-types';

const Button = (props) => {

    const { text } = props;



    return (
        <>
            <button className="button">{text}</button>
        </>
    )


}

export default Button;

Button.propTypes = {
    text: PropTypes.string
};