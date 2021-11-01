const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

addOneHamster();


async function addOneHamster() {
	console.log('Adds a new hamster to the database...');
	const object = {
        id:41,
        name:"Miffo",
        age:1,
        favFood:"pizza",
        loves:"sova",
        imgName:"hamster-41.jpg",
        wins:0,
        defeats:0,
        games:0
	}

	const docRef = await db.collection(HAMSTERS).add(object)
	console.log('Added a hamster with the id ' + docRef.id);
}