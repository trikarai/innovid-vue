<template>
  <v-row>
    <v-col md="12">
      <v-text-field label="Label Name" v-model="field.name"></v-text-field>
    </v-col>
    <!-- <v-col md="12">
      <v-text-field label="Description" v-model="field.description"></v-text-field>
    </v-col>-->
    <v-col md="6">
      <v-text-field label="Position" v-model="field.position" disabled></v-text-field>
    </v-col>
    <v-col md="6">
      <v-text-field label="Grid Position" disabled></v-text-field>
    </v-col>
    <!-- <v-col md="12">
      <v-text-field label="Default Value" v-model="field.defaultValue" disabled></v-text-field>
    </v-col>-->
    <template v-if="field.type == 'select'">
      <v-col md="6">
        <v-text-field label="Min Selection" v-model="field.minValue" type="number"></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field label="Max Selection" v-model="field.maxValue" type="number"></v-text-field>
      </v-col>
    </template>
    <v-col md="12">
      <v-checkbox v-model="field.required" :label="`Required : ${field.required.toString()}`"></v-checkbox>
    </v-col>
    <v-col md="12">
      <v-form ref="formoption" v-model="validoption">
        <v-row>
          <v-col md="8">
            <v-text-field
              v-model="optionAdd"
              label="Options List"
              maxlength="50"
              counter="50"
              :rules="[v => !!v || 'Option Name Required.']"
              @keydown.enter.prevent="addOption()"
            ></v-text-field>
          </v-col>
          <v-col md="4">
            <v-btn small fab color="primary" @click="addOption" :disabled="!validoption">
              <v-icon small>add</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-list>
        <transition-group name="slide-fade">
          <v-list-item v-for="(opt, index) in field.options" :key="index">
            <v-list-item-avatar></v-list-item-avatar>
            <v-list-item-content>{{opt.name}}</v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="deleteOption(index)">
                <v-icon color="red lighten-1">delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </transition-group>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      validoption: false,
      clearable: true,
      value: "",
      optionAdd: ""
    };
  },
  methods: {
    addOption() {
      if (this.$refs.formoption.validate()) {
        var opt = new Object({
          name: this.optionAdd,
          description: "",
          position: this.field.options.length + 1
        });
        this.field.options.push(opt);
        this.$refs.formoption.reset();
        this.$refs.formoption.resetValidation();
      }
    },
    deleteOption(index) {
      this.$delete(this.field.options, index);
    }
  },
  watch: {}
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
