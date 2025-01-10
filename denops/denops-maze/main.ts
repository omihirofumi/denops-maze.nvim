import type { Entrypoint } from "jsr:@denops/std";
import { Maze } from "npm:@thewizardbear/maze_generator";

export const main: Entrypoint = (denops) => {
  denops.dispatcher = {
    async maze() {
      const maze = new Maze({}).generate();
      const content = maze.getString();
      await denops.cmd("enew");
      await denops.call("setline", 1, content.split(/\r?\n/g));
    },
  };
};
