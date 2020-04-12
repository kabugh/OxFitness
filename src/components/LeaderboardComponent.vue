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
            v-if="data.length > 0"
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
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class LeaderboardComponent extends Vue {
  created() {
    // eslint-disable-next-line no-console
    console.log("created?");
    this.getLeaderboard();
  }
  mounted() {
    // eslint-disable-next-line no-console
    console.log("mounted?");
  }
  tab = "";
  tabs = ["WOD 2020-02-24"];
  columns = [
    {
      name: "name",
      label: "Osoba",
      required: true,
      align: "center",
      field: "name",
      format: (val: string) => `${val}`,
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
  data: Object[] = [];

  getLeaderboard() {
    this.$store
      .dispatch("fetchWorkoutLeaderboard", this.$route.params.id)
      .then(() => {
        this.transformLeaderboardData();
        // eslint-disable-next-line no-console
        console.log("test");
      });
  }
  get currentLeaderboard() {
    return this.$store.getters.currentLeaderboard;
  }

  transformLeaderboardData() {
    if (
      this.currentLeaderboard !== undefined &&
      this.currentLeaderboard !== null
    )
      Object.values(this.currentLeaderboard).forEach(element => {
        this.data.push((element as any).workoutResults);
        // eslint-disable-next-line no-console
        console.log(element);
      });
  }
}
</script>
<style lang="scss" scoped></style>
