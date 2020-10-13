export const links = [
  {
    path: '/',
    name: 'Home Page',
  },
  {
    path: '/project-graph',
    name: 'Project Graph',
  },
  {
    path: '/graph-without-posts',
    name: 'Graph Without Posts',
  },
  {
    path: '/info',
    name: 'Info',
  }
];

export const getPathName = (pathName: string) => {
  switch(pathName){
    case "/":
      return "Home Page";
    case "/project-graph":
      return "Project Graph";
    case "/graph-without-posts":
      return "Graph Without Posts";
    case "/info":
      return "Information";
  }
};
