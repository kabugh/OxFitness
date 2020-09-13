<template>
  <q-table
    dense
    :data="Object.values(transactions)"
    :columns="columns"
    row-key="name"
    hide-pagination
  />
</template>
<script lang="ts">
import { Transaction } from "@/store/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PaymentsTable extends Vue {
  @Prop({ required: true }) transactions!: Transaction[];
  columns = [
    {
      name: "name",
      label: "Nazwa",
      required: true,
      align: "left",
      field: "name",
      sortable: true
    },
    {
      name: "status",
      label: "Status",
      required: true,
      align: "left",
      field: "status",
      sortable: true
    },
    {
      name: "amount",
      label: "Koszt",
      required: true,
      align: "left",
      field: "amount",
      sortable: true,
      format: (val: number) => `${(val / 100).toFixed(2)} zł`
    },
    {
      name: "date",
      label: "Data zakupu",
      required: true,
      align: "left",
      field: "date",
      sortable: true
    },
    {
      name: "id",
      label: "Id",
      required: true,
      align: "left",
      field: "payment_intent"
    }
  ];
}
</script>
