import { jest, beforeAll, afterEach } from "@jest/globals";

beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  jest.resetModules();
  document.body.innerHTML = "";
  window.alert.mockClear();
});
