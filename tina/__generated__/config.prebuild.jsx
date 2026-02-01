// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
            isTitle: true
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "string"
          },
          {
            name: "description",
            label: "Description",
            type: "string"
          },
          {
            name: "weight",
            label: "Weight (sort order)",
            type: "number"
          },
          {
            name: "part",
            label: "Part Label",
            type: "string",
            description: "e.g. WHY \u2014 FEEL, WHO \u2014 PEOPLE, HOW \u2014 SYSTEM, EXECUTIVE"
          },
          {
            name: "rule_number",
            label: "Rule Number",
            type: "number"
          },
          {
            name: "short_title",
            label: "Short Title",
            type: "string",
            description: "Used in navigation cards"
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
