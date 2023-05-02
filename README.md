# Isaac's Arsenal

Isaac's Arsenal is a mod for _[The Binding of Isaac: Repentance](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/)_, written in [TypeScript](https://www.typescriptlang.org/) using the [IsaacScript](https://isaacscript.github.io/) framework.

# What's in this mod?
For now just two mods:
- **True Ice Bow** (A bow based on league of legends item)
- **Flask of Wondrouds Physick** (A item based on Elden's Ring item)

## True Ice Bow
A rechargeable active item which fires a freezing tear in a cone (scales with tears).

- [x] Synergy with Bethany.
- [x] Works in coop.

[icebow.webm](https://user-images.githubusercontent.com/2742138/235591424-21de75df-7a32-4b79-b887-d8255af75eb3.webm)


## Flask of Wondrous Physick
An item which has **10 unique** crystal tears (effects):

- **Flame Cracked Tear**: adds the Fire Mind effect (rare drop)
- **Strength Crystal Tear**: adds Isaac's damage (granted drop)
- **Dexterity Crystal Tear**: adds Isaac's tears (granted drop)
- **Crimson Crystal Tear**: restores one of Isaac's red heart containers (granted drop)
- **Thorny Cracked Tear**: has an effect similar to Dead Eye's item (rare drop)
- **Lightning Cracked Tear**: adds the Jacob's Ladder effect (rare drop)
- **Malachite Shattered Tear**: spawns a custom familiar called "Malachite" (rare drop)
- **Winged Crystal Tear**: adds an extra crystal tears slot (very rare drop)
- **Holy Crystal Tear**: adds the temporary protection of Holy Mantle (almost granted drop)
- **Cerulean Tear**: has a chance to drop a full or half soul heart (almost granted drop)
- **Ruptured Tear**: BOOOOOM (almost granted drop)

- [x] Synergy with Bethany.
- [x] Works in coop.

[flask.webm](https://user-images.githubusercontent.com/2742138/235592133-74c1b8f6-615a-412e-8854-df7628a128e1.webm)

## Download
Go to the [Releases](https://github.com/wesleyholiveira/isaacs-arsenal/releases) page and get the newer one zip.

## How To Compile (Developers Only)

If you are a developer, or the mod is not yet uploaded to the Steam Workshop, you can play the mod by compiling the TypeScript code into a "main.lua" file. Perform the following steps:

- Download and install [Node.js](https://nodejs.org/en/download/) (Windows Installer .msi, 64-bit).
- Download and install [Git](https://git-scm.com/download/win) (64-bit Git for Windows setup).
- Download (or clone) this repository:
  - Click on the "Code" button in the top-right-corner of this page.
  - Click on "Download ZIP".
- Unzip the zip file to a new directory.
- Open up the repository folder and double-click on the `run.sh` script. If prompted, choose to open it with Git for Windows. You will see a Git Bash terminal window open.
- The script might ask you some questions, like which save file that you use for testing.
- If the script is successful, you will see "Compilation successful." (You can continue to leave the terminal window open; it will monitor for changes in your project, and recompile if necessary.)
- Completely close Isaac if it is already open, and then open the game again, and the mod should be in the list of mods. You can now play or test the mod.
