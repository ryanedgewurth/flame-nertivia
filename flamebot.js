/* FLAME NERTIVIA bot
Programmed by: Edgewurth
Current Version: 2020-07-15 Patch 
Current Version Number: 0.2.0 */
var vernum = "0.2.0"; // Update Every Build
var vername = "2020-07-15 Patch"; // Update Every Build
const NertiviaSys = require("nertivia.js");
const client = new NertiviaSys.Client();
const InfoCmds = require("./cmd/info.js");
const FunCmds = require("./cmd/fun.js");
const EcoCmds = require("./cmd/eco.js");
const SettingCmds = require("./cmd/settings.js");
const ErrorCmds = require("./cmd/errorhandle.js");
var fs = require('file-system');
var levels 
var userconf
fs.readFile('./configs/levels.json', 'utf8', function(err, contents) {
    levels = JSON.parse(contents);
});
fs.readFile('./configs/userconf.json', 'utf8', function(err, contents) {
    userconf = JSON.parse(contents);
});
var clientToken = "xxx"; // This is your client token, use this to login
var clientPrefix = "&"; // Change this to change the prefix used.
var contents = null
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`); // Indicates you were logged in.
	console.log(`Flame Nertivia client By Edgewurth`);
})
var channelid = null
client.on("messageButtonClicked", (button, done) => {
	try {
    if (button.id === "userconfig") {
        client.channels.cache.get(button.channelID).send("Select an Setting", {
            buttons: [{ id: 'usermsgs', name: "Messages" },{ id: 'userother', name: "Other" }]
        })
    }
	if (button.id === "usermsgs") {
		if (typeof userconf[button.clickedByID + "_dmhelp"] === "undefined") {
		userconf[button.clickedByID + "_dmhelp"] = "true";
		} else if (userconf[button.clickedByID + "_dmhelp"] === "true") {
			userconf[button.clickedByID + "_dmhelp"] = "false";
		} else {
			userconf[button.clickedByID + "_dmhelp"] = "true";
		};
        client.channels.cache.get(button.channelID).send(`Set Send Help to Inbox to \`` + userconf[button.clickedByID + "_dmhelp"] + `\` for <@${button.clickedByID}>`)
        done();
    }
	fs.writeFile("./configs/userconf.json",JSON.stringify(userconf));
	} catch(err) {
		msg.reply(ErrorCmds.errorhandle(err.message, err.name, msg.content, msg.author.id));
	}
})


client.on("message", msg => {
	try {
	var cmd = msg.content.split(" "); // Splits message so we can have arguments AND check if message starts with "X".
	/* Command Currently Broken
	if (cmd[0] === clientPrefix + "rng") {
		msg.send("TEMP: In Nums are: " + cmd[1] + cmd[2]);
        msg.send(Math.floor(Math.random() * Number(parseFloat(cmd[2]))) + Number(parseFloat(cmd[1])))
	} */
	if (cmd[0] === clientPrefix + "sendargs1") {
		msg.send(cmd[1]);
	}
	if (cmd[0] === clientPrefix + "about") {
        msg.send(InfoCmds.about())
    }
	if (cmd[0] === clientPrefix + "throwerr") {
        throw "Test Error Message";
    }
	if (cmd[0] === clientPrefix + "settings") {
		/* This command section is fairly large */
		channelid = msg.channelID
		msg.send("Please select a settings group.", {buttons: [{id: 'userconfig', name: 'User'},{id: 'serverconfig', name: 'Server'}]} );
    }
	if (cmd[0] === clientPrefix + "printid") {
		msg.send(msg.id)
	}
	if (cmd[0] === clientPrefix + "help") {
		if (typeof userconf[msg.author.id + "_dmhelp"] === "undefined") {
		userconf[msg.author.id + "_dmhelp"] = "true";
		};
		if (userconf[msg.author.id + "_dmhelp"] === "true") {
			msg.send("Please check your inbox to see the help list. If your private messages are closed, then please type ``&settings``, and press the User/Send Help to Inbox buttons.");
			msg.author.send(InfoCmds.help(cmd[1]))
		} else {
			msg.reply(InfoCmds.help(cmd[1]))
		};
		
    }
	if (cmd[0] === clientPrefix + "8ball") {
        msg.send(FunCmds.eightball())
    }
	if (cmd[0] === clientPrefix + "ping") {
		var date = new Date();
        var timestampbef = date.getMilliseconds();
		msg.send("Please Wait...");
		var date = new Date();
		var timestampaft = date.getMilliseconds();
		var latency = timestampaft - timestampbef;
		msg.send("Pong! The latency is " + latency.toFixed(0) + "ms");
    }
	if (cmd[0] === clientPrefix + "bal") {
		if (typeof levels[msg.author.id] === "undefined") {
		levels[msg.author.id] = 0;
		}
        msg.send("Your Current Balance Is $" + levels[msg.author.id]);
    }
	if (cmd[0] === clientPrefix + "work") {
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
	fs.writeFile("./configs/levels.json",JSON.stringify(levels)); }
	catch(err) {
		msg.reply(ErrorCmds.errorhandle(err.message, err.name, msg.content, msg.author.id));
	}
})

client.login(clientToken); // Logs the client in.