import * as _ from 'underscore';
import msg from './msgcode.js';
let data = [];

const allData = async () =>{
    const body = {};
    body['code'] = _.flatten(_.compact(data)).length > 0 ? msg.msgCode.record_get_200 : msg.msgCode.record_get_400 ;
    body['message'] = _.flatten(_.compact(data)).length > 0 ? msg.responseMsg.record_get_200 : msg.responseMsg.record_get_400 ;
    body['data'] = _.flatten(_.compact(data)).length > 0 ? _.flatten(_.compact(data)).map((el,i)=>{ el['id'] = `${i+1}_${el['name']}`; return el;}) : [];
    console.log('body',body)
    return body;
}
const saveData = async (event) =>{
    console.log('arr',_.isArray(event) && event.length > 0,'\nevent',event)
    const body = {};
     _.isArray(event) && event.length > 0 ? data.push(event) : null;
    body['code'] = _.isArray(event) && event.length > 0 ? msg.msgCode.record_save_success_200 : msg.msgCode.record_save_fail_400;
    body['message'] = _.isArray(event) && event.length > 0 ? msg.responseMsg.record_save_success_200 : msg.responseMsg.record_save_fail_400;
    body['data'] = _.flatten(_.compact(data)).length > 0 ? _.flatten(_.compact(data)).map((el,i)=>{ el['id'] = `${i+1}_${el['name']}`;  el['isDeleted'] = false;  return el;}) : [];
    return body;
}

const updateData = async(event) => {
    const body = {};
    const details = _.isArray(event.dataList) && event.dataList.length > 0 ? event.dataList.map((el)=>{ el['id'] ===  event.updatedData.id ? el = event.updatedData : null; return el;}): [];
    data = details.length > 0 ? details : data;
    console.log('_.isArray(event.dataList) && event.dataList.length > 0 && event.updatedData',_.isArray(event.dataList) ,'\n1`2332', event.dataList ,'\nggifkf', event.updatedData,'\ndetails',details)
    body['data'] = details.length > 0 ? details : data;
    body['code'] = details.length > 0 ? msg.msgCode.record_update_success_200 :msg.msgCode.record_update_fail_400;
    body['message'] = details.length > 0 ? msg.responseMsg.record_update_success_200 :msg.responseMsg.record_update_fail_400;
    console.log("🚀 ~ updateData ~ body:", body)
    return body;
}

const deleteData = async(event) => {
    const body = {};
    const details = _.isArray(event.dataList) && event.dataList.length > 0 ? event.dataList.map((el)=>{ el['id'] ===  event.deleteData.id ? el['isDeleted'] = true : null; return el;}): [];
    data = details.length > 0 ? details : data;
    console.log('_.isArray(event.dataList) && event.dataList.length > 0 && event.updatedData',_.isArray(event.dataList) ,'\n1`2332', event.dataList ,'\nggifkf', event.updatedData,'\ndetails',details)
    body['data'] = details.length > 0 ? details : data;
    body['code'] = details.length > 0 ? msg.msgCode.record_delete_success_200 :msg.msgCode.record_delete_fail_400;
    body['message'] = details.length > 0 ? msg.responseMsg.record_delete_success_200 :msg.responseMsg.record_delete_fail_400;
    console.log("🚀 ~ updateData ~ body:", body)
    return body;
}



export default {
    saveData,
    updateData,
    deleteData,
    allData
}