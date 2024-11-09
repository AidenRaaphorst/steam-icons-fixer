# Steam Icons Fixer

A Node.js script to automatically download missing Steam game icons for Windows shortcuts (.url files).

## Prerequisites

- Node.js installed on your system
- Steam installed with games

## Installation

1. Clone or download this repository
2. Open a terminal in the project directory
3. Run the script using Node.js

## Usage

```bash
# Search in current directory
node fix-icons.js

# Search in specific directory
node fix-icons.js "C:\path\to\shortcuts"
```

## How it works

The script will:

1. Recursively search for `.url` files in the specified directory
2. Check if the icon file already exists
3. Download missing icons from Steam CDN
4. Save icons to the Steam games directory

## Configuration

You can modify these constants in `fix-icons.js`:

- `CHECK_FOLDERS_RECUSIVELY`: Set to `false` to disable recursive folder search
- `STEAM_ICONS_PATH`: Change the Steam icons directory path if Steam is not installed in the default directory.

## TODO

Detect **all installed** games and download icons if they don't exist yet

## Inspiration

- https://github.com/mrsimb/steam_blank_icon_fix
- https://github.com/tygerfox/steamiconrecovery
- https://github.com/manav907/FixSteamICON
