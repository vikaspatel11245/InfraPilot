export * from "@infrapilot/shared-types";

export interface RepoDetails {
  owner: string;
  name: string;
  provider: "github" | "gitlab" | "bitbucket";
}
