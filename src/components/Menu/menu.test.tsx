/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { cleanup, fireEvent, render,RenderResult, waitFor } from "@testing-library/react";
import Menu, {MenuProps} from './menu';
import MenuItem from './menuItem';
import SubMenu from "./subMenu";
const testProps:MenuProps = {
  defaultIndex:'0',
  onSelect:jest.fn(),
  className:'test',
}

const testVerProps:MenuProps = {
  defaultIndex:'0',
  mode:'vertical',
  defaultOpenSubMenus: ['4']
}

const generateMenu = (props:MenuProps) => {
  return (
    <Menu {...props} >
      <MenuItem >
        active 
      </MenuItem>
      <MenuItem disabled >
        disabled
      </MenuItem>
      <MenuItem >
        xyz
      </MenuItem>

      <SubMenu title='dropdown' >
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>

      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>

    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile:string = `
    .viking-submenu{
      display:none;
    }

    .viking-submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style
}
let wrapper:RenderResult, wrapper2:RenderResult,meunuElement:HTMLElement, activeElement:HTMLElement, disabledELement:HTMLElement 
describe('test Menu and MenuItem componnent', function() {
  beforeEach(()=> {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    meunuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledELement = wrapper.getByText('disabled');
  })
  it('should render correct Menu and MenuItem based on default props', function () {
    expect(meunuElement).toBeInTheDocument();
    expect(meunuElement).toHaveClass('viking-menu test');
    // expect(meunuElement.getElementsByTagName('li').length).toEqual(3);
    expect(meunuElement.querySelectorAll(':scope > li').length).toEqual(5);//scope代表meunuElement本身
    expect(disabledELement).toHaveClass('menu-item is-disabled');
  })
  it('click items should change active and call the right callback', function() {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');//调用的参数是2
    fireEvent.click(disabledELement);
    expect(disabledELement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  })
  it('should render vertical mode when mode is set to vettical', function() {
    cleanup()
    const wrapper = render(generateMenu(testVerProps));
    const meunuElement = wrapper.getByTestId('test-menu');
    expect(meunuElement).toHaveClass('menu-vertical');
  })

  it('should show dropdown items when hover on subMenu', async () =>{
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    // expect(wrapper.queryByText('drop1')).toBeVisible();
    //异步等待mouseEnter结束
    await waitFor(()=>{
      expect(wrapper.queryByText('drop1')).toBeVisible();//判断css 为display:block
    })
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  })
});

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = wrapper2.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(wrapper2.getByText('dropdown'))
    expect(dropDownItem).toBeVisible()
  })
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(wrapper2.queryByText('opened1')).toBeVisible()
  })
})
