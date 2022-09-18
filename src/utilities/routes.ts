export const routes = {
  home: "/",
  login: "/accounts/login",
  signup: "/accounts/signup",
  createHandle: "/accounts/handle",
  editProfile: "/:profileHandle/profile",
  portfolio: "/:profileHandle",
  createProject: "/:profileHandle/new",
  projectDetail: "/:profileHandle/:projectSlug",
  editProject: "/:profileHandle/:projectSlug/edit",
  fourOhFour: "*",
};

export const getPortfolioRoute = (displayName: string)=> {
  return `/${displayName}`
}

export const getEditPortfolioRoute = (displayName: string)=> {
  return `/${displayName}/profile`
}

export const getNewProjectRoute = (displayName: string) => {
  return `/${displayName}/new`
}

export const getProjectDetailRoute = (displayName: string, projectSlug: string) => {
  return `/${displayName}/${projectSlug}`
}

export const getEditProjectRoute = (displayName: string, projectSlug: string)=> {
  return `/${displayName}/${projectSlug}/edit`
}

export const isDisplayNameValid = (displayName: string):Boolean=> {
  // 1 - make sure displayName does not contain reserved path segments
  if (reservedPathSegments.includes(displayName)) {
    return false
  } else {
    // 2 - make sure displayName does not contain reserved characters
    for (let char of displayName) {
      if (reservedPathCharacters.includes(char)) {
        return false
      }
    }
    return true
  }
}

// Route helpers
const reservedPathCharacters = "!*'();:@&=+$,/?%#[]"

const reservedPathSegments = ["accounts", "account", "settings", "setting", "portful", "portfuls", "portfolio", "help", "contact", "about", "info", "explore", "feed", "jobs", "job", "saved", "notifications", "messages", "create", "edit"]