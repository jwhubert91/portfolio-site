export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  createHandle: "/handle",
  editProfile: "/@:profileHandle/profile",
  portfolio: "/@:profileHandle",
  createProject: "/@:profileHandle/new",
  projectDetail: "/@:profileHandle/:projectSlug",
  editProject: "/@:profileHandle/:projectSlug/edit",
  fourOhFour: "*",
};

export const getPortfolioRoute = (displayName: string)=> {
  return `/@${displayName}`
}

export const getEditPortfolioRoute = (displayName: string)=> {
  return `/@${displayName}/profile`
}

export const getNewProjectRoute = (displayName: string) => {
  return `/@${displayName}/new`
}

export const getProjectDetailRoute = (displayName: string, projectSlug: string) => {
  return `/@${displayName}/${projectSlug}`
}

export const getEditProjectRoute = (displayName: string, projectSlug: string)=> {
  return `/@${displayName}/${projectSlug}/edit`
}