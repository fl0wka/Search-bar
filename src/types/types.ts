export interface IButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  styleButton: string;
}

export interface ISearchFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  styleButton: string;
}

export interface IWrapperProps {
  children: React.ReactNode;
}

export interface IPaginationProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
  onClick: (pageNumber: number) => void;
}

export interface ICardYoutubeProps {
  data: IYoutubeItemResponse[];
}

export interface ICardGitProps {
  data: IGithubLoginResponse[];
}

// YOUTUBE DATA
export interface IYoutubeItemResponse {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface IYoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IYoutubeItemResponse[];
}

// GITHUB DATA
export interface IGithubItemResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score?: number;
}

export interface IGithubSearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IGithubItemResponse[];
}

export interface IGithubLoginResponse extends IGithubItemResponse {
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
