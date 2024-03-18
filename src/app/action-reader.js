const {Client, Command} = require('amps');

const main = async () =>
{
    try
    {
        const clientName = "action-dispatch-reader";
        const topicName = "action-dispatch-reader";
        const url = "ws://localhost:9008/amps/json";
        const client = new Client(clientName);
        await client.connect(url);
        const cmd = new Command("subscribe").topic(topicName);
        await client.execute(cmd, (message) => postMessage({messageType: "actionDispatched", action: message.data}));
        console.log("Action dispatch reader web worker Connected to AMPS using URL: ", url);
    }
    catch (e)
    {
        console.error(e);
    }
}

main().then(() => console.log("AMPS action dispatch subscription completed."));
