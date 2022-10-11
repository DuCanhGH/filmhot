import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { parallel } from "radash";
import { FC, useState } from "react";

import { urlWithProxy } from "@/shared/constants";

interface DownloadProps {
  segments: string[];
  proxy: boolean;
  subtitle?: string;
}

const Download: FC<DownloadProps> = ({ segments, proxy, subtitle }) => {
  const [message, setMessage] = useState("Waiting for your command...");
  const [filePreview, setFilePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const startDownloadVideo = async () => {
    setMessage("Loading video rendering library...");
    const ffmpeg = createFFmpeg({
      log: process.env.NODE_ENV !== "production",
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
          await fetchFile(proxy ? urlWithProxy(segment) : segment)
        );
        setMessage(`Downloading segments (${count} / ${segments.length})...`);
        count++;
      }
    );

    setMessage("Rendering video...");

    ffmpeg.FS(
      "writeFile",
      "list.txt",
      new Array(segments.length)
        .fill("")
        .map((_, index) => `file '${index + 1}.ts'`)
        .join("\n")
    );

    if (subtitle) {
      ffmpeg.FS(
        "writeFile",
        "subtitle_file.srt",
        await fetchFile(proxy ? urlWithProxy(subtitle) : subtitle)
      );
      await ffmpeg.run(
        "-f",
        "concat",
        "-i",
        "list.txt",
        "-i",
        "subtitle_file.srt",
        "-bsf:a",
        "aac_adtstoasc",
        "-acodec",
        "copy",
        "-vcodec",
        "copy",
        "-c:s",
        "mov_text",
        "all.mp4"
      );
    } else {
      await ffmpeg.run(
        "-f",
        "concat",
        "-i",
        "list.txt",
        "-acodec",
        "copy",
        "-vcodec",
        "copy",
        "all.mp4"
      );
    }
    const data = ffmpeg.FS("readFile", "all.mp4");
    const objectURL = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
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
          <video
            src={filePreview}
            muted
            autoPlay
            width="100%"
            controls
            className="w-full md:w-[50%]"
          ></video>
        </>
      )}
    </div>
  );
};

export default Download;
