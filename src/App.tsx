import { useState, useEffect } from "react";
import {
    getClients,
    createClient,
    viewClient,
    deleteClient,
    getStats,
} from "./api";

import { type Client, type ClientStat } from "./types";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./components/ui/dialog";

function App() {
    const [clients, setClients] = useState<Client[]>([]);
    const [name, setName] = useState("");
    const [config, setConfig] = useState("");
    const [stats, setStats] = useState<Record<string, ClientStat>>({});

    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeClient, setActiveClient] = useState<Client | null>(null);

    async function load() {
        const data = await getClients();
        const statsData = await getStats();
        setClients(data);
        setStats(statsData);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreate() {
        const data = await createClient(name);

        setName("");
        setConfig(data.config);

        setActiveClient({
            name: data.name,
            public_key: data.public_key,
            ip: data.ip,
        });

        setDialogOpen(true);

        load();
    }

    async function handleView(client: Client) {
        const data = await viewClient(client.public_key);
        setConfig(data.config);
        setActiveClient(client);
        setDialogOpen(true);
    }

    async function handleDelete(public_key: string) {
        await deleteClient(public_key);
        setDialogOpen(false);
        load();
    }

    async function handleDownload(public_key: string) {
        const data = await viewClient(public_key);
        const blob = new Blob([data.config], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.name}.conf`;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-muted p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    <h1 className="text-3xl font-bold tracking-tight">
                        WireGuard Control Panel
                    </h1>

                    <Card>
                        <CardHeader>
                            <CardTitle>Create Client</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <Input
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Client name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Button onClick={handleCreate}>Create</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Clients</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {clients.map((client) => (
                                <div
                                    key={client.public_key}
                                    className="flex justify-between items-center border p-4 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {client.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {client.ip}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        {stats[client.public_key] && (
                                            <p className="text-sm text-muted-foreground">
                                                RX:{" "}
                                                {(
                                                    stats[client.public_key]
                                                        .rx / 1024
                                                ).toFixed(1)}{" "}
                                                KB | TX:{" "}
                                                {(
                                                    stats[client.public_key]
                                                        .tx / 1024
                                                ).toFixed(1)}{" "}
                                                KB
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary">
                                            Online
                                        </Badge>
                                        <Button
                                            size="sm"
                                            onClick={() => handleView(client)}
                                        >
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Client Config</DialogTitle>
                                <DialogDescription>
                                    {activeClient && (
                                        <>
                                            WireGuard configuration for{" "}
                                            <strong>{activeClient.name}</strong>
                                            .
                                        </>
                                    )}
                                </DialogDescription>
                            </DialogHeader>

                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                {config}
                            </pre>

                            <DialogFooter>
                                {activeClient && (
                                    <>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() =>
                                                handleDownload(
                                                    activeClient.public_key,
                                                )
                                            }
                                        >
                                            Download
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(
                                                    activeClient.public_key,
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
