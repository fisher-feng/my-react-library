import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Button, {ButtonSize, ButtonType} from './components/Button/button'
// import { Alert } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition'
library.add(fas);//添加所有图标

const App:React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
     <header className="App-header">
        <Icon icon= 'arrow-down' theme ='primary' size='10x'></Icon>
        {/* <FontAwesomeIcon icon={faCoffee}  size = '10x'></FontAwesomeIcon> */}
        <Menu defaultIndex={'0'} 
          // mode = 'vertical'
          onSelect = {(index)=> {
            console.log(index);
          }}
          defaultOpenSubMenus ={[ '3', '4']}
        >
          <MenuItem  >
           cool link1
          </MenuItem>
          <MenuItem  disabled>
            cool link2
          </MenuItem>
          <MenuItem >
            cool link3
          </MenuItem>
          <SubMenu title='dropdown' >
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
          </SubMenu>
          <SubMenu title='dropdown' >
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
          </SubMenu>
       </Menu>

       <Button btnType='primary' size = 'lg' onClick = {() => {
         setShow(!show)
       }}>toggle</Button>
       <Transition in = {show} timeout = {300} animation = "zoom-in-left">
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
     </Transition>
     <Transition in = {show} timeout = {300} animation = "zoom-in-left">
        <Button btnType="primary"> A Large Button </Button>
     </Transition>
      </header>
    </div>
  );
}

export default App;
