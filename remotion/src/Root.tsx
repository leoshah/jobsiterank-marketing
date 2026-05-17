import { Composition } from "remotion";
import { Walkthrough } from "./compositions/Walkthrough";
import {
  defaultProps,
  FPS,
  TOTAL_FRAMES,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  VideoPropsSchema,
} from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Walkthrough"
        component={Walkthrough}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={VideoPropsSchema}
        defaultProps={defaultProps}
      />
    </>
  );
};
