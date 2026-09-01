import type { NodeObject } from "force-graph";

const vaultStore = useVaultStore();

export const onNodeClick = (node: NodeObject, ev: MouseEvent) => {
    if (!vaultStore) return;
    console.log(`node click: ${node.id}`);
    

    vaultStore.activeNoteName = node.id as string;
}