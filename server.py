import asyncio
import websockets

# Set pentru a păstra toți clienții conectați
clients = set()

async def handler(ws):
    clients.add(ws)
    try:
        # Așteaptă mesaje de la client și le redirecționează către ceilalți
        async for message in ws:
            for client in clients:
                if client != ws:
                    await client.send(message)
    finally:
        clients.remove(ws)

async def main():
    print("Serverul WebSocket rulează la ws://localhost:8765")
    # Pornirea serverului WebSocket pe localhost:8765
    async with websockets.serve(handler, "localhost", 8765):
        await asyncio.Future()  # Run forever

asyncio.run(main())