/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jest/valid-expect */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

// test('our first react test case' , function() {
//   const view = render(<Button>Nice</Button>)
//   // eslint-disable-next-line testing-library/prefer-screen-queries
//   const element = view.queryByText('Nice');
//   expect(element).toBeInTheDocument()
// })

const defaultProps = {
  onClick:jest.fn()
}

const testProps:ButtonProps = {
  btnType:ButtonType.Primary,
  size:ButtonSize.Large,
  className:'klass'
}

const disabledProps:ButtonProps = {
  disabled:true,
}

describe('test Button component', function(){
  it('should render the correct default buttton', function() {
    const view = render(<Button {...defaultProps}>Nice</Button>)
    const element = view.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);//模拟用户点击
    expect(defaultProps.onClick).toHaveBeenCalled;//判断有无该点击事件
    expect(element.disabled).toBeFalsy();
  })
  it('shold render the correct commponent based on different props',function(){
    const view = render(<Button {...testProps}>Nice</Button>)
    const element = view.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass');

  })
  it('shold render the correct commponent equals link href is provided', function() {
    const view = render(<Button btnType= {ButtonType.Link} href = "http://www.baidu.com">Link</Button>)
    const element = view.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  })
  it('shou render disabled button when disabled set to true', function() {
    const view = render(<Button {...disabledProps}>disabled</Button>);
    const element = view.getByText('disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);//模拟点击
    expect(disabledProps.onClick).not.toHaveBeenCalled;
  })
})


