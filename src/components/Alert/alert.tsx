import React, { ReactNode } from 'react'
import classnames from 'classnames'//classname生成器
export enum AlertSize {
  Large = 'lg',
  Small= 'sm',
  Middle = 'md'
} 

export enum AlertType {
  Sucess ="success",
  Default = "default",
  Danger = 'danger',
  Warning = 'warning'
}

interface BaseAlertProps  {
  action?:ReactNode;
  altType?:AlertType;
  message?:ReactNode;
  size?:AlertSize;
  closable?:boolean;
  className?:string;
  disabled?:boolean;
  onclose?:(e:MouseEvent) =>void;
}

// type NativeButtionProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
// type AchorBUtoonProps =  React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps

export type AlertProps = BaseAlertProps 
export const Alert:React.FC<BaseAlertProps>  = (Props) => {
  const {action, altType, message, size, closable, className,disabled,  onclose, ...restProps} = Props;

  const classes = classnames('alt', className, {
    [`alt${altType}`]:altType,
    [`alt-${size}`]:size,
  })

  return (
    <button 
      {...restProps}
      className = {classes}
      disabled = {disabled}
    >
      alert
    </button>    
  )
}

Alert.defaultProps  = {
  altType:AlertType.Default
}