import { Client } from "discord.io";
import { Command } from "./command";

export class Hello extends Command {

    public name: string = "hello";

    constructor(client: Client) {
        super(client);
    }

    public run(user: string, userID: string, channelID: string, message: string, event: object): void {
        this.client.sendMessage({
            message: "Hello, World!",
            to: channelID,
        });
    }

    public start() {
        return;
    }

}
