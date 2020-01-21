import bus from "@/config/bus";

export const formDynamicMixins = {
    data() {
        return {
        }
    },
    watch: {
        value: function () {
            var params = { fieldId: this.field.id, value: this.value, type: this.field.type };
            bus.$emit("getValue", params, this.index);
        }
    },
    methods: {
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
        }
    },
}