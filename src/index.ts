const config = require("./config.json");
import { CSBot } from "./cs-bot";

const statBot = new CSBot({
    autorun: config.autorun,
    token: config.token,
});
