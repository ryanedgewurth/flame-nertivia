// Commands for "Ecomany" Section
var NumJobs = 17
exports.getworkplace = function(jobid) {
	var awns = [
        'a Fast Food Restaurant',
        'an Supermarket',
        'a School',
        'a Swimming Pool',
        'an Department Store',
        'an Hotel',
        'the Government',
        'the Police',
        'the Fire Department',
        'the Hospital',
        'an Insurance Company',
        'a Football Club',
        'an Film Production Team',
        'an Funeral Director\'s Company',
        'an IT Repair Shop',
        'an Video Game Development Company',
        'a Museum.',
        ];
	
	return awns[jobid];
}
exports.getworkpay = function(jobid) {
	var minPay = 0;
	var maxPay = 10;
	switch(jobid) {
		case 0:
			minPay = 5;
			maxPay = 15;
		case 1:
			minPay = 5;
			maxPay = 15;
		case 2:
			minPay = 10;
			maxPay = 20;
		case 3:
			minPay = 10;
			maxPay = 20;
		case 4:
			minPay = 10;
			maxPay = 20;
		case 5:
			minPay = 25;
			maxPay = 35;
		case 6:
			minPay = 25;
			maxPay = 35;
		case 7:
			minPay = 25;
			maxPay = 35;
		case 8:
			minPay = 50;
			maxPay = 60;
		case 9:
			minPay = 50;
			maxPay = 60;
		case 10:
			minPay = 40;
			maxPay = 50;
		case 11:
			minPay = 45;
			maxPay = 55;
		case 12:
			minPay = 60;
			maxPay = 70;
		case 13:
			minPay = 65;
			maxPay = 75;
		case 14:
			minPay = 60;
			maxPay = 70;
		case 15:
			minPay = 65;
			maxPay = 75;
		case 16:
			minPay = 60;
			maxPay = 70;
	}
			
	return Math.floor(Math.random() * Number(maxPay)) + Number(minPay);
}
exports.getjob = function() {
	return Math.floor(Math.random() * NumJobs);
}