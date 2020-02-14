export const validationMixins = {
    data() {
        return {
            rulesRequired: [v => !!v || "Field Required."],
            rulesUsername: [v => !!v || "Username is required"],
            rulesPosition: [v => !!v || "Position is required"],
            rulesName: [
                v => !!v || "Name is required",
                v => v.length >= 3 || "Name must be more than 3 characters"
            ],
            rulesPhone: [
                v => !!v || "Phone Number is required",
                v => {
                    const pattern = /^[0-9]*$/;
                    return pattern.test(v) || "Number Only";
                }
            ],
            rulesYear: [
                v => !!v || "Year is required",
                v => {
                    const pattern = /^[0-9]*$/;
                    return pattern.test(v) || "Number Only";
                }
            ],
            phoneMask: "(###) ##########",
            rulesEmail: [v => !!v || "E-mail is required",
            value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || "E-mail must be valid";
            }
            ],
            rulesIncubatorIdentifier: [v => !!v || "Field is required", v => v.length >= 3 || "Name must be more than 3 characters", v => {
                const pattern = /^[a-z0-9]*$/;
                return pattern.test(v) || "Lowercase Alphanumeric Only , no special characters"
            }],
            rulesPassword: [
                value => !!value || "Password Required.",
                value => value.length >= 8 || "Min 8 characters"
            ],
            rulesPasswordConfirmation: [
                v => !!v || "Confirmation Password is required",
                () =>
                    this.cpassword === this.signup.password || "Password does not match"
            ],
            rulesChangePasswordConfirmation: [
                v => !!v || "Confirmation Password is required",
                () =>
                    this.cpassword === this.password.newPassword || "Password does not match"
            ],
            rules: {
                max: value =>
                    value.length <= this.field.maxValue ||
                    "Max " + this.field.maxValue + " characters",
                min: value =>
                    value.length >= this.field.minValue ||
                    "Min " + this.field.minValue + " characters",
                maxValue: value =>
                    value <= this.field.maxValue ||
                    "Max value is" + this.field.maxValue,
                minValue: value =>
                    value >= this.field.minValue ||
                    "Min Value is " + this.field.minValue,
                maxSize: value =>
                    value.size <= this.field.maxSize ||
                    "Max size is " + this.field.maxSize + " Byte",
                minSize: value =>
                    value.size >= this.field.minSize ||
                    "Min Size is " + this.field.minSize + " Byte"
            }
        };
    },
    watch: {
        value: "checkRequired"
    },
    computed: {
    },
    methods: {
        checkRequired(value) {
            if (value.length === 0 && this.field.required) {
                return "Field is Required?";
            } else {
                return true;
            }
        }
    }
};
