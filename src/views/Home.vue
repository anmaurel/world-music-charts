<template>
    <div class="dataviz">
        <GraphChart />
    </div>
</template>

<script>
import GraphChart from "@/components/GraphChart.vue";

export default {
    name: "Home",
    components: {
        GraphChart,
    },
};
</script>
