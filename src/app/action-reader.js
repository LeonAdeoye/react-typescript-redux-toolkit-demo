const {Client, Command} = require('amps');

const main = async () =>
{
    try
    {
        // echo '[{"type": "cake/ordered"},{"type": "cake/restocked", "payload": 10}]' | ./spark publish -topic action-dispatch-reader -server localhost:9007 -type json -proto amps
        // ./spark subscribe -server localhost:9007 -topic action-dispatch-reader -type json -proto amps
        const clientName = "action-dispatch-reader";
        const topicName = "action-dispatch-reader";
        const url = "ws://localhost:9008/amps/json";
        const client = new Client(clientName);
        await client.connect(url);
        const cmd = new Command("subscribe").topic(topicName);
        await client.execute(cmd, (message) => postMessage({messageType: "actionDispatched", actions: message.data}));
        console.log("Action dispatch reader web worker Connected to AMPS using URL: ", url);
    }
    catch (e)
    {
        console.error(e);
    }
}

main().then(() => console.log("AMPS action dispatch subscription completed."));
