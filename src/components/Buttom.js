import PropTypes from "prop-types"

const Buttom = ({color, text, onClick}) => {
  return <button
  onClick={onClick}
  style={{backgroundColor: color}} 
  className='btn'>
      {text}</button>
}

Buttom.defaultProps = {
    color: "steelblue"
}

Buttom.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Buttom