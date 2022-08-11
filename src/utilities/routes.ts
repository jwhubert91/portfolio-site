export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  portfolio: "/@:profileHandle",
  createHandle: "/@:profileHandle/handle",
  editProfile: "/@:profileHandle/profile",
  createProject: "/@:profileHandle/new",
  projectDetail: "/@:profileHandle/:projectSlug",
  editProject: "/@:profileHandle/:projectSlug/edit",
  fourOhFour: "*",
  projectId: ":projectSlug",
};

export const getPortfolioRoute = (displayName: string)=> {
  return `/@${displayName}`
}

export const getEditPortfolioRoute = (displayName: string)=> {
  return `/@${displayName}/profile`
}

export const getProjectDetailRoute = (displayName: string, projectSlug: string) => {
  return `/@${displayName}/${projectSlug}`
}

export const getEditProjectRoute = (displayName: string, projectSlug: string)=> {
  return `/@${displayName}/${projectSlug}/edit`
}