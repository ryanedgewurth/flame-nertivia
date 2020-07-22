// Commands for "Information" Section
exports.help = function(command) {
	switch(command) {
		case "rng":
			return "**Random Number Generator** Randomly Generates a Number between 2 Values\nUsage: ``rng [min] [max]``";
			break;
		case "ping":
			return "**Ping** Returns 'Pong'\nUsage: ``ping``";
			break;
		case "help":
			return "**Command List** Shows a list of all commands currently in Flame\nUsage: ``help``";
			break;
		case "about":
			return "**About** Randomly Generates a Number between 2 Values\nUsage: ``rng [min] [max]``";
			break;
		case "bal":
			return "**Balance** Checks your balance\nUsage: ``bal``";
			break;
		case "work":
			return "**Work** Work for a company and gain money\nUsage: ``work``";
			break;
		default:
			return "Here is my command list:\n``&work`` - Work for a company and gain money\n``&bal`` - Check your Balance\n``&rng [min] [max]`` - Randomly Generates Number\n``&about`` - About Me!\n``&help`` - Shows this list";
	}
}
exports.about = function() {
	return "Prototype Version of Flame Nertivia Bot for Nertivia. Programmed by Edgewurth@wnlB in Node.JS. Development fully begun 27 May 2020";
}
