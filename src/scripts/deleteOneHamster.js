const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

deleteOneHamster();

async function deleteOneHamster(id) {
	console.log('Deletes a hamster from the database...');
	const docId = id || 'TYslFSzJKJhh8Wn0WAGH'

	const docRef = db.collection(HAMSTERS).doc(docId)
	const docSnapshot = await docRef.get()
	console.log('Document exists? ', docSnapshot.exists);
	const result = await docRef.delete()
}
