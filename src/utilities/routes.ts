export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  createHandle: "/handle",
  editProfile: "/@:profileSlug/edit",
  portfolio: "/@:profileSlug",
  projects: "/projects",
  createProject: "new",
  edit: "edit",
  editProject: "edit/:projectId",
  projectId: ":projectId",
};

export const getPortfolioRoute = (displayName: string)=> {
  return `/@${displayName}`
}

export const getEditPortfolioRoute = (displayName: string)=> {
  return `/@${displayName}/edit`
}