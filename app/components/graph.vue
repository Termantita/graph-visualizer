<script lang="ts">
    import ForceGraph, { type GraphData } from "force-graph";;

    const graphRef = ref<HTMLElement | null>(null);
    const data: GraphData = {
        nodes: [{id: 1}, {id:"2"}],
        links: []
    }
    
    onMounted(() => {
        if (!graphRef.value) return;
        
        new ForceGraph(graphRef.value).graphData(data);
    })
</script>

<template>
    <div ref="graphRef" id="graph"></div>
</template>