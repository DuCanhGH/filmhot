import { describe, test } from "vitest";
import { render, act } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { StrictMode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

describe("render <App />", () => {
  beforeAll(() => {
    Object.defineProperty(window, "scrollTo", {
      value: (x: number, y: number) => {
        document.documentElement.scrollLeft = x;
        document.documentElement.scrollTop = y;
      },
      writable: true,
    });
  });
  test("render without exploding", async () => {
    await act(async () => {
      render(
        <StrictMode>
          <HelmetProvider>
            <MemoryRouter>
              <SWRConfig
                value={{
                  revalidateOnFocus: false,
                  shouldRetryOnError: false,
                }}
              >
                <Helmet
                  defaultTitle="FilmHot - AdFree Movie / Anime Watching Website"
                  titleTemplate="%s - Filmhot"
                  prioritizeSeoTags
                />
                <App />
              </SWRConfig>
            </MemoryRouter>
          </HelmetProvider>
        </StrictMode>,
      );
    });
  });
});
