const client = require('../databases/mongo');

module.exports = {
  method: ['GET', 'POST'],
  middleware: {
    global: [],
    get: [],
    post: []
  },
  // 主函数
  main: async function (req, res) {
    try {
      await client.connect();
      const db = client.db('test');
      const messages = db.collection('messages');

      // 插入文档
      const newDoc = {
        title: 'hello',
        content: 'world',
        createTime: new Date().getTime()
      }
      const result = await messages.insertOne(newDoc);
      res.send(`A document was inserted with the _id: ${result.insertedId}`);

      // 查询文档
      // const query = { title: 'hello' };
      // const options = {
      //   sort: { createTime: -1 },
      //   projection: { _id: 0, title: 1, content: 1, createTime: 1 },
      // };
      // const doc = await messages.findOne(query, options);
      // res.send(`finded ${doc}`);

      // 更新文档
      // const filter = { title: 'hello' };
      // const options = { upsert: true };
      // const updateDoc = {
      //   $set: {
      //     content: 'mongo'
      //   },
      // };
      // const result = await messages.updateOne(filter, updateDoc, options);
      // res.send(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`)

      // 删除文档
      // const query = { title: 'hello' };
      // const result = await messages.deleteOne(query)
      // if (result.deletedCount === 1) {
      //   res.send('Successfully deleted one document.')
      // } else {
      //   res.send('No documents matched the query. Deleted 0 documents.')
      // }

    } catch (err) {
      console.error(err)
      res.status(500).send('failed')
    } finally {
      await client.close();
    }
  }
}