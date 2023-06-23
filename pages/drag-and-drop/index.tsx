
import { useState } from "react";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import KanBanLane from "./kanbanLane";
 interface Item {
  id: string;
  title: string;
  lane: string;
}
 const KanBanPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [form] = Form.useForm();
   const onSubmit = (values: any) => {
    setItems([...items, { id: values.title, title: values.title, lane: "Unassigned" }]);
    form.resetFields();
  };
   const onDragEnd = (e: any) => {
    const container = e.over?.id;
    const item = e.active.data.current;
     if (!item) {
      return;
    }
     const index = items.findIndex((i) => i.id === item.id);
     if (container === "ToDo") {
      moveItem(item, index, "To do");
    } else if (container === "Done") {
      moveItem(item, index, "Done");
    } else if (container === "Unassigned") {
      moveItem(item, index, "Unassigned");
    } else {
      moveItem(item, index, "In Progress");
    }
  };
   const moveItem = (item: Item, index: number, lane: string) => {
    setItems((prevItems) => [
      ...prevItems.slice(0, index),
      { ...item, lane },
      ...prevItems.slice(index + 1),
    ]);
  };
   const getLaneItems = (lane: string) => {
    return items.filter((item) => item.lane === lane);
  };
   return (
    <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
      <Card title="To Do Dashboard">
        <Space>
          <Form form={form} layout="horizontal" onFinish={onSubmit}>
            <Form.Item label="New Task" name="title" required>
              <Input />
            </Form.Item>
            <Button style={{ backgroundColor: "#00b0ff", color: "white" }} htmlType="submit" type="primary">
              Add
            </Button>
          </Form>
        </Space>
         <Row gutter={16}>
          <Col>
            <KanBanLane title="To Do" items={getLaneItems("To do")} />
          </Col>
          <Col>
            <KanBanLane title="In Progress" items={getLaneItems("In Progress")} />
          </Col>
          <Col>
            <KanBanLane title="Done" items={getLaneItems("Done")} />
          </Col>
          <Col>
            <KanBanLane title="Unassigned" items={getLaneItems("Unassigned")} />
          </Col>
        </Row>
      </Card>
    </DndContext>
  );
};
 export default KanBanPage;