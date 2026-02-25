import { API_BASE, USE_MOCK } from "./config";
import { mockClients, mockConfig, mockStats } from "./mock";
import { type Client, type ClientStat } from "./types";

export async function getClients(): Promise<Client[]> {
    if (USE_MOCK) {
        return new Promise((resolve) =>
            setTimeout(() => resolve(mockClients), 500),
        );
    }

    const res = await fetch(`${API_BASE}/clients`);
    return res.json();
}

export async function createClient(name: string) {
    if (USE_MOCK) {
        return new Promise((resolve) =>
            setTimeout(
                () =>
                    resolve({
                        config: mockConfig,
                        ip: "10.0.0.99",
                    }),
                500,
            ),
        );
    }

    const res = await fetch(`${API_BASE}/new-client`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });

    if (!res.ok) throw new Error("Failed");
    return res.json();
}

export async function viewClient(public_key: string) {
    if (USE_MOCK) {
        return { config: mockConfig };
    }

    const res = await fetch(`${API_BASE}/view/${public_key}`);
    return res.json();
}

export async function deleteClient(public_key: string) {
    if (USE_MOCK) return;

    await fetch(`${API_BASE}/delete/${public_key}`, {
        method: "DELETE",
    });
}

export async function getStats(): Promise<Record<string, ClientStat>> {
    if (USE_MOCK) {
        return mockStats;
    }

    const res = await fetch(`${API_BASE}/stats`);
    return res.json();
}
