/* tslint:disable */
/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * DO NOT EDIT THIS FILE DIRECTLY! - GENERATE IT USING npm run gen-api-types INSTEAD
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export interface ServerResponse {
  /**
   * Indicates whether the request was successful
   */
  status: boolean;
  /**
   * A translation key pointing to a message that explains the outcome of the request, typically used for errors
   */
  message?: string;
}

/**
 * A query parameter used for specifying which page is currently being displayed
 */
export type PageNumber = number;

export type File = string;

export interface PageData {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export type PagedServerResponse = ServerResponse & PageData;

/**
 * Contains information about the server's current revision
 */
export interface GitInfo {
  commitId: string;
  commitTime: string;
}

/**
 * Git revision information under the git key
 */
export interface ValueOfGitInfo {
  git: (GitInfo)[];
}

/**
 * Represents an entry in the color guide
 */
export interface Appearance {
  id: number;
  /**
   * The name of the appearance
   */
  label: string;
  added: string;
  notes: string;
  /**
   * The sprite that belongs to this appearance, or null if there isn't one
   */
  sprite: Sprite;
  /**
   * Indicates whether there are any cutie marks tied to this appearance
   */
  hasCutieMarks?: boolean;
}

/**
 * Data related to an appearance's sprite file. The actual file is available from a different endpoint.
 */
export interface Sprite {
  /**
   * MD5 hash of the current sprite image
   */
  hash: SpriteHash;
  /**
   * Small preview image with matching proportions to the actual image, suitable for displaying as a preview while the full image loads
   */
  preview: string;
}

/**
 * An array of appearances under the appearances key
 */
export interface ArrayOfAppearances {
  appearances: (Appearance)[];
}

export type GuideName = 'pony' | 'eqg';

export type SpriteSize = 300 | 600;

export type SpriteHash = string;

export type AppearanceToken = string;

/**
 * Represents an authenticated user
 */
export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
  avatarProvider: AvatarProvider;
}

/**
 * List of roles a user can have
 */
export type UserRole = 'guest' | 'user' | 'member' | 'assistant' | 'staff' | 'admin' | 'developer';

/**
 * List of supported avatar providers
 */
export type AvatarProvider = 'deviantart' | 'discord';

/**
 * A user's data under the user key
 */
export interface ValueOfUser {
  user: (User)[];
  /**
   * If this value is true the DeviantArt access token expired and the backend is updating it in the background. Future requests should be made to the appropriate endpoint periodically to check whether the session update was successful and the user should be logged out if it wasn't.
   */
  sessionUpdating: boolean;
}

export interface AppControllersApiAboutControllerServerRequest {
}
export type AppControllersApiAboutControllerServerResult = ServerResponse & ValueOfGitInfo;

export interface AppControllersApiAppearancesControllerQueryPublicRequest {
  guide: GuideName
  page: PageNumber
  q: string
}
export type AppControllersApiAppearancesControllerQueryPublicResult = PagedServerResponse &
  ArrayOfAppearances;

export interface AppControllersApiAppearancesControllerSpriteRequest {
  id: number
  size: SpriteSize
  token: AppearanceToken
  hash: SpriteHash
}
export type AppControllersApiAppearancesControllerSpriteResult = any
export interface AppControllersApiUsersControllerMeRequest {
}
export type AppControllersApiUsersControllerMeResult = ServerResponse & ValueOfUser;
