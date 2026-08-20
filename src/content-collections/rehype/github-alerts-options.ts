import { type IOptions as GithubAlertsOptions } from "rehype-github-alerts"

export const githubAlertsOptions = {
  build: (alertOptions, originalChildren) => ({
    type: "element",
    tagName: "GithubAlert",
    properties: {
      keyword: alertOptions.keyword.toLowerCase(),
      title: alertOptions.title,
    },
    children: [...originalChildren],
  }),
} satisfies GithubAlertsOptions
