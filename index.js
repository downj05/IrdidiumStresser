var argv = require('yargs/yargs')(process.argv.slice(2))
	.usage('Usage: $0 -ip [host] -p [port](optional) -c [bot_count] -t [timeout](optional) -m [USERNAME](optional) -f [true/false](optional)')
	.demandOption(['ip', 'c'])
	.boolean('f')
	.default({
		t : 1000,
		p : 25565
	})
	.alias('m', 'master')
	.alias('h', 'ip')
	.alias('p', 'port')
	.alias('c', 'count')
	.alias('t', 'timeout')
	.alias('f', 'spreadfly')
	.describe('c', 'Bot count')
	.describe('t', 'Join delay per bot')
	.describe('m', 'Bot controllers username')
	.describe('f', 'Bots spread out and fly in a random direction, must be opped.')
	.argv;


// who can control the bots with text commands
const masters = ["W32_", "ThatProgrammer", "KaySeeYT"];

// delay between each bot joining in ms
const joinTimeout = argv.t;

// how many bots to join
const botCount = argv.c;

// server ip address and port
const server_ip = String(argv.ip);
const server_port = argv.p;
/*/ 
wether or not the bots attempt to teleport somewhere random in a 250x250k area,
 go into creative mode and start flying at height limit upon joining 
/*/
const fly_on_join = argv.f;


const mineflayer = require('mineflayer');
function randomFloat(start, end) {
	return Math.random() * (max - min);
}

function randomInt(min, max) { //
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

function createBot(name) {
	return mineflayer.createBot({
		host: server_ip,
		username: `Burger_${name}`,
		port: server_port
	});
	
}


function loop() {
	console.log(`Making ${botCount} bots with a delay of ${joinTimeout}ms...`);
	if (fly_on_join == true) console.log(`Bots will spread out and start flying upon joining.`)
	for (let i = 0; i < botCount; i++) {
		setTimeout(function() {

		
		const b = createBot(i)
		if (fly_on_join == true) {
			b.on('spawn', ()=>{
				b.chat('/gamemode creative');
				b.creative.startFlying();
				b.chat(`/tp ${randomInt(0, 250000)} 250 ${randomInt(0, 250000)}`)
				b.setControlState('forward', true)
			})
		}
		
		b.on('chat', (sender, message)=>{
			if (!masters.includes(sender)) return

			if (message == 'start jumping') {
				b.setControlState('jump', true)
			}

			if (message == 'stop jumping') {
				b.setControlState('jump', false)
			}

			if (message == 'start forward') {
				b.setControlState('forward', true)
			}

			if (message == 'stop forward') {
				b.setControlState('forward', false)
			}

			if (message == 'start random') {
				b.setControlState('forward', true);
				b.setControlState('jump', true);
				delta_yaw = randomInt(1,360)*Math.PI/180;
				b.look(delta_yaw, 0);
			}
			
			if (message == 'stop all') {
				b.clearControlStates();
			}
		})
	}, joinTimeout*i);
	}
	console.log("Bots Initialized.");
}

loop();