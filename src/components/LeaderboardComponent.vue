<template>
  <section class="ranking">
    <div class="ranking__container">
      <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
        <q-tab
          v-for="(element, index) in tabs"
          :name="index"
          :label="element"
          :key="index"
        />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
        class="text-center"
      >
        <q-tab-panel
          :name="i"
          class="videos__section__wrapper"
          v-for="(item, i) in tabs"
          :key="i"
        >
          <q-table
            align="center"
            :data="data"
            :columns="columns"
            row-key="name"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LeaderboardComponent extends Vue {
  tab = "";
  tabs = ["WOD 2020-02-24"];
  columns = [
    {
      name: "name",
      label: "Osoba",
      required: true,
      align: "center",
      field: "name",
      format: val => `${val}`,
      sortable: true
    },
    {
      name: "time",
      align: "center",
      label: "Czas",
      field: "time",
      sortable: true
    },
    {
      name: "reps",
      align: "center",
      label: "Ilość powtórzeń",
      field: "reps",
      sortable: true
    },
    {
      name: "rounds",
      align: "center",
      label: "Rundy",
      field: "rounds",
      sortable: true
    },
    {
      name: "weight",
      align: "center",
      label: "Ciężar",
      field: "weight",
      sortable: true
    },
    {
      name: "distance",
      align: "center",
      label: "Dystans",
      field: "distance",
      sortable: true
    }
  ];

  data = [
    {
      name: "Jarek",
      time: "12:03",
      reps: 53,
      rounds: 4,
      weight: 15
    },
    {
      name: "Marek",
      time: "13:13",
      reps: 33,
      rounds: 6,
      weight: 20
    },
    {
      name: "Darek",
      time: "12:13",
      reps: 34,
      rounds: 4,
      weight: 25
    },
    {
      name: "Arek",
      time: "10:13",
      reps: 55,
      rounds: 5,
      weight: 30
    }
  ];
}
</script>
<style lang="scss" scoped></style>
