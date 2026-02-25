export type ClientStat = {
    last_handshake: number;
    rx: number;
    tx: number;
}

export type ClientStats = Record<string, ClientStat>;

export type Client = {
    name: string;
    public_key: string;
    ip: string;
}