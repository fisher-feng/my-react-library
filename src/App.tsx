import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button'
const App:React.FC = () => {
  return (
    <div className="App">
     <header className="App-header">
       <Button style={{color:"red"}} >hello</Button>
       <Button disabled >disabled hello</Button>
       <Button btnType= {ButtonType.Primary} size = {ButtonSize.Large}>hello Primary </Button>
       <Button btnType= {ButtonType.Link} href = "http://www.baidu.com" target= "_blank" >baidu link</Button>
       <Button  disabled btnType= {ButtonType.Link} href = "www.baidu.com" >baidu link disabled</Button>
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
