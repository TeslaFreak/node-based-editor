import { useMemo } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position, getIncomers, useEdges, useNodes } from "reactflow";

export type PositionLoggerNodeData = {
  label?: string;
};

export function InputLoggerNode({
  id,
  xPos,
  yPos,
  data,
}: NodeProps<PositionLoggerNodeData>) {
  const nodes = useNodes();
  const edges = useEdges();
  // const ReactFlowInstance = useReactFlow()

  const incomers = useMemo(() => {
    return getIncomers(
      { id: id, position: { x: xPos, y: yPos }, data: data },
      nodes,
      edges
    );
  }, [edges]);

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />
      {data.label && <div>{data.label}</div>}

      <div>{incomers.map((incomingNode) => incomingNode.id + ", ")}</div>
      <div>test</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
