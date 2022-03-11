import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectVesselTracks, updatePosition } from "../slice";
import { useNavigate } from "react-router-dom";
import { Button, Descriptions, Layout, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

export function VesselDetails() {
  const { selectedPosition } = useAppSelector(selectVesselTracks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Layout.Sider
      width={0}
      collapsedWidth={300}
      collapsed={!!selectedPosition}
      theme="light"
    >
      <div className="p-5">
        <div className="flex justify-between align-center">
          <Typography.Title level={5} className="mb-0">
            {selectedPosition?.SHIPNAME}
          </Typography.Title>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => dispatch(updatePosition(null))}
          />
        </div>
        <Descriptions title="Position Details" column={1}>
          <Descriptions.Item label="Type">
            {selectedPosition?.TYPE_NAME}
          </Descriptions.Item>
          <Descriptions.Item label="Course">
            {selectedPosition?.COURSE}
          </Descriptions.Item>
          <Descriptions.Item label="Destination">
            {selectedPosition?.DESTINATION}
          </Descriptions.Item>
          <Descriptions.Item label="Width">
            {selectedPosition?.WIDTH} metres
          </Descriptions.Item>
          <Descriptions.Item label="Speed">
            {selectedPosition?.SPEED} knot
          </Descriptions.Item>
        </Descriptions>
        <Button
          type="primary"
          ghost
          onClick={() =>
            selectedPosition?.SHIP_ID && navigate(selectedPosition?.SHIP_ID)
          }
        >
          Show Vessel Historical Positions
        </Button>
      </div>
    </Layout.Sider>
  );
}
