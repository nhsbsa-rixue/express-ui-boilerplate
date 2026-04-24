---
name: skill-finder
description: Finds, installs, and updates Agent Skills from the Flight Instructor catalog. Use this skill when the user asks to find, search, discover, browse, or install development resources like skills. Also use when the user wants to set up best practices for a specific technology or framework. Also use when the user asks to check for updates, upgrade skills, or find outdated skills.
metadata:
  version: 2
---

# Find, Install, and Update Skills

This skill searches the Flight Instructor catalog for relevant Agent Skills, installs them into the user's project, and checks for available updates to already-installed skills.

## Resource Types

- **Skills**: Agent Skills following the agentskills.io specification — specialized capabilities that agents can activate on demand

## Workflow

### Step 1: Fetch the Catalog

Fetch the catalog from:

```
https://gitlab.com/nhsbsa/ddat/tooling/flight-instructor/-/raw/main/catalog.json
```

The catalog JSON has this structure:

```json
{
  "skills": [
    {
      "name": "...",
      "description": "...",
      "version": 1,
      "path": "..."
    }
  ]
}
```

### Step 2: Check Installed Skills for Updates

After fetching the catalog, scan the user's `.agents/skills/` directory for already-installed skills:

1. List all subdirectories in `.agents/skills/`
2. For each installed skill, read its `SKILL.md` and extract `metadata.version` from the YAML frontmatter
3. Look up the skill by name in the fetched catalog
4. Compare the installed version against the catalog version

Classify each installed skill into one of three categories:

- **Outdated**: installed version is lower than the catalog version
- **Up to date**: installed version matches the catalog version
- **Not in catalog**: the skill name does not appear in the catalog (skip silently — do not warn or suggest action)

#### Self-update priority

If `skill-finder` itself is outdated, prioritize notifying the user about this before anything else. A newer version of `skill-finder` may include improved search, installation, or update capabilities. Suggest updating `skill-finder` first and re-running the original request afterwards.

#### Passive notification (during normal find/install usage)

When this skill was activated for a **search or install** request (not an explicit update check), and outdated skills are detected, append a brief note after the search results or installation confirmation:

> **Note:** N installed skill(s) have updates available. Ask me to "check for updates" to see details.

Do not list individual outdated skills or interrupt the primary workflow. Continue with the normal search/install flow.

#### Active update check (explicit request)

When the user explicitly asks to check for updates, upgrade skills, or find outdated skills, present a detailed summary:

1. List each outdated skill with its **name**, **installed version**, **latest version**, and **version gap** (e.g., "2 versions behind")
2. List skills that are up to date, confirming they are current
3. Ask the user which outdated skills they want to update (by number), or offer to update all at once

Example output:

```
Skills with updates available:

1. winston-logging — installed: v2, latest: v4 (2 versions behind)
2. error-handling — installed: v1, latest: v2 (1 version behind)

Up-to-date skills: node-api, docker-setup

Which skills would you like to update? Enter numbers, "all", or "none".
```

When the user selects skills to update, re-download the entire skill directory using the installation mechanism in Step 5, overwriting the existing `.agents/skills/{skill-name}/` directory. After updating, confirm each skill with its old and new version numbers.

### Step 3: Match Resources

Match the user's query against catalog entries using:

1. **Name relevance** to the user's query
2. **Description relevance** to the user's query

If no matching resources are found, ask the user for clarification about their needs.

### Step 4: Present Results

Present a **numbered list** of matching skills. Each entry must include:

1. **Number** for selection
2. **Name**
3. **Clickable URL** constructed as `https://gitlab.com/nhsbsa/ddat/tooling/flight-instructor/-/blob/main/{path}`
4. **Brief justification** explaining why this skill matches the user's needs

Example output:

```
1. [winston-logging](https://gitlab.com/nhsbsa/ddat/tooling/flight-instructor/-/blob/main/library/skills/winston-logging) (skill)
   Provides structured logging setup for Node.js applications using Winston.

2. [error-handling](https://gitlab.com/nhsbsa/ddat/tooling/flight-instructor/-/blob/main/library/skills/error-handling) (skill)
   Specialized workflow for implementing consistent error handling patterns.
```

After presenting the list, ask the user to specify the numbers of the resources they want to install.

If any of the matching skills are already installed and up to date, note this next to the entry so the user can make an informed decision.

### Step 5: Install or Update Selected Skills

Based on the user's selection, download and install the skills.

Skills are directories, not single files.

1. Download the **entire skill directory** from the repository
2. Place it in `.agents/skills/{skill-name}/` in the user's project
3. Maintain the directory structure from the library:
   ```
   .agents/skills/{skill-name}/
   ├── SKILL.md           # Required — main skill file
   ├── scripts/           # Optional — executable scripts
   ├── references/        # Optional — additional documentation
   └── assets/            # Optional — templates, images, data files
   ```

Use the GitLab API to list skill directory contents when needed:

```
https://gitlab.com/api/v4/projects/nhsbsa%2Fddat%2Ftooling%2Fflight-instructor/repository/tree?path=library/skills/{skill-name}&ref=main
```

Then download each file using its raw URL.

## Critical Rules

- **Do NOT modify** downloaded files. All skills are curated and validated — modifications could break intended functionality.
- **Preserve exact content** when downloading and placing files.
- **Create directories** as needed (`.agents/skills/`).
