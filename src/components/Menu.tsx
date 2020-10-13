import React, { useState, useRef, useEffect, useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import { links, getPathName } from '../utils/Links';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


const Menu = () => {
  const [menuOpen, toggleMenu] = useState(false);
  const menuBool = useRef(false);
  const ref = useRef(null);
  const ANIMATION_TIME = 255; // seconds
  const classes = useStyles();
  const history = useHistory();

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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleMenu(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { getPathName(window.location.pathname) }
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor={'left'} open={menuOpen} variant={'persistent'} ref={ref}>
        <List>
          {links.map(item =>
            <React.Fragment key={item.name}>
              <ListItem button onClick={() => {
                toggleMenu(false);
                history.push(item.path);
              }}>
              <ListItemText primary={item.name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          )}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Menu;