import { Url } from "url";

export interface ExternalLinkType {
  title: string,
  url: string,
}

export interface ProjectType {
  title: string,
  startMonth: number,
  startYear: number,
  endMonth: number | null,
  endYear: number | null,
  inProgress: boolean,
  summary256: string,
  description?: string,
  image: string,
  externalLinks: ExternalLinkType[],
}

export interface User {
  name: string,
  username: string,
  pronouns?: string,
  title: string,
  location?: string,
  bio?: string,
  profileLinks: ExternalLinkType[],
  profileImage: Url,
  backgroundImage: Url,
}