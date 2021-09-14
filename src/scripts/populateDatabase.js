const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

const data = require('../assets/data.json')

populateDatabase();

async function populateDatabase() {
	console.log('Fills the database with a lot of hamsters..');
	data.forEach(object => {
        let newObject = {
            ...object,
        }
        db.collection(HAMSTERS).add(newObject)
    })
}