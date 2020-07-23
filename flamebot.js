/* FLAME NERTIVIA BOT
Programmed by: Edgewurth
Current Version: 2020-07-15 Patch 
Current Version Number: 0.2.0 */
var vernum = "0.2.0"; // Update Every Build
var vername = "2020-07-15 Patch"; // Update Every Build
const NertiviaSys = require("nertivia.js");
const bot = new NertiviaSys.Client();
const InfoCmds = require("./cmd/info.js");
const FunCmds = require("./cmd/fun.js");
const EcoCmds = require("./cmd/eco.js");
const SettingCmds = require("./cmd/settings.js");
var fs = require('file-system');
var levels 
var userconf
fs.readFile('./configs/levels.json', 'utf8', function(err, contents) {
    levels = JSON.parse(contents);
});
fs.readFile('./configs/userconf.json', 'utf8', function(err, contents) {
    userconf = JSON.parse(contents);
});
var botToken = "NjY3MTMyNTU5NDc4Mjc5NzgyNA.b7DVHqhdHHu2J_DmW__fiU8TaScX3Oci9Wp3OQ3UWvc"; // This is your bot token, use this to login
var botPrefix = "&"; // Change this to change the prefix used.
var contents = null
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`); // Indicates you were logged in.
	console.log(`Flame Nertivia Bot By Edgewurth`);
})
var channelid = null
bot.on("messageButtonClicked", (button, done) => {
    if (button.id === "test") {
        bot.channels.cache.get(channelid).send("Button '0w0' Test Successful", {
            buttons: [{ id: 'unban', name: "undo" }]
        })
        done();
	}
	if (button.id === "userconfig") {
        bot.channels.cache.get(channelid).send("Please Select a Setting Sub-Group", {
            buttons: [{ id: 'userconfig_msgs', name: "Messages" },{ id: 'userconfig_privacy', name: "Privacy" },{ id: 'userconfig_etc', name: "Other" }]
        })
        done();
	}
	if (button.id === "userconfig_msgs") {
        bot.channels.cache.get(channelid).send("Please Select a Setting to Modify", {
            buttons: [{ id: 'userconfig_msgs_dmhelp', name: "Send Help to Inbox" }]
        })
        done();
	}
	if (button.id === "userconfig_msgs_dmhelp") {
		if (typeof userconf[button.clickedByID + "_dmhelp"] === "undefined") {
		userconf[button.clickedByID + "_dmhelp"] = "true";
		} else if (userconf[button.clickedByID + "_dmhelp"] === "true") {
			userconf[button.clickedByID + "_dmhelp"] = "false";
		} else {
			userconf[button.clickedByID + "_dmhelp"] = "true";
		};
        done("Set Send Help to Inbox to `" + userconf[msg.author.id + "_dmhelp"] + "` for <@${button.clickedByID}>");
	}
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
		/* This command section is fairly large */
		channelid = msg.channelID
		msg.send("Please select a settings group.", {buttons: [{id: 'userconfig', name: 'User'},{id: 'serverconfig', name: 'Server'}]} );
    }
	if (cmd[0] === botPrefix + "help") {
		msg.send("Please check your inbox to see the help list. If your private messages are closed, then please type ``&settings``, select User/Messages/Send Help to Inbox and press False.");
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
        msg.send("I has button 0w0.",{buttons: [{id: 'test', name: '0w0'},{id: 'test2', name: '0w0 2'}]});
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