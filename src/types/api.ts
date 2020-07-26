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
 * DO NOT EDIT THIS FILE DIRECTLY! - GENERATE IT USING yarn run api:types INSTEAD
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

/**
 * List of supported avatar providers
 */
export type AvatarProvider = "deviantart" | "discord" | "gravatar";

/**
 * List of available color guides
 */
export type GuideName = "pony" | "eqg" | "pl";

/**
 * List of recognized MLP generations
 */
export type MlpGeneration = "pony" | "pl";

/**
 * List of roles values that can be stored by the backend
 */
export type DatabaseRole = "user" | "member" | "assistant" | "staff" | "admin" | "developer";

/**
 * List of roles values that can be publicly displayed
 */
export type Role = "user" | "member" | "assistant" | "staff" | "admin";

/**
 * List of types that can be used for show entries
 */
export type ShowType = "episode" | "movie" | "short" | "special";

/**
 * List of types tags in the color guide can have
 */
export type TagType = "app" | "cat" | "gen" | "spec" | "char" | "warn";

export type SlimAppearanceList = ErrorResponse & {
  appearances: SlimAppearance[];
};

/**
 * An array of appearances under the appearances key
 */
export interface AppearanceList {
  appearances: Appearance[];
}

/**
 * Optional parameter that indicates whether you would like to get preview image data with the request. Typically unneccessary unless you want to display a temporary image while the larger image loads.
 */
export type PreviewsIndicator = true;

/**
 * Used for displaying items in a specific order. The API guarantees that array return values are sorted in ascending order based on this property.
 */
export type Order = number;

/**
 * Array of color groups under the `colorGroups` key
 */
export interface ListOfColorGroups {
  /**
   * Array of color groups belonging to an appearance (may be an empty array).
   */
  colorGroups: ColorGroup[];
}

/**
 * Common properties of the two Appearance schemas
 */
export interface CommonAppearance {
  id: ZeroBasedId;
  /**
   * The name of the appearance
   */
  label: string;
  order: Order;
  /**
   * The sprite that belongs to this appearance, or null if there is none
   */
  sprite: Sprite;
  /**
   * Indicates whether there are any cutie marks tied to this appearance
   */
  hasCutieMarks: boolean;
}

/**
 * A less heavy version of the regular Appearance schema
 */
export type SlimAppearance = CommonAppearance;

/**
 * Represents an entry in the color guide
 */
export type Appearance = CommonAppearance & ListOfColorGroups;

export interface SlimGuideTag {
  id?: OneBasedId;
  /**
   * Tag name (all lowercase)
   */
  name?: string;
  type?: TagType;
  [k: string]: any;
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
   * Data URI for a small preview image with matching proportions to the actual image, suitable for displaying as a preview while the full image loads. May not be sent based on the request parameters.
   */
  preview?: string;
}

/**
 * Groups a list of colors
 */
export interface ColorGroup {
  id: OneBasedId;
  /**
   * The name of the color group
   */
  label: string;
  order: Order;
  /**
   * The list of colors inside this group
   */
  colors: Color[];
}

/**
 * A color entry. Colors may link to other colors, in which case `linkedTo` will be set to the link target, but `hex` will always point to the value that should be displayed.
 */
export interface Color {
  id: OneBasedId;
  /**
   * The name of the color
   */
  label: string;
  order: Order;
  /**
   * The color value in uppercase hexadecimal form, including a # prefix
   */
  hex: string;
  /**
   * This field used to indicate if this color was linked to another color, however, this feature was removed and this field now only ever returns null
   */
  linkedTo?: Color;
}

export type GuidePageSize = number;

export type SpriteSize = 300 | 600;

export type SpriteHash = string;

export type AppearanceToken = string;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface ErrorResponse {
  /**
   * An error message describing what caused the request to fail
   */
  message: string;
}

export type ValidationErrorResponse = {
  /**
   * A map containing error messages for each field that did not pass validation
   */
  errors: {
    [k: string]: string[];
  };
} & ErrorResponse;

/**
 * A query parameter used for specifying which page is currently being displayed
 */
export type PageNumber = number;

export type File = string;

export type SVGFile = string;

export type QueryString = string;

export type OneBasedId = number;

export type ZeroBasedId = number;

export type PublicUser = ErrorResponse & {
  id: number;
  name: string;
  /**
   * The publicly visible role for the user
   */
  role: Role;
  avatarUrl: string;
  avatarProvider: AvatarProvider;
  /**
   * Hashed version of the e-mail address used in case there is no available avatarUrl to allow loading the Gravatar fallback
   */
  emailHash?: string;
};

export type User = PublicUser & {
  name: string;
  email: string;
  /**
   * The database-level role for the user
   */
  role: DatabaseRole;
};

export interface Token {
  id: number;
  /**
   * Name of the token, either generated (from OS and browser version) or user-supplied if renamed
   */
  name: string;
  lastUsedAt: string;
  createdAt: string;
}

export interface PageData {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

/**
 * List of supported application-wide settings
 */
export type AppSettings = "dev_role_label";

export interface GetAppearancesRequest {
  guide: GuideName
  page: PageNumber
  size: GuidePageSize
  q: QueryString
  previews: PreviewsIndicator
}
export interface GetAppearancesAllRequest {
  guide: GuideName
  previews: PreviewsIndicator
}
export interface GetAppearancesIdColorGroupsRequest {
  id: ZeroBasedId
}
export interface GetAppearancesIdSpriteRequest {
  id: ZeroBasedId
  size: SpriteSize
  token: AppearanceToken
  hash: SpriteHash
}
export interface GetAppearancesIdPreviewRequest {
  id: ZeroBasedId
  token: AppearanceToken
}
export type PostUsersLoginRequest = LoginRequest
export type PostUsersRequest = RegistrationRequest
export interface GetSanctumCsrfCookieRequest {
}
export interface GetUsersMeRequest {
}
export interface GetUsersUsernameRequest {
  username: string
}
export interface PostUsersLogoutRequest {
}
export interface GetUsersTokensRequest {
}
export interface DeleteUsersTokensIdRequest {
  id: number
}
export type GetAppearancesResult = AppearanceList & PageData;

export type GetAppearancesAllResult = SlimAppearanceList;

export type GetAppearancesIdColorGroupsResult = ListOfColorGroups;

export type GetAppearancesIdSpriteResult = any
export type GetAppearancesIdPreviewResult = any
export interface PostUsersLoginResult {
  token?: string;
}

export type PostUsersLogin204 = any
export interface PostUsersResult {
  token?: string;
}

export type PostUsers204 = any
export type GetSanctumCsrfCookieResult = any
export type GetUsersMeResult = User;

export type GetUsersUsernameResult = PublicUser;

export type PostUsersLogoutResult = any
export interface GetUsersTokensResult {
  /**
   * ID of the token used to make this request. Will be null if the request is authenticated through CookieAuth
   */
  currentTokenId: number;
  /**
   * A list of tokens that belong to the user
   */
  tokens: Token[];
}

export type DeleteUsersTokensIdResult = any