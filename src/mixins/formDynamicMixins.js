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
                } else {
                    integerFieldRecords.push(element)
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