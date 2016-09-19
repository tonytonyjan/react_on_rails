# Rails + Webpack + React + Redux + React Router + Server Rendering

It's an experimental project to demonstrate how to implement server-side rendering in Ruby on Rails **WITHOUT** using other gems, such as [react-rails](https://github.com/reactjs/react-rails).

Since there are too many magic and DSL/API in `react-rails`, which makes more difficult to customize and learn. In this project, at least, you know what you are doing and everything is under your control.

## Usage

```
bundle
npm i
be foreman
```

## How

### Assets

There is no new API for asset helpers, you can use `asset_path`, `javascript_include_tag`, etc just like your did in your other rails applications, no need to learn new API.

This project makes use of `webpack --json` and override one of the Rails core helpers, `compute_asset_path`, to communicate with Webpack assets. Source here: `lib/webpack_stats.rb`

### Server Side Rendering

There are 2 entries in `webpack.config.js`, for both client and server. You'll find there is nothing new in `client.js`, it's just like any other react application, but in `server.js`, it only expose some  necessary modules, which will be used by `PagesController`. Since `ExecJS` doesn't contain module system, you just can't require a module dynamically. The simplest way should be using some bundler tools like Webpack to generate a single file for `ExecJS` to compile.
