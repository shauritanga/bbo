import React from "react";
import "./pie.css";
import { ResponsivePie } from "@nivo/pie";

const PieCard = ({ title, percent, data }) => {
  return (
    <div className="pie">
      <div className="pie-title">{title}</div>
      <div className="pie-details">
        <div className="pie-details-text">
          <div className="pie-details-text_group">
            <p>This month</p>
            <span>12,350,500.25</span>
          </div>
          <p>{percent}% more earnings than last month</p>
        </div>
        <div className="pie-details-graph">
          <ResponsivePie
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PieCard;
