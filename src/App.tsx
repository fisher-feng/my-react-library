import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button'
// import { Alert } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
const App:React.FC = () => {
  return (
    <div className="App">
     <header className="App-header">
        <Menu defaultIndex={'0'} 
          mode = 'vertical'
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
       <Button style={{color:"red"}} >hello</Button>
       <Button disabled >disabled hello</Button>
       <Button btnType= {ButtonType.Primary} size = {ButtonSize.Large}>hello Primary </Button>
       <Button btnType= {ButtonType.Link} href = "http://www.baidu.com" target= "_blank" >baidu link</Button>
       <Button  disabled btnType= {ButtonType.Link} href = "www.baidu.com" >baidu link disabled</Button>
       {/* <Alert className='danger'></Alert> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          👍😁😄
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > 
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
