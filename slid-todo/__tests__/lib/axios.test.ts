import { instance } from "@/lib/axios";
import { useLoginStore } from "@/stores/use-login-store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "@jest/globals";
jest.mock("@/stores/use-login-store");

describe("Axios Instance", () => {
  let mockAxios: MockAdapter;
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`;

  beforeEach(() => {
    mockAxios = new MockAdapter(instance);
    jest.clearAllMocks();

    Object.defineProperty(window, "location", {
      configurable: true,
      value: { href: "" },
      writable: true,
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  describe("Request Interceptor", () => {
    it("액세스 토큰이 있으면 Authorization 헤더에 추가한다", async () => {
      const mockAccessToken = "test-access-token";
      (useLoginStore.getState as jest.Mock).mockReturnValue({
        accessToken: mockAccessToken,
      });

      mockAxios.onGet("/test").reply((config) => {
        expect(config.headers?.Authorization).toBe(`Bearer ${mockAccessToken}`);
        return [200, {}];
      });

      await instance.get("/test");
    });

    it("액세스 토큰이 없으면 Authorization 헤더를 추가하지 않는다", async () => {
      (useLoginStore.getState as jest.Mock).mockReturnValue({
        accessToken: null,
      });

      mockAxios.onGet("/test").reply((config) => {
        expect(config.headers?.Authorization).toBeUndefined();
        return [200, {}];
      });

      await instance.get("/test");
    });
  });

  describe("Response Interceptor", () => {
    describe("토큰 갱신", () => {
      it("토큰 갱신 실패 시 로그인 페이지로 리다이렉트한다", async () => {
        const mockLogout = jest.fn();
        (useLoginStore.getState as jest.Mock).mockReturnValue({
          accessToken: "old-token",
          refreshToken: "refresh-token",
          logout: mockLogout,
        });

        mockAxios.onGet("/test").replyOnce(401);

        mockAxios.onPost(`${BASE_URL}/auth/refresh`).replyOnce(401);

        try {
          await instance.get("/test");
        } catch (error) {
          expect(window.location.href).toBe("/login");
          expect(mockLogout).toHaveBeenCalled();
        }
      });
    });

    describe("네트워크 에러 처리", () => {
      it("네트워크 에러 발생 시 적절한 에러 메시지를 반환한다", async () => {
        mockAxios.onGet("/test").networkError();

        try {
          await instance.get("/test");
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toBe("네트워크 연결을 확인해주세요.");
          }
        }
      });
    });

    it("일반 에러는 그대로 전달한다", async () => {
      const errorResponse = {
        status: 400,
        data: { message: "Bad Request" },
      };

      mockAxios.onGet("/test").reply(400, errorResponse);

      try {
        await instance.get("/test");
        fail("에러가 발생해야 합니다");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data).toEqual(errorResponse);
        }
      }
    });
  });

  describe("Instance Configuration", () => {
    it("기본 설정이 올바르게 되어있다", () => {
      expect(instance.defaults.baseURL).toBe(BASE_URL);
      expect(instance.defaults.timeout).toBe(5000);
      expect(instance.defaults.headers["Content-Type"]).toBe("application/json");
    });
  });
});
