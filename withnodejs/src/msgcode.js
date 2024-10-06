const msgCode  = {
    'record_save_success_200': 'RECORD_SAVE_SUCCESS_200',
    'record_save_fail_500': 'RECORD_SAVE_FAIL_500',
    'record_save_fail_400': 'RECORD_SAVE_FAIL_400',
    'record_delete_success_200': 'RECORD_DELETE_SUCCESS_200',
    'record_delete_fail_500': 'RECORD_DELETE_FAIL_500',
    'record_delete_fail_400': 'RECORD_DELETE_FAIL_400',
    'record_update_success_200': 'RECORD_UPDATE_SUCCESS_200',
    'record_update_fail_500': 'RECORD_UPDATE_FAIL_500',
    'record_update_fail_400': 'RECORD_UPDATE_FAIL_400',
    'record_get_200': 'GET_RECORD_200',
    'record_get_400': 'GET_RECORD_400',
    'record_get_500': 'GET_RECORD_500'
};

const responseMsg = {
    'record_save_success_200' : 'Record Save successfully',
    'record_save_fail_500' : 'Server Error to Save',
    'record_save_fail_400' : 'Record Fail to Save',
    'record_delete_success_200' : 'Record Deleted successfully',
    'record_delete_fail_500' : 'Server Error to Delete',
    'record_delete_fail_400' : 'Record Fail to Delete',
    'record_update_success_200' : 'Record Updated successfully',
    'record_update_fail_500' : 'Server Error to Update',
    'record_update_fail_400' : 'Record Fail to Update',
    'record_get_200': 'All Get Record',
    'record_get_400': 'Record Not Found',
    'record_get_500': 'Server Error'
}


export default {
    responseMsg,
    msgCode
}