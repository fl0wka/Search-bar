import {
  IGithubItemResponse,
  IGithubLoginResponse,
  IGithubSearchUsersResponse,
  IYoutubeItemResponse,
  IYoutubeSearchResponse,
} from '../types/types';

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

// GITHUB
export function isGithubData(
  value: unknown
): value is IGithubSearchUsersResponse {
  if (!isObject(value)) {
    return false;
  }

  if (
    'total_count' in value &&
    typeof value.total_count === 'number' &&
    'incomplete_results' in value &&
    typeof value.incomplete_results === 'boolean' &&
    'items' in value &&
    Array.isArray(value.items)
  ) {
    if (value.items.every((item) => isGithubItemData(item))) {
      return true;
    }

    return false;
  }

  return false;
}

function isGithubItemData(value: unknown): value is IGithubItemResponse {
  if (!isObject(value)) {
    return false;
  }

  if (
    'login' in value &&
    typeof value.login === 'string' &&
    'id' in value &&
    typeof value.id === 'number' &&
    'node_id' in value &&
    typeof value.node_id === 'string' &&
    'avatar_url' in value &&
    typeof value.avatar_url === 'string' &&
    'gravatar_id' in value &&
    typeof value.gravatar_id === 'string' &&
    'url' in value &&
    typeof value.url === 'string' &&
    'html_url' in value &&
    typeof value.html_url === 'string' &&
    'followers_url' in value &&
    typeof value.followers_url === 'string' &&
    'following_url' in value &&
    typeof value.following_url === 'string' &&
    'gists_url' in value &&
    typeof value.gists_url === 'string' &&
    'starred_url' in value &&
    typeof value.starred_url === 'string' &&
    'subscriptions_url' in value &&
    typeof value.subscriptions_url === 'string' &&
    'organizations_url' in value &&
    typeof value.organizations_url === 'string' &&
    'repos_url' in value &&
    typeof value.repos_url === 'string' &&
    'events_url' in value &&
    typeof value.events_url === 'string' &&
    'received_events_url' in value &&
    typeof value.received_events_url === 'string' &&
    'type' in value &&
    typeof value.type === 'string' &&
    'site_admin' in value &&
    typeof value.site_admin === 'boolean' &&
    'score' in value &&
    (typeof value.score === 'number' || 'null')
  ) {
    return true;
  }

  return false;
}

export function isGithubLoginData(
  value: unknown
): value is IGithubLoginResponse {
  if (!isObject(value)) {
    return false;
  }

  if (
    'login' in value &&
    typeof value.login === 'string' &&
    'id' in value &&
    typeof value.id === 'number' &&
    'node_id' in value &&
    typeof value.node_id === 'string' &&
    'avatar_url' in value &&
    typeof value.avatar_url === 'string' &&
    'gravatar_id' in value &&
    typeof value.gravatar_id === 'string' &&
    'url' in value &&
    typeof value.url === 'string' &&
    'html_url' in value &&
    typeof value.html_url === 'string' &&
    'followers_url' in value &&
    typeof value.followers_url === 'string' &&
    'following_url' in value &&
    typeof value.following_url === 'string' &&
    'gists_url' in value &&
    typeof value.gists_url === 'string' &&
    'starred_url' in value &&
    typeof value.starred_url === 'string' &&
    'subscriptions_url' in value &&
    typeof value.subscriptions_url === 'string' &&
    'organizations_url' in value &&
    typeof value.organizations_url === 'string' &&
    'repos_url' in value &&
    typeof value.repos_url === 'string' &&
    'events_url' in value &&
    typeof value.events_url === 'string' &&
    'received_events_url' in value &&
    typeof value.received_events_url === 'string' &&
    'type' in value &&
    typeof value.type === 'string' &&
    'site_admin' in value &&
    typeof value.site_admin === 'boolean' &&
    'name' in value &&
    (typeof value.name === 'string' || 'null') &&
    'company' in value &&
    (typeof value.company === 'string' || 'null') &&
    'blog' in value &&
    typeof value.blog === 'string' &&
    'location' in value &&
    (typeof value.location === 'string' || 'null') &&
    'email' in value &&
    (typeof value.email === 'string' || 'null') &&
    'hireable' in value &&
    (typeof value.hireable === 'string' || 'null') &&
    'bio' in value &&
    (typeof value.bio === 'string' || 'null') &&
    'twitter_username' in value &&
    (typeof value.twitter_username === 'string' || 'null') &&
    'public_repos' in value &&
    typeof value.public_repos === 'number' &&
    'public_gists' in value &&
    typeof value.public_gists === 'number' &&
    'followers' in value &&
    typeof value.followers === 'number' &&
    'following' in value &&
    typeof value.following === 'number' &&
    'created_at' in value &&
    typeof value.created_at === 'string' &&
    'updated_at' in value &&
    typeof value.updated_at === 'string'
  ) {
    return true;
  }

  return false;
}

// YOUTUBE
export function isYoutubeData(value: unknown): value is IYoutubeSearchResponse {
  if (!isObject(value)) {
    return false;
  }

  if (
    'kind' in value &&
    typeof value.kind === 'string' &&
    'etag' in value &&
    typeof value.etag === 'string' &&
    'nextPageToken' in value &&
    typeof value.nextPageToken === 'string' &&
    'regionCode' in value &&
    typeof value.regionCode === 'string' &&
    'pageInfo' in value &&
    typeof value.pageInfo === 'object' &&
    value.pageInfo !== null &&
    'totalResults' in value.pageInfo &&
    typeof value.pageInfo.totalResults === 'number' &&
    'resultsPerPage' in value.pageInfo &&
    typeof value.pageInfo.resultsPerPage === 'number' &&
    'items' in value &&
    Array.isArray(value.items)
  ) {
    if (value.items.every((item) => isYoutubeItemData(item))) {
      return true;
    }

    return false;
  }

  return false;
}

function isYoutubeItemData(value: unknown): value is IYoutubeItemResponse {
  if (!isObject(value)) {
    return false;
  }

  if (
    'kind' in value &&
    typeof value.kind === 'string' &&
    'etag' in value &&
    typeof value.etag === 'string' &&
    'id' in value &&
    typeof value.id === 'object' &&
    value.id !== null &&
    'kind' in value.id &&
    typeof value.id.kind === 'string' &&
    'videoId' in value.id &&
    typeof value.id.videoId === 'string' &&
    'snippet' in value &&
    typeof value.snippet === 'object' &&
    value.snippet !== null &&
    'publishedAt' in value.snippet &&
    typeof value.snippet.publishedAt === 'string' &&
    'channelId' in value.snippet &&
    typeof value.snippet.channelId === 'string' &&
    'title' in value.snippet &&
    typeof value.snippet.title === 'string' &&
    'description' in value.snippet &&
    typeof value.snippet.description === 'string' &&
    'thumbnails' in value.snippet &&
    typeof value.snippet.thumbnails === 'object' &&
    value.snippet.thumbnails !== null &&
    'default' in value.snippet.thumbnails &&
    typeof value.snippet.thumbnails.default === 'object' &&
    value.snippet.thumbnails.default !== null &&
    'url' in value.snippet.thumbnails.default &&
    typeof value.snippet.thumbnails.default.url === 'string' &&
    'width' in value.snippet.thumbnails.default &&
    typeof value.snippet.thumbnails.default.width === 'number' &&
    'height' in value.snippet.thumbnails.default &&
    typeof value.snippet.thumbnails.default.height === 'number' &&
    'medium' in value.snippet.thumbnails &&
    typeof value.snippet.thumbnails.medium === 'object' &&
    value.snippet.thumbnails.medium !== null &&
    'url' in value.snippet.thumbnails.medium &&
    typeof value.snippet.thumbnails.medium.url === 'string' &&
    'width' in value.snippet.thumbnails.medium &&
    typeof value.snippet.thumbnails.medium.width === 'number' &&
    'height' in value.snippet.thumbnails.medium &&
    typeof value.snippet.thumbnails.medium.height === 'number' &&
    'high' in value.snippet.thumbnails &&
    typeof value.snippet.thumbnails.high === 'object' &&
    value.snippet.thumbnails.high !== null &&
    'url' in value.snippet.thumbnails.high &&
    typeof value.snippet.thumbnails.high.url === 'string' &&
    'width' in value.snippet.thumbnails.high &&
    typeof value.snippet.thumbnails.high.width === 'number' &&
    'height' in value.snippet.thumbnails.high &&
    typeof value.snippet.thumbnails.high.height === 'number' &&
    'channelTitle' in value.snippet &&
    typeof value.snippet.channelTitle === 'string' &&
    'liveBroadcastContent' in value.snippet &&
    typeof value.snippet.liveBroadcastContent === 'string' &&
    'publishTime' in value.snippet &&
    typeof value.snippet.publishTime === 'string'
  ) {
    return true;
  }

  return false;
}
