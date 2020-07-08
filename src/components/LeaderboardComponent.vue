<template>
  <section class="ranking">
    <div class="ranking__container">
      <q-tabs v-model="tab" align="center" narrow-indicator class="q-mb-lg">
        <q-tab :name="tab" :label="tab" />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
        class="text-center"
      >
        <q-tab-panel
          :name="tab"
          class="videos__section__wrapper"
          v-if="data.length > 0"
        >
          <q-table
            align="center"
            :data="leaderboardData"
            :columns="dynamicColumns"
            row-key="name"
            :loading="loading"
            no-data-label="Brak wyników, masz okazję dodać swój jako pierwszy!"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Workout } from "../store/models";

interface Column {
  name: string;
  label: string;
  align: string;
  field: string;
  sortable: boolean;
  required?: boolean;
  format?: Function;
}
@Component({
  props: ["user", "isFinished"]
})
export default class LeaderboardComponent extends Vue {
  created() {
    this.tab = (this.$attrs.currentWorkout as any).fields.date;
    this.findColumns();
    this.updateLeaderboard();
  }
  tab = "";
  tabs: any[] = [];
  dynamicColumns: Column[] = [
    {
      name: "name",
      label: "Osoba",
      required: true,
      align: "center",
      field: "name",
      format: (val: string) => `${val}`,
      sortable: true
    }
  ];
  columns: Column[] = [
    {
      name: "name",
      label: "Osoba",
      required: true,
      align: "center",
      field: "imie",
      format: (val: string) => `${val}`,
      sortable: true
    },
    {
      name: "time",
      align: "center",
      label: "Czas [min]",
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
      label: "Ciężar [kg]",
      field: "weight",
      sortable: true
    },
    {
      name: "distance",
      align: "center",
      label: "Dystans [m]",
      field: "distance",
      sortable: true
    }
  ];
  data: Object[] = [];

  updateLeaderboard() {
    // eslint-disable-next-line no-console
    console.log("updateLeaderboard");
    this.$store
      .dispatch("fetchWorkoutLeaderboard", this.$route.params.id)
      .then(() => {
        this.transformLeaderboardData();
      });
  }
  get currentLeaderboard() {
    return this.$store.getters.currentLeaderboard;
  }

  get loading() {
    return this.$store.getters.loading;
  }

  get leaderboardData() {
    if (
      this.currentLeaderboard !== null &&
      this.currentLeaderboard !== undefined
    )
      if (
        Object.values(this.currentLeaderboard).length > 0 &&
        this.data.length === 0
      )
        this.updateLeaderboard();

    return this.data;
  }

  @Watch("currentLeaderboard")
  transformLeaderboardData() {
    // eslint-disable-next-line no-console
    console.log("transformLeaderboard");
    this.data = [];
    if (
      this.currentLeaderboard !== undefined &&
      this.currentLeaderboard !== null
    ) {
      Object.values(this.currentLeaderboard).forEach(element => {
        if (
          (element as any).workoutId ===
          ((this.$attrs.currentWorkout as any) as Workout).sys.id
        )
          this.data.push((element as any).workoutResults);
      });
    }
  }

  findColumns() {
    this.columns.forEach(column => {
      if (
        column.field ===
        ((this.$attrs.currentWorkout as unknown) as Workout).fields.resultKey
      )
        this.dynamicColumns.push(column);
    });
  }
}
</script>
