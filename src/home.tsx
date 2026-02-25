import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "./components/ui/input";

function Home() {
    return (
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
                        />
                        <Button>Create</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Clients</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center border p-4 rounded-lg">
                            <div>
                                <p className="font-medium">laptop</p>
                                <p className="text-sm text-muted-foreground">
                                    10.0.0.3
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Badge variant="secondary">Online</Badge>
                                <Button size="sm">Download</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Home;
