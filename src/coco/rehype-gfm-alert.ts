import type {
  DefaultBuildType as rehypeGithubAlertsBuildType,
  IOptions as rehypeGithubAlertsOptionsType,
} from 'rehype-github-alerts'

const gfmAlertBuild: rehypeGithubAlertsBuildType = (alertOptions, originalChildren) => {
  return {
    type: 'element',
    tagName: 'GithubMarkdownAlert',
    properties: {
      keyword: alertOptions.keyword.toLowerCase(),
      title: alertOptions.title,
    },
    children: [...originalChildren],
  }
}

// The option type (IOptions) must have a `alerts` array, so we set it to Partial<T>.
export const rehypeGithubAlertsOptions: Partial<rehypeGithubAlertsOptionsType> = {
  build: gfmAlertBuild,
}
