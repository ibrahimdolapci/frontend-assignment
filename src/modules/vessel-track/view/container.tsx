import { useHistoricalPositionQuery } from "../../../app/api";
import React, { useCallback, useState } from "react";
import Markers from "./markers";
import Controls from "./controls";

export default function VesselHistoricalPositionsContainer({
  id,
}: {
  id: number;
}) {
  const [activeIndex, setActiveIndex] = useState(1);
  const { data = [] } = useHistoricalPositionQuery({ shipid: id, days: 1 });

  const onGoNext = useCallback(() => {
    setActiveIndex((index) => ++index % data.length);
  }, [data.length]);

  const onGoPrevious = useCallback(() => {
    setActiveIndex((index) => (--index < 0 ? data.length - 1 : index));
  }, [data.length]);

  if (!data?.length) return null;

  return (
    <>
      <Markers positions={data} activeIndex={activeIndex} />
      <Controls onGoNext={onGoNext} onGoPrevious={onGoPrevious} />
    </>
  );
}
