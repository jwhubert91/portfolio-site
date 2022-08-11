export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  createHandle: "/handle",
  editProfile: "/@:profileHandle/edit",
  portfolio: "/@:profileHandle",
  projects: "/projects",
  createProject: "new",
  editProject: "edit/:projectId",
  projectId: ":projectId",
  fourOhFour: "*",
};

export const getPortfolioRoute = (displayName: string)=> {
  return `/@${displayName}`
}

export const getEditPortfolioRoute = (displayName: string)=> {
  return `/@${displayName}/edit`
}

export const getEditProjectRoute = (projectId: string)=> {
  return `/projects/edit/${projectId}`
}