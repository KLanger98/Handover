const db = require('../config/connection');
const { Process, Flag } = require('../model/index');
const processSeeds = require('./processSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Process', 'processes');
    
    await Process.create(processSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
