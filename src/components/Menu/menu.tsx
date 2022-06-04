import React, { useState, createContext} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (slectedIndex:string) => void;

export interface MenuProps {
  defaultIndex?:string;
  className?:string;
  mode?:MenuMode;
  style?:React.CSSProperties;
  children?:React.ReactNode;
  onSelect?:SelectCallback;
  defaultOpenSubMenus?:string[];
}

interface IMenuContext {
  index:string;
  onSelect?:SelectCallback;
  mode?:MenuMode;
  defaultOpenSubMenus?:string[];
}

export const MenuContext = createContext<IMenuContext>({index:'0'})

const Menu:React.FC<MenuProps> = (props) => {
  const {className, mode, style, children, defaultIndex, onSelect ,defaultOpenSubMenus} = props;
  const [currentActive ,setActive] = useState(defaultIndex);

  const classes = classNames('viking-menu', className, {
    'menu-vertical':mode === 'vertical',
    'menu-horizontal':mode !== 'vertical',
  })
  const handleClick = (index:string) => {
    setActive(index);
    if(onSelect) {
      onSelect(index);
    }
  }
  const passedContext:IMenuContext = {
    index:currentActive?currentActive : '0',
    onSelect:handleClick,
    mode:mode,
    defaultOpenSubMenus:defaultOpenSubMenus,
  }

  const renderChildrn = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu'){
        return React.cloneElement(childElement, {
          index:`${index}`//只添加index的属性给childItem
        })
      } else {
        console.error('warning :Menu has a child which is not a MenuItem component');
      }
    })
  }
  return (
    <ul className= {classes} style = {style} data-testid = 'test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildrn()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex:'0',
  mode:'horizontal',
  defaultOpenSubMenus:[]
}

export default Menu
