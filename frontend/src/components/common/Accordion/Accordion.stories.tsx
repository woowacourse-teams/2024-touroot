import { CSSProperties, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Accordion from "./Accordion";

const meta = {
  title: "common/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const style: CSSProperties = {
  width: "48rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0 1.6rem",
};

export const Default: Story = {
  render: () => {
    const handleClickDeleteIcon = fn;
    return (
      <div style={style}>
        <Accordion.Root>
          <Accordion.Item value={"option-1"}>
            <Accordion.Trigger onDeleteItem={handleClickDeleteIcon}>Day 1</Accordion.Trigger>
            <Accordion.Content>
              <Accordion.Root>
                <Accordion.Item value={"option-1"}>
                  <Accordion.Trigger onDeleteItem={handleClickDeleteIcon}>장소명</Accordion.Trigger>
                  <Accordion.Content>아코디언 Content</Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    );
  },
};

export const MultipleAccordions = () => {
  const days = [
    {
      id: "1",
      title: "Day 1",
    },
    {
      id: "2",
      title: "Day 2",
    },
    {
      id: "3",
      title: "Day 3",
    },
    { id: "4", title: "Day 4" },
  ];

  return (
    <div style={style}>
      <Accordion.Root>
        {days.map((item) => (
          <Accordion.Item key={item.id} value={`option-${item.id}`}>
            <Accordion.Trigger onDeleteItem={() => {}}>{item.title}</Accordion.Trigger>
            <Accordion.Content>{item.title}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export const add_and_delete_accordions = () => {
  const [days, setDays] = useState([
    {
      id: "1",
      title: "Day 1",
    },
  ]);

  const handleClickAddDayButton = () => {
    const newId = String(days.length + 1);
    setDays([...days, { id: newId, title: `Day ${newId}` }]);
  };

  const handleClickDeleteDayButton = (id: string) => {
    setDays(days.filter((item) => item.id !== id));
  };

  const TravelAccordionGroup = () => {
    const [travels, setTravels] = useState<{ id: string; title: string }[]>([]);

    const handleClickAddTravelButton = () => {
      const newId = String(travels.length + 1);
      setTravels([...travels, { id: newId, title: "새로운 장소" }]);
    };

    const handleClickDeleteTravelButton = (id: string) => {
      setTravels(travels.filter((item) => item.id !== id));
    };

    return (
      <div style={style}>
        {travels.map((travelItem) => (
          <Accordion.Item key={travelItem.id} value={`option-${travelItem.id}`}>
            <Accordion.Trigger onDeleteItem={() => handleClickDeleteTravelButton(travelItem.id)}>
              {travelItem.title}
            </Accordion.Trigger>
            <Accordion.Content></Accordion.Content>
          </Accordion.Item>
        ))}
        <button
          style={{
            width: "100%",
            height: "4rem",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            fontWeight: "700",
            textAlign: "left",
            paddingLeft: "1.6rem",
          }}
          onClick={handleClickAddTravelButton}
        >
          + 장소 추가하기
        </button>
      </div>
    );
  };

  return (
    <div style={style}>
      <Accordion.Root>
        {days.map((item) => (
          <Accordion.Item key={item.id} value={`option-${item.id}`}>
            <Accordion.Trigger onDeleteItem={() => handleClickDeleteDayButton(item.id)}>
              {item.title}
            </Accordion.Trigger>
            <Accordion.Content>
              <Accordion.Root>
                <TravelAccordionGroup />
              </Accordion.Root>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <button
        style={{
          marginTop: "1.6rem",
          width: "100%",
          height: "4rem",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          fontWeight: "700",
          textAlign: "left",
          paddingLeft: "1.6rem",
        }}
        onClick={handleClickAddDayButton}
      >
        + 일자 추가하기
      </button>
    </div>
  );
};
