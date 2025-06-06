# Meal App

This is a simple web app for managing recipes tailored for women with gestational diabetes. Users can drag and drop recipes into a meal planner and generate an interactive grocery list. Planner items can be removed individually and the entire plan can be cleared with one click.

## Features
- Fetch recipes from an Airtable table.
- Filter recipes by tags such as **Vegetarian** or **Vegan**.
- Drag and drop recipes into a meal planner area.
- Automatically build a grocery list from planned meals with checkboxes to track items.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
   You must run this before starting the server or the app will fail to launch.
2. Set the following environment variables:
   - `AIRTABLE_API_KEY` – your Airtable API key (**do not commit secrets to git**).
   - `AIRTABLE_BASE_ID` – the base ID (not the name) containing the recipes.
   - `AIRTABLE_TABLE_NAME` – (optional) table name, defaults to `Recipes`.
   - `AIRTABLE_VIEW_NAME` – (optional) Airtable view to query, defaults to `Grid view`.
   - `LOG_LEVEL` – (optional) log verbosity (e.g., `info`, `debug`). Defaults to `info`.

By default the server queries the **Grid view**. Set `AIRTABLE_VIEW_NAME` if you need to use a different view.

3. Start the server:
   ```bash
   node server.js
   ```
   The app will run on `http://localhost:3000`.
   Running `npm start` performs a prestart check that warns if `node_modules`
   has not been installed.

## Airtable Schema
The Airtable table should contain fields:
- **Name** – recipe name.
- **Ingredients** – comma-separated list of ingredients.
- **Tags** – multi-select field for tags like `Vegetarian`, `Vegan`, etc.

## Usage
Open the web page in your browser. Load recipes via the **Load Recipes** button, optionally filtering by tag. Drag recipes to the meal planner to generate your grocery list. Click an item in the planner to remove it or use **Clear Planner** to start over. The grocery list updates automatically with checkboxes so you can mark off ingredients you already have.
