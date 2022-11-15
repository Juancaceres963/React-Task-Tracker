import ProtTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Buttom from './Buttom';

const Header = ({title , onAdd, showAdd}) => {
  const location = useLocation()
  
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' &&
      <Buttom color={showAdd ? "red" : "green"}
       text={showAdd ? "Close" : "Add"} 
       onClick={onAdd}/>}
    </header>
  )
}

Header.defaultProps = {
  title: "Task Tracker"
}

Header.ProtTypes = {
  title: ProtTypes.string.isRequired,
}

export default Header