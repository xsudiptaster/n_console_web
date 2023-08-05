import { atom } from "recoil";
export const selectedAppAtom = atom({
   key: "selectedAppAtom",
   default: "diagram",
});
export const nodesAtom = atom({
   key: "nodesAtom",
   default: [],
});
export const edgesAtom = atom({
   key: "edgesAtom",
   default: [],
});
export const draggedObjectAtom = atom({
   key: "draggedObjectAtom",
   default: {},
});
export const selectedNodeAtom = atom({
   key: "selectedNodeAtom",
   default: {},
});
export const selectedEdgeAtom = atom({
   key: "selectedEdgeAtom",
   default: {},
});
