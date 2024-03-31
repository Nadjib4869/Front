import { useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

function Loading() {
  return (
    <div className="absolute top-[50%] right-[50%]">
      <PropagateLoader
        color={"#0573FF"}
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
  );
}

export default Loading;