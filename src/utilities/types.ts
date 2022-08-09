import { Url } from "url";
import { permissionsLevels } from './constants'

export interface ExternalLinkType {
  title: string,
  url: string,
}

export type PermissionsType = "CREATOR_FREE" | "CREATOR_PAID" | "AGENCY_FREE" | "AGENCY_PAID"

export interface ProjectType {
  id?: string,
  creatorId: string
  title: string,
  startMonth: number,
  startYear: number,
  endMonth: number | null,
  endYear: number | null,
  inProgress: boolean,
  summary256: string,
  description?: string,
  image?: string,
  projectLink1?: ExternalLinkType,
  projectLink2?: ExternalLinkType,
  projectLink3?: ExternalLinkType,
}

export interface ProfileType {
  userId: string
  firstName: string,
  lastName: string,
  pronouns?: string,
  profileType: PermissionsType,
  username: string,
  title: string,
  location?: string,
  bio?: string,
  profileImageUrl?: string,
  backgroundImageUrl?: string,
  profileLink1: ExternalLinkType,
  profileLink2: ExternalLinkType,
  profileLink3: ExternalLinkType,
  profileLink4: ExternalLinkType,
  profileLink5: ExternalLinkType,
}