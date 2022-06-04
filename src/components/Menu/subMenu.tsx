import React, {FunctionComponentElement, useContext, useState} from "react";
import classNames from "classnames";
import {MenuContext} from './menu'
import {MenuItemProps} from './menuItem'
export interface SubMenuProps {
  index?:string;
  title:string;
  className?:string;
  children?:React.ReactNode;
}

const SubMenu:React.FC<SubMenuProps> = (props) => {
  const {index, title, children, className} = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as  Array<string>;
  const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index): false
  const [MenuOpen, setOpen] = useState(isOpend);
  const classes = classNames('menu-item submenu-item', className,  {
    'is-active':context.index === index,
  })
  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault();
    setOpen(!MenuOpen);
  }
  let timer:any
  const handleMouse = (e:React.MouseEvent, toggle:boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300)
  }
  const clickEvents = context.mode === 'vertical'?{
    onClick: handleClick
  } : {};

  const hoverEvents = context.mode !== 'vertical'? {
    onMouseEnter:(e:React.MouseEvent) => {
      handleMouse(e, true)
    },
    onMouseLeave:(e:React.MouseEvent) => {
      handleMouse(e, false)
    }
  }:{}

  const renderChildren = () => {
    const SubMenuClasses = classNames('viking-submenu', {
      'menu-opened':MenuOpen,
    })
    const childrenCompoment = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
       if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement,{
          index:`${index}-${i}`,
        })
       }else {
         console.error('warning :SubMenu has a child which is not a MenuItem component')
       }
    })

    return (
      <ul className= {SubMenuClasses}>
        {childrenCompoment}
      </ul>
    )
  }
  return (
    <li key = {index} className = {classes} {...hoverEvents}>
      <div className="submenu-title"  {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu