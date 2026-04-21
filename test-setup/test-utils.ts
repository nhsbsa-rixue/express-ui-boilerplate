
import { vi } from "vitest";

/**
 * Creates a mock Express Request with sensible defaults.
 * Pass overrides for any property your test needs.
 */
export function mockRequest(overrides: Partial<Req> = {}): Req {
    const req: Req = {
        route: { path: "/" },
        body: {},
        params: {},
        query: {},
        headers: {},
        session: {
            validationErrors: undefined,
            formData: undefined,
            destroy: vi.fn((cb?: (err?: Error) => void) => cb?.()),
            ...overrides.session,
        },
        t: vi.fn((key: string) => key),
        protocol: "http",
        originalUrl: "/",
        ...overrides,
    } as Req;

    return req;
}

/**
 * Creates a mock Express Response where status/redirect/json/send
 * all return `res` for chaining, and are individually assertable.
 */
export function mockResponse(): Res {
    const res: Res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        send: vi.fn().mockReturnThis(),
        redirect: vi.fn().mockReturnThis(),
        render: vi.fn().mockReturnThis(),
        renderPage: vi.fn().mockReturnThis(),
        set: vi.fn().mockReturnThis(),
        redirectPageTo: vi.fn().mockReturnThis(),
        locals: {},
    } as unknown as Res;

    return res;
}

/**
 * Creates a mock NextFunction.
 */
export function mockNext(): Next {
    return vi.fn();
}
