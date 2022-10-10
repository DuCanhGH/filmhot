import type { Readable } from "node:stream";

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { parse, stringify } from "subtitle";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const url = req.query.url;
    if (!url || typeof url !== "string") {
      return res.status(400).send("Invalid request.");
    }
    const response = await axios.get<Readable>(encodeURI(url), {
      responseType: "stream",
    });
    if (
      !response.headers["content-type"] ||
      (!response.headers["content-type"].startsWith("application/x-subrip") &&
        !response.headers["content-type"].includes("srt"))
    ) {
      return res.status(400).send("Invalid content type.");
    }
    res.setHeader("content-type", "text/vtt");
    res.setHeader(
      "cache-control",
      "public, max-age=86400, stale-while-revalidate"
    );
    return res
      .status(200)
      .send(response.data.pipe(parse()).pipe(stringify({ format: "WebVTT" })));
  } catch (error) {
    return res.status(500).send("Failed to convert subtitles.");
  }
};

export default handler;
