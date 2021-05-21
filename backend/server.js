
// import packages & server config
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;

const cors = require('cors');
const path = require('path');

const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');
const winners = require('./routes/winners.js');
const losers = require('./routes/losers.js');
const matchWinners = require('./routes/matchWinners.js');
const defeated = require('./routes/defeated.js');
const manyMatches = require('./routes/manyMatches.js');
const fewMatches = require('./routes/fewMatches.js');
const score = require('./routes/score.js');

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});

app.use('/', express.static(path.join(__dirname, '../build'))); //ÄR DET DETTA???? buildmappen istället? ska den upp till heroku?
app.use('/img', express.static(path.join(__dirname, 'img')));

// routes
app.use('/hamsters', hamsters);
app.use('/matches', matches);
app.use('/winners', winners);
app.use('/losers', losers);
app.use('/matchWinners', matchWinners);
app.use('/defeated', defeated);
app.use('/manyMatches', manyMatches);
app.use('/fewMatches', fewMatches);
app.use('/score', score);

app.get('*', (req, res ) => {
	res.sendFile(path.join(__dirname, '../build/index.html'))
});

// start server
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});


//Lägg till route för ALLA andra routes ( * ).