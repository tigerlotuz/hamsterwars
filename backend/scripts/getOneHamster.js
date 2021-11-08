const {connect} = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

getOneHamster()

async function getOneHamster(id) {
    console.log('Looking for Miffo...');
    const docId = id || 'ZqZVutnpkmXXAK8PlpXL'
    const docSnapshot = await db.collection(HAMSTERS).doc(docId).get()

	if( !docSnapshot.exists ) {
		console.log('Could not find him!');
		return
	}
	const data = await docSnapshot.data()
	console.log('Found: ', data);
	return data
}