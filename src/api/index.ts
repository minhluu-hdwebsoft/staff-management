import { Api, createApiClient } from "@hdwebsoft/intranet-api-sdk";

class SessionStorage {
  // store key/value pair
  public async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  // get value of
  public async get(key: string): Promise<string> {
    const value = localStorage.getItem(key);
    return value || "";
  }

  // delete key
  public async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

const sessionStorage = new SessionStorage();
const config = {
  baseUrl: "https://intranet.dev2.hdwebsoft.co/v1",
  authSessionKey: "AUTH_SESSION_KEY",
  session: sessionStorage,
};

const client = createApiClient(config);
const api = new Api(client);

export default api;
