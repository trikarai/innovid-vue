import Vue from "vue";
import VueLodash from "vue-lodash";
const options = { name: "lodash" }; // customize the way you want to call it
Vue.use(VueLodash, options); // options is optional

import bus from "@/config/bus";

export const formDynamicMixins = {
    data() {
        return {
        }
    },
    watch: {
        value() {
            var params;
            this.isError = false;
            if (this.modeReload) {
                if (this.field.type == 'string') {
                    params = { fieldId: this.field.stringField.id, value: this.value, type: this.field.type };
                } else if (this.field.type == 'integer') {
                    params = { fieldId: this.field.integerField.id, value: this.value, type: this.field.type };
                } else if (this.field.type == 'textarea') {
                    params = { fieldId: this.field.textAreaField.id, value: this.value, type: this.field.type };
                    // } else if (this.field.type == 'radio') {
                    //     params = { fieldId: this.field.singleSelectField.id, value: this.value, type: this.field.type };
                    // } else if (this.field.type == 'select') {
                    //     params = { fieldId: this.field.multiSelectField.id, value: this.value, type: this.field.type };
                } else if (this.field.type == 'attachment') {
                    params = { fieldId: this.field.attachmentField.id, value: this.value, type: this.field.type };
                }
            } else {
                params = { fieldId: this.field.id, value: this.value, type: this.field.type };
            }
            bus.$emit("getValue", params, this.index);
        }
    },
    methods: {
        reOrderField: function (params) {
            return Vue._.orderBy(params, function (o) { return new Number(o.position); }, ["asc"]);
        },
        refactorJSON(data) {
            data.stringFields.forEach(element => {
                element.type = "string";
                this.fields.push(element);
            });
            data.integerFields.forEach(element => {
                element.type = "integer";
                this.fields.push(element);
            });
            data.textAreaFields.forEach(element => {
                element.type = "textarea";
                this.fields.push(element);
            });
            data.singleSelectFields.forEach(element => {
                element.type = "radio";
                this.fields.push(element);
            });
            data.multiSelectFields.forEach(element => {
                element.type = "select";
                this.fields.push(element);
            });
            data.attachmentFields.forEach(element => {
                element.type = "attachment";
                this.fields.push(element);
            });
            this.fields = this.reOrderField(this.fields);
        },
        refactorRecordJSON(data) {
            data.stringFieldRecords.forEach(element => {
                element.type = "string";
                element.field = element.stringField;
                delete element.stringField;
                this.fields.push(element);
            });
            data.integerFieldRecords.forEach(element => {
                element.type = "integer";
                element.field = element.integerField;
                delete element.integerField;
                this.fields.push(element);
            });
            data.textAreaFieldRecords.forEach(element => {
                element.type = "textarea";
                element.field = element.textAreaField;
                delete element.textAreaField;
                this.fields.push(element);
            });
            data.singleSelectFieldRecords.forEach(element => {
                element.type = "radio";
                element.field = element.singleSelectField;
                delete element.singleSelectField;
                this.fields.push(element);
            });
            data.multiSelectFieldRecords.forEach(element => {
                element.type = "select";
                element.field = element.multiSelectField;
                delete element.multiSelectField;
                this.fields.push(element);
            });
            data.attachmentFieldRecords.forEach(element => {
                element.type = "attachment";
                element.field = element.attachmentField;
                delete element.attachmentField;
                this.fields.push(element);
            });
        },
        refactorParams(data) {
            var params = new Object();
            var stringFieldRecords = new Array();
            var integerFieldRecords = new Array();
            var textAreaFieldRecords = new Array();
            var singleSelectFieldRecords = new Array();
            var multiSelectFieldRecords = new Array();
            var attachmentFieldRecords = new Array();
            data.forEach(element => {
                if (element.type == 'string') {
                    stringFieldRecords.push(element)
                } else if (element.type == 'integer') {
                    integerFieldRecords.push(element)
                } else if (element.type == 'textarea') {
                    textAreaFieldRecords.push(element)
                } else if (element.type == 'radio') {
                    singleSelectFieldRecords.push(element);
                } else if (element.type == 'select') {
                    multiSelectFieldRecords.push(element)
                } else if (element.type == 'attachment') {
                    attachmentFieldRecords.push(element)
                }
            });
            params.stringFieldRecords = stringFieldRecords;
            params.integerFieldRecords = integerFieldRecords;
            params.textAreaFieldRecords = textAreaFieldRecords;
            params.singleSelectFieldRecords = singleSelectFieldRecords;
            params.multiSelectFieldRecords = multiSelectFieldRecords;
            params.attachmentFieldRecords = attachmentFieldRecords;
            return params;
        },
        pairFieldValue(data) {
            //https://stackoverflow.com/questions/56444006/how-to-merge-the-property-with-same-key-in-two-object-array?noredirect=1&lq=1
            //String
            var map = new Map(
                data.stringFieldRecords.map(o => [o.stringField.id, o])
            );
            var result = this.dataList.worksheetForm.stringFields.map(o =>
                Object.assign({}, o, map.get(o.id))
            );
            this.dataList.worksheetForm.stringFields = result;
            //textarea
            var mapt = new Map(
                data.textAreaFieldRecords.map(o => [o.textAreaField.id, o])
            );
            var resultt = this.dataList.worksheetForm.textAreaFields.map(o =>
                Object.assign({}, o, mapt.get(o.id))
            );
            this.dataList.worksheetForm.textAreaFields = resultt;
            //integer
            var mapi = new Map(
                data.integerFieldRecords.map(o => [o.integerField.id, o])
            );
            var resulti = this.dataList.worksheetForm.integerFields.map(o =>
                Object.assign({}, o, mapi.get(o.id))
            );
            this.dataList.worksheetForm.integerFields = resulti;
            //single select / radio
            var mapr = new Map(
                data.singleSelectFieldRecords.map(o => [o.singleSelectField.id, o])
            );
            var resultr = this.dataList.worksheetForm.singleSelectFields.map(o =>
                Object.assign({}, o, mapr.get(o.id))
            );
            this.dataList.worksheetForm.singleSelectFields = resultr;
            //multi select
            var mapm = new Map(
                data.multiSelectFieldRecords.map(o => [o.multiSelectField.id, o])
            );
            var resultm = this.dataList.worksheetForm.multiSelectFields.map(o =>
                Object.assign({}, o, mapm.get(o.id))
            );
            this.dataList.worksheetForm.multiSelectFields = resultm;
            //attachment
            var mapa = new Map(
                data.attachmentFieldRecords.map(o => [o.attachmentField.id, o])
            );
            var resulta = this.dataList.worksheetForm.attachmentFields.map(o =>
                Object.assign({}, o, mapa.get(o.id))
            );
            this.dataList.worksheetForm.attachmentFields = resulta;
        }
    },
}