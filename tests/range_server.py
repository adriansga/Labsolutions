#!/usr/bin/env python3
"""Minimalny serwer statyczny z HTTP Range do testów odtwarzacza wideo."""

from __future__ import annotations

import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class RangeRequestHandler(SimpleHTTPRequestHandler):
    range_start: int | None = None
    range_end: int | None = None

    def end_headers(self) -> None:
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path) or "Range" not in self.headers:
            self.range_start = None
            self.range_end = None
            return super().send_head()

        try:
            source = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None

        file_size = os.fstat(source.fileno()).st_size
        match = re.fullmatch(r"bytes=(\d*)-(\d*)", self.headers["Range"].strip())
        if not match:
            source.close()
            self.send_error(416, "Invalid byte range")
            return None

        start_text, end_text = match.groups()
        if start_text:
            start = int(start_text)
            end = int(end_text) if end_text else file_size - 1
        elif end_text:
            suffix_length = int(end_text)
            start = max(0, file_size - suffix_length)
            end = file_size - 1
        else:
            source.close()
            self.send_error(416, "Invalid byte range")
            return None

        if start >= file_size or start > end:
            source.close()
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{file_size}")
            self.end_headers()
            return None

        end = min(end, file_size - 1)
        self.range_start = start
        self.range_end = end
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.send_header("Last-Modified", self.date_time_string(os.fstat(source.fileno()).st_mtime))
        self.end_headers()
        return source

    def copyfile(self, source, outputfile) -> None:
        if self.range_start is None or self.range_end is None:
            return super().copyfile(source, outputfile)

        source.seek(self.range_start)
        remaining = self.range_end - self.range_start + 1
        while remaining > 0:
            chunk = source.read(min(64 * 1024, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4173), RangeRequestHandler)
    server.serve_forever()
