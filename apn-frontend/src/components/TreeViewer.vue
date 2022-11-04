<template>
  <v-col class="pa-0">
    <div v-for="item of items" :key="item.id">
      <div class="d-flex row ma-0" style="flex-wrap: nowrap;">
        <v-btn
          v-if="item.children"
          @click="toggleOpenItem(item)"
          text
          icon
          class="mx-1"
        >
          <v-icon :class="getToggleClasses(item)">mdi-chevron-down</v-icon>
        </v-btn>
        <div v-else style="width: 44px"></div>
        <v-checkbox
          v-if="item.canSelect"
          :value="item.selected"
          @change="toggleSelectItem(item)"
          class="mt-1"
          hide-details
        />
        <div v-if="!$slots.default && !$scopedSlots.default" class="pt-2 px-1">
          {{ item.name }}
        </div>
        <slot :item="item" />
      </div>
      <v-expand-transition>
        <template v-if="item.open && item.children && item.children.length">
          <TreeViewer :items="item.children" class="ml-4" v-on="$listeners">
            <template v-slot="{ item }">
              <div v-if="!$slots.default && !$scopedSlots.default" class="pt-2 px-1">
                {{ item.name }}
              </div>
              <slot :item="item" />
            </template>
          </TreeViewer>
        </template>
      </v-expand-transition>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "TreeViewer",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    getToggleClasses(item) {
      return item.open ? "toggle--open" : "toggle";
    },
    toggleOpenItem(item) {
      this.$emit("toggle-open", item);
      if (item.open && !item.childrenLoaded) {
        this.$emit("load-children", item);
      }
    },
    toggleSelectItem(item) {
      this.$emit("toggle-select", item);
    }
  }
};
</script>

<style scoped>
.toggle {
  transform: rotate(-90deg);
}
.toggle--open {
  transform: none;
}
</style>
