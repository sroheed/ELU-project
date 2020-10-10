import React, { useState, useRef, useEffect, useCallback } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

const Menu = () => {
  const [menuOpen, toggleMenu] = useState(false);
  const menuBool = useRef(false);
  const ref = useRef(null);
  const ANIMATION_TIME = 255; // seconds

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        if(menuBool.current){
          toggleMenu(false);
        }
      }
    },
    [ref.current],
  );

  useEffect(() => {
    setTimeout(() => {
      menuBool.current = menuOpen;
    }, ANIMATION_TIME);
  });

  useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => {
      document.removeEventListener('click', clickListener);
    }
  }, []);

  return (
    <React.Fragment>
      <Button onClick={() => toggleMenu(true)} ref={ref}>Menu</Button>
      <Drawer anchor={'left'} open={menuOpen} variant={'persistent'} ref={ref}>
        <div>item1</div>
        <div>item1</div>
      </Drawer>
    </React.Fragment>
  );
};

export default Menu;