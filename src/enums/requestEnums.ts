

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data   上传资源（图片，视频）
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export enum RequestMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum RequestCodeEnum {
  SUCCESS = 20000,
  INTERNAL_SERVER_ERROR = 30000,
  INVALID_REQUEST_METHOD = 30001,
  SESSION_TIMEOUT = 40000,
  NOT_AUTHORIZED = 40001,
  BUSINESS_EXCEPTION = 50000,
  ILLEGAL_PARAMETER = 50001
  // LOGIN_FAILURE = -1,
  // OPEN_NEW_PAGE = 2
}
