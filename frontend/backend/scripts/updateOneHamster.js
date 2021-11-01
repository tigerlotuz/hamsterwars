const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

updateOneHamster();

async function updateOneHamster(id) {
	console.log('Updates a hamster in the database...');
	const docId = id || 'ZqZVutnpkmXXAK8PlpXL'

	const updates = {
        // id:41,
        // name:"Miffo",
        // age:1,
        favFood:"Plommontomater",
        loves:"Springa i hjulet",
        // imgName:"hamster-41.jpg",
        // wins:0,
        // defeats:0,
        // games:0
	}

	const settings = { merge: true }
	await db.collection(HAMSTERS).doc(docId).set(updates, settings)
}