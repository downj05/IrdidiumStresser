
# Iridium SMP Stresser

A Node.js application to stress test the Iridium SMP test server

Control the bots with chat commands


## Run Locally

Clone the project

```bash
git clone https://github.com/downj05/IrdidiumStresser.git
```

Go to the project directory

```bash
cd my-project
```

Install dependencies

```bash
npm install
```

Start the server

```bash
 node index.js -h HOST -p PORT -c COUNT -t DELAY -f TRUE/FALSE
```



## Usage/Examples

Use
```bash
node index.js --help
```
to see available arguments.

Example:
```bash
node index.js -h localhost -p 25565 -c 3 -t 500 -f true
```

Chat Commands:\
`start jumping` - Makes all of the bots start jumping repeatedly\
`stop jumping` - Stops the jumping functionality\
`start forward` - Makes all the bots start walking forward, can be combined with jumping to get over obstacles.\
`stop forward` - Stops the forward walking\
`start random` - Makes each both turn in a random direction and start walking and jumping\
`stop all` - All actions the bots are doing will stop
## Screenshots

![App Screenshot](https://cdn.discordapp.com/attachments/935456549755838467/954192287821344818/unknown.png)

