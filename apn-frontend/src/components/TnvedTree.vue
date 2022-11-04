<template>
  <v-treeview
      v-if="tnveds.length"
      v-model="tree"
      :load-children="fetchTnveds"
      :items="tnveds"
      selected-color="indigo"
      open-on-click
      selectable
      return-object
      expand-icon="mdi-chevron-down"
      dense
  >
    <template v-slot:label="{ item }">
      <b>{{item.id}}</b><span class="mx-1">-</span>{{item.name}}
    </template>
  </v-treeview>
<!--  <TreeViewer-->
<!--      v-if="tnveds && tnveds.length"-->
<!--      :items="tnveds"-->
<!--      @load-children="fetchTnveds"-->
<!--      @toggle-open="toggleOpenItem"-->
<!--      @toggle-select="toggleSelectItem"-->
<!--      style="height: 100%; overflow: auto;"-->
<!--  />-->
</template>

<script>
import tnveds2 from '../assets/tnveds2.json';
// import TreeViewer from "@/components/TreeViewer";
export default {
  name: 'TnvedTree',
  // components: {TreeViewer},
  data: () => ({
    tree: [],
    tnveds: [],
    tnvedsMap: {},
  }),
  methods: {
    capitalizeFirstLetter(s) {
      return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
    },
    toggleOpenItem(item) {
      item.open = !item.open;
    },
    toggleSelectItem(item) {
      item.selected = !item.selected;
    },
    async fetchTnveds(parent) {
      try {
        const response = await fetch(`http://stat.customs.gov.ru/api/Tnved/GetCodes?parent=${parent.id}`);
        const json = await response.json();
        if (!json.length) {
          parent.children = null;
          return parent;
        }
        this.tnvedsMap['t' + parent.id] = json.map(el => ({
          id: el.id,
          name: this.capitalizeFirstLetter(el.name),
          children: el.hasChildNodes ? [] : null,
          open: false,
          selected: false,
          canSelect: true,
        }));
        parent.children = this.tnvedsMap['t' + parent.id];
        parent.childrenLoaded = true;
        return parent;
      } catch (e) {
        console.error(e);
      }
    },
  },
  async created() {
    this.tnvedsMap['t'] = tnveds2;
    this.tnveds = this.tnvedsMap['t'].map(el => ({
      id: el.id,
      name: this.capitalizeFirstLetter(el.name),
      children: [],
      open: false,
      selected: false,
      canSelect: true,
    }));
  },
};
</script>

<style>
.v-treeview-node__label {
  white-space: normal;
}
</style>
