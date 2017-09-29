import { Client } from "discord.io";
import * as fs from "fs";
import { Command } from "./commands/command";
import { Hello } from "./commands/hello";
import * as Reactions from "./utils/reactions";
const config = require("./config.json");

interface ICSBotParams {
    autorun: boolean;
    token: string;
}

interface ICommand {
    name: string;
    run(user: string, userID: string, channelID: string, message: string): string;
    start(): undefined;
}

export class CSBot {

    private client: Client;
    private commands: Command[] = [
        new Hello(this.client),
    ];
    private triggerChar: string = "!";

    constructor(params: ICSBotParams) {
        this.client = new Client({ autorun: params.autorun, token: params.token });

        this.client.on("ready", () => {
            console.log("Bot ready!");
        });

        const thing = this;

        this.client.on("message", (user: string, userID: string, channelID: string, message: string, event: object) => {

            if (user === "362752151325376512") { return; } // This way it doesn't read it's own messages

            // console.log("Message received!");
            // console.log(`User: ${user}\nUser ID: ${userID}\nChannel ID: ${channelID}\nMessage: ${message}\n\n`);
            // thing.client.sendMessage({ to: channelID,  message });

            thing.commands.map((command: Command) => {
                if (message.startsWith(thing.triggerChar) &&
                    message.substring(thing.triggerChar.length).startsWith(command.name)) {
                    try {
                        command.run(user, userID, channelID, message, event);
                        // Response will be handled on a per-command basis.
                     } catch (e) {
                        thing.client.addReaction({
                            channelID,
                            messageID: event.d.id,
                            reaction: Reactions.default.NO,
                        });
                    }
                }
            });
        });

        this.client.on("disconnect", () => { this.client.connect(); });

    }
}
