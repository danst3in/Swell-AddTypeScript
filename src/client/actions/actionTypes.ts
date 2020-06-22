// BUSINESS LOGIC ACTIONS
export const REQRES_CLEAR = "REQRES_CLEAR";
export const REQRES_ADD = "REQRES_ADD";
export const REQRES_DELETE = "REQRES_DELETE";
export const REQRES_UPDATE = "REQRES_UPDATE";

export const GET_HISTORY = "GET_HISTORY";
export const DELETE_HISTORY = "DELETE_HISTORY";
export const CLEAR_HISTORY = "CLEAR_HISTORY";

export const GET_COLLECTIONS = "GET_COLLECTIONS";
export const DELETE_COLLECTION = "DELETE_COLLECTION";
export const COLLECTION_TO_REQRES = "COLLECTION_TO_REQRES";
export const COLLECTION_ADD = "COLLECTION_ADD";

export const SET_COMPOSER_WARNING_MESSAGE = "SET_COMPOSER_WARNING_MESSAGE";

export const SET_NEW_REQUEST_FIELDS = "SET_NEW_REQUEST_FIELDS";
export const SET_NEW_REQUEST_HEADERS = "SET_NEW_REQUEST_HEADERS";
export const SET_NEW_REQUEST_STREAMS = "SET_NEW_REQUEST_STREAMS";
export const SET_NEW_REQUEST_BODY = "SET_NEW_REQUEST_BODY";
export const SET_NEW_REQUEST_COOKIES = "SET_NEW_REQUEST_COOKIES";
export const SET_NEW_REQUEST_SSE = "SET_NEW_REQUEST_SSE";

export const SET_CURRENT_TAB = "SET_CURRENT_TAB";

export const SET_CHECKS_AND_MINIS = "SET_CHECKS_AND_MINIS";

// Describing the shape of the UI's slice of state
export interface UIState {
  warningIsDisplayed: boolean;
  composerDisplay: "Request" | "Warning";
}

//UI ACTIONS
export const SHOW_WARNING = "SHOW_WARNING";
export const HIDE_WARNING = "HIDE_WARNING";
export const SET_COMPOSER_DISPLAY = "SET_COMPOSER_DISPLAY";

// Describing the different UI ACTION NAMES available
export interface ShowWarningAction {
  type: typeof SHOW_WARNING;
}

export interface HideWarningAction {
  type: typeof HIDE_WARNING;
}

export interface SetComposerDisplayAction {
  type: typeof SET_COMPOSER_DISPLAY;
  payload: string;
}

export type UIActionTypes =
  | ShowWarningAction
  | HideWarningAction
  | SetComposerDisplayAction;