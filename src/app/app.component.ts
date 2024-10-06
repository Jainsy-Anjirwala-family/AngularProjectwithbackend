import { Component, OnInit } from '@angular/core';
import { CallingapiService } from '../service/callingapi.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AngularProject';
  
  public dataDetails: any[] = [];
  public dataDetail:any = this.returnDataDetails();
  constructor(private callingapiService: CallingapiService,private messageService : MessageService,private confirmationService: ConfirmationService){

  }
  ngOnInit() {
    this.fetchDataRecord();
    this.dataDetails.push({
      'name': null,
      'hobbies': null,
      'number': null,
    });
  }

  // submitData(data:any){
  //   const body = {
  //     'pid': Number(data.id),
  //     'pname':data.name
  //   }
  //   this.callingapiService.postMethodApi('http://localhost:3000/post',body).subscribe((res)=>{
  //     console.log('res',res);
      
  //   },
  //   (err)=>{
  //     console.log('res errrr',err)
  //   }
  //   )
  // }
  // title = 'portfolio';

  emitdata(event:any){
      console.log("🚀 ~ AppComponent ~ emitdata ~ event:", event)
      if(event && event.eventType && event.eventType === "save"){
        this.fetchData('Save');
      }
      else if(event && event.eventType && event.eventType === "add"){
        this.fetchData('Add');
      }
      else if(event && event.eventType && event.eventType === "iconName"){
        if(event && event.eventData && event.eventData.value === "edit"){
          console.log('this.dataDetail.dataSource',this.dataDetail.dataSource)
          if(!_.findWhere(this.dataDetail.dataSource, {'isEditable': true})) {
            event['rowData']['isEditable'] = true;
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'At a Time one REcord Editable' }) ;
          } 
        }
        else if(event && event.eventData && event.eventData.value === "cancel"){
            event['rowData']['isEditable'] = false;
        }
        else if(event && event.eventData && event.eventData.value === "delete"){
            // event['rowData']['isEditable'] = false;
            this.deletedRecord(event);
        }
        else if(event && event.eventData && event.eventData.value === "save"){
          const flag = _.findWhere(this.dataDetail.backupSource, {'id':event['rowData']['id']});
          if(flag && flag['number'] === event['rowData']['number'] && flag['name'] === event['rowData']['name'] && flag['hobbies'] === event['rowData']['hobbies']){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Data Doesn't Modified!" }) ;
           }
           else{
            const payload = {
              'dataList' : _.union(this.dataDetail.dataSource,this.dataDetail.deletedDataSource),
              'updatedData': event['rowData']
            }
             this.updateData(payload);
           }
        }
      }
  }

  returnDataDetails(){
    return {
      'showErrorMsg': false,
      'showMsg':'',
      'dataSource': [],
      'backupSource':[],
      'gridParams': [
        { 'field': 'hobbies', 'header': 'Hobbies','inputType': 'text'},
        { 'field': 'name', 'header': 'Name','inputType': 'text'},
        { 'field': 'number', 'header': 'Number', 'inputType': 'number'},
        { 'field': 'action', 'header': 'Action', 'editableIcon' : [{'icon':'fa fa-trash-o', 'value':'delete'}, {'icon':'fa fa-edit', 'value': 'edit'}] , 'nonEditableIcon' : [{'icon':'fa fa-save', 'value':'save'},{'icon':'fa fa-close', 'value':'cancel'}]},
      ],
      'deletedDataSource': [] 
    }
  }

  fetchData(data?: any){
    this.dataDetail.showErrorMsg =  _.findWhere(this.dataDetails,{'name': null}) || _.findWhere(this.dataDetails,{'hobbies': null}) || _.findWhere(this.dataDetails,{'number': null}) ? true : false;
    this.dataDetail.showMsg = this.dataDetail.showErrorMsg ? `please Enter Record After that you can ${data}!` : '';
    data === "Add" && !this.dataDetail.showErrorMsg ? this.dataDetails.push({'name': null,'hobbies': null,'number': null,}): data === "Save" && !this.dataDetail.showErrorMsg ? this.saveDataRecord(this.dataDetails): null ;
  }

  fetchDataRecord(){
      this.dataDetail.deletedDataSource = this.dataDetail.dataSource = this.dataDetail.backupSource = [];
      this.callingapiService.getMethodApi('all').subscribe((res:any)=>{
        if(res && res.code === "GET_RECORD_200" && _.isArray(res.data) && res.data.length > 0 ){
          if(_.where(res.data, {'isDeleted':false}).length > 0){
            this.dataDetail.dataSource = JSON.parse(JSON.stringify(_.where(res.data, {'isDeleted':false}).map((el:any)=>{ el['isEditable'] = false;  return el;})));
            this.dataDetail.backupSource = JSON.parse(JSON.stringify(_.where(res.data, {'isDeleted':false}).map((el:any)=>{ el['isEditable'] = false;  return el;})));
          }
          if(_.where(res.data, {'isDeleted':true}).length > 0){
            this.dataDetail.deletedDataSource = _.where(res.data, {'isDeleted':true});
          }
          console.log("🚀 ~ AppComponent ~ this.callingapiService.getMethodApi ~ this.dataDetail:", this.dataDetail)
        }
      })
  }

  saveDataRecord(data:any[]){
    this.dataDetail.dataSource = this.dataDetail.backupSource = [];
    this.callingapiService.postMethodApi('saveDetail', data).subscribe((res:any)=>{
      if(res && res.code === "RECORD_SAVE_SUCCESS_200" && _.isArray(res.data) && res.data.length > 0){
          this.dataDetails = [];
          this.dataDetails.push({'name': null,'hobbies': null,'number': null,});
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Save' });
          if(_.where(res.data, {'isDeleted':false}).length > 0){
            this.dataDetail.dataSource = JSON.parse(JSON.stringify(_.where(res.data, {'isDeleted':false}).map((el:any)=>{ el['isEditable'] = false; return el; })));
            this.dataDetail.backupSource = JSON.parse(JSON.stringify(_.where(res.data, {'isDeleted':false}).map((el:any)=>{ el['isEditable'] = false; return el; })));
          }
          if(_.where(res.data, {'isDeleted':true}).length > 0){
            this.dataDetail.deletedDataSource = _.where(res.data, {'isDeleted':true});
          }
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Doesn't save" });
      }

      console.log("🚀 ~ AppComponent ~ this.callingapiService.postMethodApi ~ res:", res)
    })
  }

  updateData(payload : any){
    this.dataDetail.dataSource = this.dataDetail.backupSource = [];
      this.callingapiService.updateDataApi('updateDatas',payload).subscribe((res:any)=>{
      if(res && res.code === "RECORD_UPDATE_SUCCESS_200" && _.isArray(res.data) && res.data.length > 0){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Updated' });
          if(_.where(res.data, {'isDeleted':false}).length > 0){
            this.dataDetail.dataSource = JSON.parse(JSON.stringify(_.where(res.data, {'isDeleted':false}).map((el:any)=>{ el['isEditable'] = false; return el; })));
            this.dataDetail.backupSource = JSON.parse(JSON.stringify(_.where(res.data, {'isDeleted':false}).map((el:any)=>{ el['isEditable'] = false; return el; })));
          }
          if(_.where(res.data, {'isDeleted':true}).length > 0){
            this.dataDetail.deletedDataSource = _.where(res.data, {'isDeleted':true});
          }
        }
        else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Doesn't Updated" });
        }
      })
  }

  DeleteData(payload : any){
      this.dataDetail.deletedDataSource = this.dataDetail.dataSource = this.dataDetail.backupSource = [];
      this.callingapiService.updateDataApi('deleteData',payload).subscribe((res:any)=>{
      if(res && res.code === "RECORD_DELETE_SUCCESS_200" && _.isArray(res.data) && res.data.length > 0){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted' });
          if(_.where(res.data, {'isDeleted':false}).length > 0){
            this.dataDetail.dataSource = JSON.parse(JSON.stringify(_.where(res.data, {'isDeleted':false}).map((el:any)=>{ el['isEditable'] = false; return el; })));
            this.dataDetail.backupSource = JSON.parse(JSON.stringify(_.where(res.data, {'isDeleted':false}).map((el:any)=>{ el['isEditable'] = false; return el; })));
          }
          if(_.where(res.data, {'isDeleted':true}).length > 0){
            this.dataDetail.deletedDataSource = _.where(res.data, {'isDeleted':true});
          }
        }
        else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Doesn't delete" });
        }
      })
  }

  deletedRecord(event:any){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          const payload = {
            'dataList' : _.union(this.dataDetail.dataSource,this.dataDetail.deletedDataSource),
            'deleteData': event['rowData']
          }
          this.DeleteData(payload)
      },
      reject: () => {
      }
  });

  }
}
