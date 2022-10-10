import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { parallel } from "radash";
import { FC, useState } from "react";

import { urlWithProxy } from "../../shared/constants";

interface DownloadProps {
  segments: string[];
  proxy: boolean;
}

const Download: FC<DownloadProps> = ({ segments, proxy }) => {
  const [message, setMessage] = useState("Waiting for your command...");
  const [filePreview, setFilePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const startDownloadVideo = async () => {
    setMessage("Loading video rendering library...");
    const ffmpeg = createFFmpeg({
      log: !import.meta.env.PROD,
      corePath: "https://unpkg.com/@ffmpeg/core/dist/ffmpeg-core.js",
    });

    await ffmpeg.load();

    setLoading(true);

    setMessage(`Downloading segments (0 / ${segments.length})...`);

    let count = 0;
    await parallel(
      10,
      segments.map((segment, index: any) => [index, segment]),
      async ([index, segment]) => {
        ffmpeg.FS(
          "writeFile",
          `${index + 1}.ts`,
          await fetchFile(proxy ? urlWithProxy(segment) : segment),
        );
        setMessage(`Downloading segments (${count} / ${segments.length})...`);
        count++;
      },
    );

    setMessage("Rendering video...");

    ffmpeg.FS(
      "writeFile",
      "list.txt",
      new Array(segments.length)
        .fill("")
        .map((_, index) => `file '${index + 1}.ts'`)
        .join("\n"),
    );

    await ffmpeg.run("-f", "concat", "-i", "list.txt", "-c", "copy", "all.ts");
    await ffmpeg.run("-i", "all.ts", "-acodec", "copy", "-vcodec", "copy", "all.mp4");
    const data = ffmpeg.FS("readFile", "all.mp4");

    const objectURL = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));

    setFilePreview(objectURL);
    setMessage("Conversion completed.");
    setLoading(false);
  };

  return (
    <div className="w-full">
      <button
        onClick={startDownloadVideo}
        className="text-primary w-fit h-fit flex items-center gap-2 disabled:text-secondary"
        disabled={loading}
      >
        {loading
          ? "Converting video to downloadable format, please wait..."
          : "Start video conversion"}
      </button>
      <p>{message}</p>

      {filePreview && (
        <>
          <a
            download="video.mp4"
            href={filePreview}
            className="text-primary w-fit h-fit flex items-center gap-2 disabled:text-secondary"
          >
            Download video here
          </a>
          <video src={filePreview} muted autoPlay width="100%" controls></video>
        </>
      )}
    </div>
  );
};

export default Download;
