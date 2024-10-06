import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
import method from './src/allMethod.js';
import msg from './src/msgcode.js';

app.get('/all', async (req, res) => {
    try {
        const detail = await method.allData();
        res.status(201).send(detail)
    } catch (err) {
        res.status(500).send({ code: msg.msgCode.record_get_500,  message: msg.responseMsg.record_get_500});
    }
})

app.post('/saveDetail', async (req, res) => {
    try {
        const detail = await method.saveData(req.body);
        res.status(201).send(detail)
    } catch (err) {
        res.status(500).send({ code: msg.msgCode.record_save_fail_500,  message: msg.responseMsg.record_save_fail_500});
    }
});

app.post('/updateDatas', async (req, res) => {
    try {
        const detail = await method.updateData(req.body);
        res.status(201).send(detail)
    } catch (err) {
        res.status(500).send({ code: msg.msgCode.record_update_fail_500,  message: msg.responseMsg.record_update_fail_500});
    }
});

app.post('/deleteData', async (req, res) => {
    try {
        const detail = await method.deleteData(req.body);
        res.status(201).send(detail)
    } catch (err) {
        res.status(500).send({ code: msg.msgCode.record_delete_fail_500,  message: msg.responseMsg.record_delete_fail_500});
    }
});
  
app.listen(8080, () => {
  console.log(`Example app listening on port 3000`)
})