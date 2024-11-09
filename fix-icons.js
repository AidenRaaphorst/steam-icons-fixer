const fs = require("node:fs");
const path = require("path");

const CHECK_FOLDERS_RECUSIVELY = true;
const STEAM_ICONS_PATH = "C:/Program Files (x86)/Steam/steam/games";
const searchPath = process.argv[2] || ".";

console.log(`Steam icons path: "${STEAM_ICONS_PATH}"`);
console.log(`Searching shortcuts in: "${searchPath}"\n`);

function findUrlFiles(dir) {
  const items = fs.readdirSync(dir);
  const urlFiles = [];

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isFile() && path.extname(item).toLowerCase() === ".url") {
      urlFiles.push(fullPath);
    } else if (CHECK_FOLDERS_RECUSIVELY && stat.isDirectory()) {
      urlFiles.push(...findUrlFiles(fullPath));
    }
  }

  return urlFiles;
}

(async () => {
  for await (const file of findUrlFiles(searchPath)) {
    console.log(`\nFound: ${path.relative(searchPath, file)}`);

    const linkContent = fs.readFileSync(file, "utf8");
    const gameId = linkContent.match(/rungameid\/(.+)/m)?.[1];
    const iconPath = linkContent.match(/IconFile=(.+)/m)?.[1];
    const iconName = iconPath?.split("\\").pop();
    const iconUrl = `http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/${gameId}/${iconName}`;

    console.log(`  Game ID: ${gameId}`);

    if (!gameId) {
      continue;
    }

    if (fs.existsSync(iconPath)) {
      console.log(`  Icon already exists at: ${iconPath}`);
      continue;
    }

    console.log(`  Icon URL: ${iconUrl}`);

    const response = await fetch(iconUrl);
    const iconBuffer = await response.arrayBuffer();

    console.log(`  Writing icon to: ${iconPath}`);
    fs.writeFileSync(iconPath, Buffer.from(iconBuffer));
  }

  console.log("\nDone!");
})();
