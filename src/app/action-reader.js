const {Client, Command} = require('amps');

const clientName = "action-dispatch-processor";
const url = "ws://localhost:9008/amps/json";
const client = new Client(clientName);

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', async (event) =>
{
    try
    {
        client.publish('action-dispatch-response', event.data);
    }
    catch (e)
    {
        console.log(e);
    }
});

const main = async () =>
{
    try
    {
        // echo '[{"type": "cake/ordered"},{"type": "cake/restocked", "payload": 10}]' | ./spark publish -topic action-dispatch-request -server localhost:9007 -type json -proto amps
        // ./spark subscribe -server localhost:9007 -topic action-dispatch-response -type json -proto amps
        await client.connect(url);
        const cmd = new Command("subscribe").topic("action-dispatch-request");
        await client.execute(cmd, (message) =>
        {
            postMessage({messageType: "actionDispatched", actions: message.data});
        });
    }
    catch (e)
    {
        console.log(e);
    }
};


main().then(() => console.log("AMPS action dispatch subscription completed."));
