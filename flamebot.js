const NertiviaSys = require("nertivia.js");
const bot = new NertiviaSys.Client();
const InfoCmds = require("./cmd/info.js");
const FunCmds = require("./cmd/fun.js");
const EcoCmds = require("./cmd/eco.js");
var fs = require('file-system');
var levels 
fs.readFile('./configs/levels.json', 'utf8', function(err, contents) {
    levels = JSON.parse(contents);
});
var botToken = "NjY3MTMyNTU5NDc4Mjc5NzgyNA.b7DVHqhdHHu2J_DmW__fiU8TaScX3Oci9Wp3OQ3UWvc"; // This is your bot token, use this to login
var botPrefix = "&"; // Change this to change the prefix used.
var contents = null
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`); // Indicates you were logged in.
	console.log(`Flame Nertivia Bot By Edgewurth`);
})


bot.on("message", msg => {
	var cmd = msg.content.split(" "); // Splits message so we can have arguments AND check if message starts with "X".
	if (cmd[0] === botPrefix + "rng") {
        msg.send(Math.floor(Math.random() * Number(cmd[2])) + Number(cmd[1]))
	}
	if (cmd[0] === botPrefix + "about") {
        msg.send(InfoCmds.about())
    }
	if (cmd[0] === botPrefix + "settings") {
        msg.send("Coming Soon")
    }
	if (cmd[0] === botPrefix + "help") {
        msg.author.send(InfoCmds.help(cmd[1]))
    }
	if (cmd[0] === botPrefix + "8ball") {
        msg.send(FunCmds.eightball())
    }
	if (cmd[0] === botPrefix + "ping") {
		var date = new Date();
        var timestampbef = date.getMilliseconds();
		msg.send("Please Wait...");
		var date = new Date();
		var timestampaft = date.getMilliseconds();
		var latency = timestampaft - timestampbef;
		msg.send("Pong! The latency is " + latency.toFixed(0) + "ms");
    }
	if (cmd[0] === botPrefix + "btntest") {
        msg.send("I has button 0w0.",{buttons: [{id: 'test', name: '0w0'}]});
    }
	if (cmd[0] === botPrefix + "bal") {
		if (typeof levels[msg.author.id] === "undefined") {
		levels[msg.author.id] = 0;
		}
        msg.send("Your Current Balance Is $" + levels[msg.author.id]);
    }
	if (cmd[0] === botPrefix + "work") {
		var job = EcoCmds.getjob();
		var pay = EcoCmds.getworkpay(job);
		var jobname = EcoCmds.getworkplace(job);
		if (typeof levels[msg.author.id] === "undefined") {
		levels[msg.author.id] = pay;
		} else {
		levels[msg.author.id] = levels[msg.author.id] + pay;}
		msg.reply("You worked at " + jobname + " and got $" + pay);
    }
	if (typeof levels[msg.author.id] === "undefined") {
		levels[msg.author.id] = 0;
	} else {
	levels[msg.author.id] = levels[msg.author.id] + 1;}
	fs.writeFile("./configs/levels.json",JSON.stringify(levels));
})

bot.login(botToken); // Logs the bot in.