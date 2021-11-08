const database = require('../database.js')
const connect = database.connect
const db = connect()

const HAMSTERS = 'hamsters'

getAllHamsters();

async function getAllHamsters() {
	console.log('Retrieves all hamsters from the database...');

	const hamstersRef = db.collection(HAMSTERS)

	const hamstersSnapshot = await hamstersRef.get()

	if( hamstersSnapshot.empty ) {
		console.log('No documents in collection.');
		return
	}
	const array = []

	await hamstersSnapshot.forEach(async docRef => {
        const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})

	console.log('Content from the database:', array);
	return array
}