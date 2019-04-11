const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(hobbit) {
  const [id] = await db('test').insert(hobbit)
  return db('test')
  .where({ id })
  .first();
}

async function update(id, changes) {
  return null;
}

async function remove(id) {
  let find = await findById(id)
  console.log(find)
  if (find.length !== 0) {
    await db('test').delete().where('id',id)
    return id;
  } else {
    return 0
  }
}

function getAll() {
  return db('test');
}

function findById(id) {
  return db('test').where('id',id);
}