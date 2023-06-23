import { useDroppable } from "@dnd-kit/core";
import { Card } from "antd";
import KanBanCard from "./kanbanCard";

interface KanBanLaneProps {
  title: string;
  items: any[];
}

const KanBanLane: React.FC<KanBanLaneProps> = ({ title, items }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <Card ref={setNodeRef} title={title}>
      <div className="flex flex-column ">
        {items.map((item, key) => {
          console.log("value", item, key);
          return (
            <KanBanCard title={item} key={key} index={key} parent={item} />
          );
        })}
      </div>
    </Card>
  );
};

export default KanBanLane;
