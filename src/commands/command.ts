import { Client } from "discord.io";

export abstract class Command {

	public name: string;
	protected client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	public abstract run(user: string, userID: string, channelID: string, message: string, event: object): void;
	public abstract start(): void;
}
