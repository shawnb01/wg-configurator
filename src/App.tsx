import { useState, useEffect } from "react";
import {
  getClients,
  createClient,
  viewClient,
  deleteClient,
  getStats
} from "./api";

import {type Client, type ClientStat} from "./types";

function App() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [config, setConfig] = useState("");

  const [stats, setStats] = useState<Record<string, ClientStat>>({});

  async function load() {
    const data = await getClients();
    const statsData = await getStats();
    setClients(data);
    setStats(statsData);
  }

  useEffect(() => {
    load();
  }, [])

  async function handleCreate(){
    const data = await createClient(name);
    setName("");
    setConfig(data.config);
    load();
  }

  async function handleView(file: string){
    const data = await viewClient(file);
    setConfig(data.config);
  }

  async function handleDelete(public_key: string){
    await deleteClient(public_key);
    load();
  }

  return (
    <div style={{padding: 40}}>
      <h2>WireGuard Control Panel</h2>

      <input placeholder="device name" type="text" onChange={(e) => setName(e.target.value)}/>
      <button onClick={handleCreate}>Create</button>

      <h3>Clients</h3>
      <ul>
        {clients.map((client) => {
        const stat = stats[client.public_key];

        
          return (
            <li key={client.public_key}>
              <strong>{client.name}</strong> ({client.ip})

              <button onClick={() => handleView(client.name)}>View</button>
              <button onClick={() => handleDelete(client.public_key)}>Delete</button>

              {stat && (
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  RX: {(stat.rx / 1024).toFixed(1)} KB |
                  TX: {(stat.tx / 1024).toFixed(1)} KB
                </div>
              )}
            </li>
          )
        }
      )}
      </ul>

      <h3>Config</h3>
      <pre>{config}</pre>
    </div>
  )
}

export default App;