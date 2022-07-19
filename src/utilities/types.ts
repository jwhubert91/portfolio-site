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