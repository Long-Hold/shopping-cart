import { expect, afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve ({ ok: true, json: () => Promise.resolve([]) })),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});