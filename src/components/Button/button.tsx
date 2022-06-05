
import React from "react"
import classnames from 'classnames'//classname生成器

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

interface BaseButtonProps {
  className?:string;
  disabled?:boolean;
  size?:'lg'| 'sm';
  btnType?:'primary'| "default" | "danger" | "link";
  children:React.ReactNode;
  href?:string;
}

type NativeButtionProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
type AchorBUtoonProps =  React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps

export type ButtonProps = Partial<NativeButtionProps &  AchorBUtoonProps>

export const Button:React.FC<ButtonProps> = (props) => {
  //...restProps是用户添加的props
  const { disabled,className, btnType, children, size, href,...restProps} = props;
  //btn ,btn-lg, btn-primary
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]:btnType,
    [`btn-${size}`]:size,
    'disabled':(btnType === ButtonType.Link) && disabled
  })
  console.log(classes);
  
  if(btnType === ButtonType.Link && href) {
    return  (
      <a
        className= {classes}
        href = {href}
        {...restProps}
      >
        {children}
      </a>
    )
  }else {
    return (
      <button
        className= {classes}
        disabled = {disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }

}

Button.defaultProps = {
  disabled:false,
  btnType:ButtonType.Default 
}

export default Button;
