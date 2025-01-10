import type { Entrypoint } from "jsr:@denops/std";
import * as buffer from "jsr:@denops/std/buffer";
import * as fn from "jsr:@denops/std/function";
import { Maze } from "npm:@thewizardbear/maze_generator";

export const main: Entrypoint = (denops) => {
  denops.dispatcher = {
    async maze() {
      const { bufnr, winnr } = await buffer.open(denops, "maze://");

      const winWidth = await fn.winwidth(denops, winnr);
      const winHeight = await fn.winheight(denops, winnr);
      const maze = new Maze({
        xSize: winWidth / 3,
        ySize: winHeight / 3,
      }).generate();
      const content = maze.getString();

      await buffer.replace(denops, bufnr, content.split(/\r?\n/g));
      await buffer.concrete(denops, bufnr);
    },
  };
};
