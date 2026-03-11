import type { DefaultBuildType as RehypeGithubAlertsBuildType } from 'rehype-github-alerts'

export const gfmAlertBuild: RehypeGithubAlertsBuildType = (alertOptions, originalChildren) => {
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
