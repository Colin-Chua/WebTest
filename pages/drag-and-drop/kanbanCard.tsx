import { useDraggable } from "@dnd-kit/core";
import { Card } from "antd";
import { CSS } from "@dnd-kit/utilities";

interface KanBanCardProps {
  title: string;
  index: number;
  parent: string;
}

const KanBanCard: React.FC<KanBanCardProps> = ({ title, index, parent }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
  
      <Card
        className="w-200 h-20"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      ><div>{parent}</div></Card>
  
  );
};

export default KanBanCard;
