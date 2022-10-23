import axios from 'axios';

import { AUTH_API, CLIENT_ID } from '@dashy/secrets';
import qs = require('qs');
import { Logger } from '../util/logger/logger';
import { AxiosResponse } from 'axios';

class AuthLinkService {
  clientId: string;
  clientSecret: string;
  url: string;

  constructor(url: string, clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.url = url;
  }

  getAccess = async (code: string) => {
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      code: code,
    };
    const res = (await axios
      .post(this.url + '/token', qs.stringify(data))
      .catch((err) => {
        Logger.error(err);
      })) as AxiosResponse;
    return res;
  };

  refreshAccess = async (refreshToken: string) => {
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    const res = (await axios
      .post(this.url + '/token', qs.stringify(data))
      .catch((err) => {
        Logger.error(err);
      })) as AxiosResponse;
    return res.data;
  };

  revokeToken = async (token: string) => {
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      token: token,
    };
    await axios
      .post(this.url + '/token/revoke', qs.stringify(data))
      .catch((err) => {
        Logger.error(err);
      });
  };

  getUser = async (accessToken: string) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = (await axios
      .get(this.url + '/users/@me', { headers })
      .catch((err) => {
        Logger.error(err);
      })) as AxiosResponse;
    return res.data;
  };
}

export const authLinkService = new AuthLinkService(
  AUTH_API.url,
  CLIENT_ID,
  AUTH_API.clientSecret
);
