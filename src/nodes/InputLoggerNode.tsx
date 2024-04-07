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
  const nodes = useNodes<PositionLoggerNodeData>();
  const edges = useEdges();
  // const ReactFlowInstance = useReactFlow()

  const incomers = useMemo(() => {
    return getIncomers<PositionLoggerNodeData>(
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

      <div>
        {incomers.map((incomingNode) => (
          <div key={incomingNode.id}>{incomingNode.data?.label + ", "}</div>
        ))}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
