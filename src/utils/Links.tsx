export const links = [
  {
    path: '/',
    name: 'Home Page',
  },
  {
    path: '/graph-without-posts',
    name: 'Graph Without Posts',
  }
];

export const getPathName = (pathName: string) => {
  switch(pathName){
    case "/":
      return "Home Page";
    case "/graph-without-posts":
      return "Graph Without Posts";
  }
};
