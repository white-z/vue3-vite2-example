import http from '../utils/http';

class API {
  static getText():Promise<any> {
    return http('get', '/api/get_text');
  }
}

export default API;
