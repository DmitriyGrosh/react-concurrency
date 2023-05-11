function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

export const player = (val: number) => ({
	id: getRandomInt(100 * val),
	name: 'David De gea',
	age: getRandomInt(100 * val),
	number: getRandomInt(100 * val),
	position: '14',
	photo: '15',
});

const cards = {
	yellow: getRandomInt(100),
	yellowred: getRandomInt(100),
	red: getRandomInt(100),
}

const dribbles ={
	attempts: getRandomInt(100),
	success: getRandomInt(100),
	past: getRandomInt(100),
}

const duels = {
	total: getRandomInt(100),
	won: getRandomInt(100),
}

const fouls = {
	drawn: getRandomInt(100),
	committed: getRandomInt(100),
}

const games = (val: number) => ({
	appearences: getRandomInt(100 * val),
	lineups: getRandomInt(100 * val),
	minutes: getRandomInt(100 * val),
	number: getRandomInt(100 * val),
	position: 'asd',
	rating: 'gold',
	captain: true,
})

const goals = (val: number) => ({
	total: getRandomInt(100 * val),
	conceded: getRandomInt(100 * val),
	assists: getRandomInt(100 * val),
	saves: getRandomInt(100 * val),
})

const league = {
	"id": getRandomInt(100),
	"name": 'APL',
	"country": "Spain",
	"logo": 'string',
	"flag": 'string',
	"season": getRandomInt(100),
}

const passes = {
	total: getRandomInt(100),
	key: getRandomInt(100),
	accuracy: getRandomInt(100),
}

const penalty = {
	won: getRandomInt(100),
	commited: getRandomInt(100),
	scored: getRandomInt(100),
	missed: getRandomInt(100),
	saved: getRandomInt(100),
}

const shots = {
	total: getRandomInt(100),
	on: getRandomInt(100),
}

const substitutes = {
	in: getRandomInt(100),
	out: getRandomInt(100),
	bench: getRandomInt(100),
}

const tackles = {
	total: getRandomInt(100),
	blocks: getRandomInt(100),
	interceptions: getRandomInt(100),
}

const team = {
	id: getRandomInt(100),
	name: 'string;',
	logo: 'string;',
}

export const statistics = (val: number) => ({
	cards,
	dribbles,
	duels,
	fouls,
	games: games(val),
	goals: goals(val),
	league,
	passes,
	penalty,
	shots,
	substitutes,
	tackles,
	team,
});
