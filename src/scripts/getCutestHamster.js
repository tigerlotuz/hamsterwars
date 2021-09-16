const database = require('../database.js')
const connect = database.connect
const db = connect()

const HAMSTERS = 'hamsters'

getCutestHamster();

async function getCutestHamster() {
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

    const result = Object.keys(array).reduce((total, currentValue) =>    
    total.wins ? (array[currentValue].wins > total.wins ? array[currentValue] : total) : array[currentValue], {});
    
    console.log('Cutest hamster is:', result)

	return result
}
