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
 * List of possible sorting options for the full guide page
 */
export type FullGuideSortField = "label" | "added" | "relevance";

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
 * List of ordering options that can be used for show entries
 */
export type ShowOrdering = "series" | "overall";

/**
 * List of types that can be used for show entries
 */
export type ShowType = "episode" | "movie" | "short" | "special";

/**
 * List of available social signin providers
 */
export type SocialProvider = "deviantart" | "discord";

/**
 * List of available sprite sizes
 */
export type SpriteSize = 300 | 600;

/**
 * List of types tags in the color guide can have
 */
export type TagType = "app" | "cat" | "gen" | "spec" | "char" | "warn";

/**
 * List of available user preferences
 */
export type UserPrefKeys =
  | "cg_itemsperpage"
  | "cg_hidesynon"
  | "cg_hideclrinfo"
  | "cg_fulllstprev"
  | "cg_nutshell"
  | "cg_defaultguide"
  | "p_avatarprov"
  | "p_vectorapp"
  | "p_hidediscord"
  | "p_hidepcg"
  | "p_homelastep"
  | "ep_hidesynopses"
  | "ep_noappprev"
  | "ep_revstepbtn"
  | "a_pcgearn"
  | "a_pcgmake"
  | "a_pcgsprite"
  | "a_postreq"
  | "a_postres"
  | "a_reserve"
  | "pcg_slots";

/**
 * List of available vector apps
 */
export type VectorApp = "illustrator" | "inkscape" | "ponyscape";

/**
 * An object containing the number of entries in each color guide
 */
export interface GuideEntryCounts {
  pony: number;
  eqg: number;
  pl: number;
}

/**
 * A list of preferences for the current user (or defaults if not signed in)
 */
export interface UserPrefs {
  cg_itemsperpage: number;
  cg_hidesynon: boolean;
  cg_hideclrinfo: boolean;
  cg_fulllstprev: boolean;
  cg_nutshell: boolean;
  cg_defaultguide: GuideName | null;
  p_avatarprov: AvatarProvider;
  p_vectorapp: VectorApp | null;
  p_hidediscord: boolean;
  p_hidepcg: boolean;
  p_homelastep: boolean;
  ep_hidesynopses: boolean;
  ep_noappprev: boolean;
  ep_revstepbtn: boolean;
  a_pcgearn: boolean;
  a_pcgmake: boolean;
  a_pcgsprite: boolean;
  a_postreq: boolean;
  a_postres: boolean;
  a_reserve: boolean;
  pcg_slots: number | null;
}

/**
 * An object containing information about the connection made to the server
 */
export interface ConnectionInfo {
  /**
   * The IP address the server believes this request originated from
   */
  ip: string | null;
  /**
   * The value of the X-Forwarded-For HTTP header as received by the server
   */
  proxiedIps: string | null;
  /**
   * The value of the User-Agent HTTP header as received by the server
   */
  userAgent?: string | null;
  /**
   * Short string representing the current browser and OS used to make the request (based on user agent)
   */
  deviceIdentifier?: string | null;
}

/**
 * An array of less resource intensive appearances under the appearances key
 */
export interface SlimAppearanceList {
  appearances: SlimAppearance[];
}

/**
 * An array of appearances under the appearances key
 */
export interface AppearanceList {
  appearances: Appearance[];
}

export type Order = ErrorResponse;

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
 * The barest of properties for an appearance intended for use in autocompletion results
 */
export type AutocompleteAppearance = PreviewAppearance & {
  /**
   * The sprite that belongs to this appearance, or null if there is none
   */
  sprite: Sprite | null;
};

/**
 * Common properties of the two main Appearance schemas
 */
export type CommonAppearance = AutocompleteAppearance & {
  order: Order;
  /**
   * Indicates whether there are any cutie marks tied to this appearance
   */
  hasCutieMarks: boolean;
};

/**
 * Represents properties that belong to the slim appearance object only
 */
export interface SlimAppearanceOnly {
  characterTagNames: string[];
}

/**
 * A less heavy version of the regular Appearance schema
 */
export type SlimAppearance = CommonAppearance & SlimAppearanceOnly;

/**
 * Represents properties that belong to the full appearance object only
 */
export interface AppearanceOnly {
  created_at: IsoStandardDate;
  notes: string | null;
  tags: SlimGuideTag[];
}

/**
 * Represents an entry in the color guide
 */
export type Appearance = CommonAppearance & AppearanceOnly & ListOfColorGroups;

export interface SlimGuideTag {
  id: OneBasedId;
  /**
   * Tag name (all lowercase)
   */
  name: string;
  type?: TagType;
  synonymOf?: OneBasedId;
}

/**
 * Data related to an appearance's sprite file. The actual file is available from a different endpoint.
 */
export interface Sprite {
  /**
   * The full URL of the current sprite image
   */
  path: string;
  /**
   * The width and height of the sprite expressed in the smallest numbers possible while retaining the same aspect ratio. Useful for calculating placeholder element sizes.
   */
  aspectRatio: [number, number];
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
  colors: [Color, ...Color[]];
}

/**
 * A color entry
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
}

/**
 * The number of results to return per page
 */
export type GuidePageSize = number;

export type AppearanceToken = string;

/**
 * Contains a URL that most clients will automatically redirect to for 301 and 302 responses
 */
export type LocationHeader = string;

export interface SigninRequest {
  email: string;
  password: string;
  /**
   * When using session-based auth set to true for persistent cookies, omit or use false for session cookies
   */
  remember?: boolean;
}

export interface OauthCode {
  /**
   * The authorization code received from the provider
   */
  code: string;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * An array of major change items under the changes key
 */
export interface MajorChangeList {
  changes: MajorChange[];
}

/**
 * The details for the major change entry
 */
export interface MajorChange {
  id: OneBasedId;
  /**
   * The reason for the change
   */
  reason: string;
  /**
   * The appearance the change was made on
   */
  appearance: PreviewAppearance;
  /**
   * The identifier for the user who created the appearance
   */
  user: BarePublicUser | null;
  createdAt: IsoStandardDate;
}

/**
 * The number of results to return per page
 */
export type GuideMajorChangesPageSize = number;

export interface ErrorResponse {
  /**
   * An error message describing what caused the request to fail
   */
  message: string;
}

/**
 * An ISO 8601 standard compliant date as a string
 */
export type IsoStandardDate = string;

export type ValidationErrorResponse = {
  /**
   * A map containing error messages for each field that did not pass validation
   */
  errors: {
    [k: string]: [string, ...string[]];
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

/**
 * Represents a show entry for showing in paginated lists, only containing the essential properties
 */
export interface ShowListItem {
  id: OneBasedId;
  type: ShowType;
  /**
   * Title of the entry, optionally including prefixes denoting the franchise (e.g. Equestria Girls)
   */
  title: string;
  /**
   * Season number, `null` for any types other than `episode`
   */
  season: number | null;
  /**
   * Episode number of the first episode this entry represents, `null` for any types other than `episode`. See `parts` for more information.
   */
  episode: number | null;
  /**
   * Indicates how many parts this entry represents, used for displaying rangesfor two part entries, e.g. the episodes S1E1-2 would be represented as one entry with `{ season: 1, episode: 1, parts: 2, ... }`, while `null` or `1` indicates the entry represents a single episode.
   */
  parts: number | null;
  /**
   * Overall number placing entries in a coherent order relative to each other (not a fixed value)\n\nFor episodes this is the overall episode number, for all other entry types this is mostly a sequential value incremented for each new entry.
   */
  no: number | null;
  generation: MlpGeneration;
  airs: IsoStandardDate;
}

/**
 * An array of public show entries under the show key
 */
export interface ShowList {
  show: ShowListItem[];
}

/**
 * The number of results to return per page
 */
export type ShowListPageSize = number;

/**
 * Contains publicly accessible properties of useful links
 */
export interface PublicUsefulLink {
  id: OneBasedId;
  /**
   * The URL this link points to
   */
  url: string;
  /**
   * The link text to display on the page
   */
  label: string;
  /**
   * The title text associated with the link providing additional context about why it's useful
   */
  title?: string;
  order: Order;
}

/**
 * Contains all stored properties of useful links
 */
export type UsefulLink = PublicUsefulLink & {
  /**
   * The minimum role required to be able to see this link in application the sidebar
   */
  minrole: string;
};

/**
 * Represents the absolute minimum info necessary to get a user profile URL
 */
export interface BarePublicUser {
  id: number;
  name: string;
  role: Role;
}

export type PublicUser = BarePublicUser & {
  avatarUrl: string | null;
  avatarProvider: AvatarProvider;
};

export type User = PublicUser & {
  email: string | null;
  role: DatabaseRole;
};

export interface Token {
  id: number;
  /**
   * Name of the token, either generated (from OS and browser version) or user-supplied if renamed
   */
  name: string;
  lastUsedAt: IsoStandardDate;
  createdAt: IsoStandardDate;
}

export interface GuideFullListGroupItem {
  name?: string;
  appearanceIds: OneBasedId[];
}

export interface GuideFullListGroups {
  groups: GuideFullListGroupItem[];
}

export type AppearancePreviewData =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string];

/**
 * Minimal set of properties to display an appearance link, optinally with a colored preview
 */
export interface PreviewAppearance {
  id: ZeroBasedId;
  /**
   * The name of the appearance
   */
  label: string;
  previewData?: AppearancePreviewData;
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
 * An object containing information related to the verion of this appilcation that's currently running on the server
 */
export interface CommitData {
  /**
   * Abbreviated commit ID of the backend application, indicating the version currently deployed on the server (at least 7 characters long)
   */
  commitId: string | null;
  /**
   * Date at which the commit currently deployed on the server was authored
   */
  commitTime: IsoStandardDate | null;
}

/**
 * List of supported application-wide settings
 */
export type AppSettings = "dev_role_label";



export interface GetAppearancesRequest {
  guide: GuideName
  page?: PageNumber
  size?: GuidePageSize
  q?: QueryString
}
export interface GetAppearancesAllRequest {
  guide: GuideName
  sort: FullGuideSortField
}
export interface GetAppearancesIdColorGroupsRequest {
  id: ZeroBasedId
}
export interface GetAppearancesIdSpriteRequest {
  id: ZeroBasedId
  size?: SpriteSize
  token?: AppearanceToken
}
export interface GetAppearancesIdPreviewRequest {
  id: ZeroBasedId
  token?: AppearanceToken
}
export interface GetAppearancesPinnedRequest {
  guide: GuideName
}
export interface GetAppearancesAutocompleteRequest {
  guide: GuideName
  q: QueryString
}
export type PostUsersSigninRequest = SigninRequest
export interface GetUsersOauthSigninProviderRequest {
  provider: SocialProvider
}
export type PostUsersOauthSigninProviderRequest = OauthCode & {
  provider: SocialProvider
}

export type PostUsersRequest = RegistrationRequest

export interface GetColorGuideMajorChangesRequest {
  guide: GuideName
  page?: PageNumber
  size?: GuideMajorChangesPageSize
}

export interface GetShowRequest {
  types: ShowType[]
  order?: ShowOrdering
  page?: PageNumber
  size?: ShowListPageSize
}

export interface GetUserPrefsMeRequest {
  keys?: UserPrefKeys[]
}

export interface GetUsersDaUsernameRequest {
  username: string
}
export interface GetUsersIdRequest {
  id: OneBasedId
}


export interface DeleteUsersTokensIdRequest {
  id: number
}
export type GetAboutConnectionResult = ConnectionInfo & CommitData;

export type GetAboutMembersResult = PublicUser[];

export type GetAppearancesResult = AppearanceList & PageData;

export type GetAppearancesAllResult = SlimAppearanceList & GuideFullListGroups;

export type GetAppearancesIdColorGroupsResult = ListOfColorGroups;

export type GetAppearancesIdSpriteResult = any
export type GetAppearancesIdSprite302 = any
export type GetAppearancesIdPreviewResult = any
export type GetAppearancesPinnedResult = Appearance[];

export type GetAppearancesAutocompleteResult = AutocompleteAppearance[];

export interface PostUsersSigninResult {
  token?: string;
}

export type PostUsersSignin204 = any
export type GetUsersOauthSigninProviderResult = any
export interface PostUsersOauthSigninProviderResult {
  token?: string;
}

export type PostUsersOauthSigninProvider204 = any
export type GetUsersResult = BarePublicUser[];

export interface PostUsersResult {
  token?: string;
}

export type PostUsers204 = any
export interface GetColorGuideResult {
  entryCounts: GuideEntryCounts;
}

export type GetColorGuideMajorChangesResult = MajorChangeList & PageData;

export type GetSanctumCsrfCookieResult = any
export type GetShowResult = ShowList & PageData;

export type GetUsefulLinksSidebarResult = PublicUsefulLink[];

export type GetUserPrefsMeResult = UserPrefs;

export type GetUsersMeResult = User;

export type GetUsersDaUsernameResult = PublicUser;

export type GetUsersIdResult = PublicUser;

export type PostUsersSignoutResult = any
export interface GetUsersTokensResult {
  /**
   * ID of the token used to make this request. Will be null if the request is authenticated through CookieAuth
   */
  currentTokenId: number | null;
  /**
   * A list of tokens that belong to the user
   */
  tokens: [Token, ...Token[]];
}

export type DeleteUsersTokensIdResult = any