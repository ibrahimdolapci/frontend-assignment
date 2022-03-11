import {Button, Space} from "antd";
import {LeftOutlined, PauseOutlined, PlayCircleOutlined, RightOutlined} from "@ant-design/icons";
import {useCallback, useRef} from "react";

export default function VesselHistoricalPositionControls({
                                                             onGoPrevious,
                                                             onGoNext
                                                         }: { onGoPrevious: () => void, onGoNext: () => void }) {
    const intervalId = useRef<NodeJS.Timeout>();

    const play = useCallback(() => {
        if (intervalId.current) return stop();

        intervalId.current = setInterval(onGoNext, 500);
    }, [onGoNext]);

    const stop = useCallback(() => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = undefined;
        }
    }, []);

    return (
        <Space style={{position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999}}>
            <Button icon={<LeftOutlined/>} onClick={onGoPrevious}/>
            <Button icon={<RightOutlined/>} onClick={onGoNext}/>
            <Button icon={<PlayCircleOutlined/>} onClick={play}/>
            <Button icon={<PauseOutlined/>} onClick={stop}/>
        </Space>
    );
}




