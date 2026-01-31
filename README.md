# Bosque Lomax

A modern, production-ready app for the Lomax Legacy experience, built with React Router, Vite, and Tailwind CSS.

## Features

- Server-side rendering
- Hot Module Replacement (HMR)
- Asset bundling and optimization
- TypeScript by default
- Tailwind CSS for styling
- [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

The app is available at `http://localhost:5173`.

## Project Setup

This project requires [git lfs](https://git-lfs.github.com/) to be installed if you are cloning a repo that uses it for large media files. Install it by following the instructions [here](https://git-lfs.github.com/). For automatic deploys to Vercel, ensure the project is [configured for Git LFS](https://vercel.com/docs/projects/overview#git-large-file-storage-lfs) if applicable.

## Building

By default this builds a static site to the `build/` directory. The client assets in `build/client/` can be served with nginx (using a config that supports SPA routing) or by using `npx serve -s build/client`.

```bash
npm run build
sudo cp -r ./build/client/* /var/www/html
sudo systemctl restart nginx
```

For nginx, use a config that serves `index.html` for non-file routes (e.g. `try_files $uri $uri/ /index.html;` in the `location /` block) so client-side routing works.

## Deploying to Vercel

To deploy to Vercel on push to main, use `npm run deploy` or connect the repo in the Vercel dashboard. The project is already configured with the Vercel React Router preset.

## Setting up a fresh Ubuntu computer

- Startup in Windows mode and copy the license key down; make a label and put it on the underside of the computer.
- Enter the BIOS and under Chipset set **system power loss / power resume** to **on**.
- Perform the default Ubuntu desktop install from the USB drive.
- Choose to replace Windows Boot entirely with Gnome.
- Select MP4/MP3 download and graphics driver downloads.
- Turn off screen lock and power down.
- After reboot:
  - Install Google Chrome.
  - Log in to GitHub and download the `./scripts/setup-ubuntu.sh` script from the repo and chmod it.
  - Run the `./scripts/setup-ubuntu.sh` script to install the necessary packages.
- Open the [GNOME Extensions](https://extensions.gnome.org/) site in Firefox and download the [disable-gestures 2021](https://extensions.gnome.org/extension/4049/disable-gestures-2021/) extension.
- Open the Extensions app in Gnome desktop and disable all UI features except the Desktop Icons one; enable the disable-gestures extension and tiling assistant.
- Disable the keyring prompt in [Gnome](https://askubuntu.com/questions/867/how-can-i-stop-being-prompted-to-unlock-the-default-keyring-on-boot).
- Add Chrome to the "Startup Applications" app in Gnome with the desired CLI parameters by copying the `chrome.desktop` file to the `~/.config/autostart` directory.
- [Firefox disable tab detach](https://www.reddit.com/r/firefox/comments/1j896fb/is_there_any_fix_for_browsertabsallowtabdetach/).
- [Disable edge tiling on Ubuntu](https://strugglers.net/~andy/mothballed-blog/2017/12/14/disabling-edge-tiling-on-gnome-3-26/).

---

Built with [React Router](https://reactrouter.com/).
