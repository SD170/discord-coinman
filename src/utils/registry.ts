import path from "path";
import fs from "fs/promises";

export async function registerCommands(client: SuperClient, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    // console.log('File: ', file);
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory())
      await registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js') || file.endsWith('.ts')) {
      const Command = await import(path.join(filePath, file)); // importing the command
      const cmd: BaseSlashCommandI = Command.default; // extracting with type
      // console.log(cmd.name);
      client.slashCommands.set(cmd.name, cmd);
      // console.log(`Registering ${cmd.name}`);
    }
  }
}

