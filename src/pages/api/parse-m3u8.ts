import axios from "axios";
// @ts-expect-error
import { Parser } from "m3u8-parser";
import type { NextApiRequest, NextApiResponse } from "next";

import type { M3U8Manifest } from "@/shared/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const url = req.query.url;
    if (!url || typeof url !== "string") {
      return res.status(400).send("Missing url param");
    }
    const { data: source, headers } = await axios.get(url);
    if (
      ![
        "audio/x-mpegurl",
        "video/m3u",
        "video/m3u8",
        "video/hls",
        "application/x-mpegurl",
        "vnd.apple.mpegurl",
        "video/mp2t",
        "application/vnd.apple.mpegurl",
      ].includes(headers["content-type"]?.toLowerCase() || "")
    ) {
      return res.status(400).send("File is not m3u8");
    }
    const parser = new Parser();
    parser.push(source);
    parser.end();
    const manifest: M3U8Manifest = parser.manifest;
    if (!manifest?.segments?.length && !manifest?.playlists?.length) {
      return res.status(400).send("Invalid m3u8");
    }
    return res.status(200).send(manifest);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

export default handler;
