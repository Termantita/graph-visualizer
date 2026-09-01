<script setup lang="ts">
    import ForceGraph, { type GraphData } from "force-graph";
    import { onNodeClick } from "~/services/graph/events";

    const graphStore = useVaultStore();

    const graphRef = ref<HTMLElement | null>(null);
    const data: GraphData = graphStore?.graphData;
    
    onMounted(() => {
        if (!graphRef.value) return;
        if (!data) return;
        
        new ForceGraph(graphRef.value).graphData(data).linkDirectionalArrowLength(6).onNodeClick(onNodeClick);
    })
</script>

<template>
    <div ref="graphRef" id="graph"></div>
</template>