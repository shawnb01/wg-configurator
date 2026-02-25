export const mockClients = [
    {
        name: "laptop",
        public_key: "MOCK_PUBLIC_KEY_1",
        ip: "10.0.0.10",
    },
    {
        name: "phone",
        public_key: "MOCK_PUBLIC_KEY_2",
        ip: "10.0.0.11",
    },
    {
        name: "sidewinder",
        public_key: "MOCK_PUBLIC_KEY_3",
        ip: "10.0.0.12",
    },
];

export const mockConfig = `[Interface]
PrivateKey = MOCK_PRIVATE_KEY
Address = 10.0.0.10/24
DNS = 192.168.50.3

[Peer]
PublicKey = MOCK_SERVER_KEY
Endpoint = 1.2.3.4:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`;

export const mockStats = {
    "MOCK_PUBLIC_KEY_1": {
        rx: 165192,
        tx: 4891321891,
        last_handshake: 1234567890,
    },
    "MOCK_PUBLIC_KEY_2": {
        rx: 61516198,
        tx: 231871,
        last_handshake: 1234567890,
    },
    "MOCK_PUBLIC_KEY_3": {
        rx: 1898943,
        tx: 15612198,
        last_handshake: 1234567890,
    }
};