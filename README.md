# Sentinel Region

Create a polished, modern, responsive web application called NER Sentinel.

NER Sentinel is an AI-powered landslide risk monitoring and emergency response platform designed for the North Eastern Region of India. It helps district administrations, disaster management authorities, and field officials monitor vulnerable zones, understand rainfall-linked risk, manage incidents, and prioritize emergency response.

Important: This is a realistic MVP. Do not claim that the system can accurately predict the exact time or location of a landslide. The interface should use terms such as Risk Score, Predicted Risk, High-Risk Zone, and Early Warning.

Design direction

Create a professional government disaster-management command center interface.

Clean, modern, premium SaaS dashboard aesthetic.

Light theme with deep navy, slate, white, and restrained red/orange/yellow risk accents.

Use a consistent design system with rounded cards, subtle borders, readable typography, and generous spacing.

Avoid excessive gradients, neon colors, glassmorphism, and unnecessary animations.

Fully responsive for desktop, tablet, and mobile.

Use realistic sample data from the North Eastern Region of India.

Do not use lorem ipsum.

Use Lucide icons.

Make the application feel like a real operational product, not a generic admin template.

Application structure

Create these pages:

Login

Dashboard

Risk Map

Risk Analysis

Field Reports

Alerts & Notifications

Response Prioritisation

Data Sources

Settings

Create a consistent sidebar navigation and top header.

Sidebar

NER Sentinel logo

Dashboard

Risk Map

Risk Analysis

Field Reports

Alerts

Response Prioritisation

Data Sources

Settings

Header

Current region: North Eastern Region

Search

Notification icon

User profile

Language selector: English / Hindi

Mobile menu

1. Dashboard

Create a command-center dashboard with:

Top KPI cards

Monitored Zones: 128

High-Risk Zones: 18

Active Alerts: 7

Roads Affected: 12

Use realistic sample values and small trend indicators.

Main risk overview

A large card titled Regional Risk Overview.

Include:

Interactive-looking risk map preview

Risk legend: Low, Moderate, High, Critical

Risk zone markers

Map controls

Region label

Use a real map library if available, otherwise create a clean map-style placeholder that can later be replaced with Leaflet.

Risk distribution

Show a visual breakdown:

Low

Moderate

High

Critical

Weather-linked risk forecast

Create a 24-hour rainfall/risk forecast card with:

Rainfall

Soil moisture

Risk trend

Forecast timeline

Clearly label sample/demo data.

Recent alerts

Show alert cards with:

Severity

Location

Time

Status

View details button

Response priority

Show a compact table:

Priority

Location

Risk

Road status

Recommended action

2. Risk Map

Create a dedicated full-width GIS monitoring page.

Features:

Large interactive-looking map

Risk heatmap styling

Markers for vulnerable zones

Road blockage markers

Village markers

Infrastructure markers

Search location

District filter

Risk severity filter

Layer controls

Legend

Sample locations:

Tawang

East Sikkim

Aizawl

Kohima

Imphal

Shillong

Guwahati

Agartala

Add a right-side selected-zone panel showing:

Zone name

Risk score

Severity

Rainfall

Soil moisture

Slope

Last updated

Nearby road status

Recommended action

3. Risk Analysis

Create a detailed risk analysis page.

Selected zone header

Example:
Tawang — Zone TAW-014

Show:

Risk score: 82/100

Severity: High

Last updated

Status badge

Risk factors

Display cards for:

Rainfall intensity

Soil moisture

Slope angle

Terrain susceptibility

Historical incidents

Risk score explanation

Create a clear visual explanation:

Rainfall contribution

Soil moisture contribution

Terrain contribution

Historical risk contribution

Use a horizontal bar chart or progress bars.

Forecast timeline

Show risk score over the next 24 hours.

Recommended actions

Examples:

Inspect vulnerable road section

Monitor slope movement

Alert field officials

Prepare alternate route

Review nearby village evacuation readiness

Historical incidents

Create a table with:

Date

Location

Incident type

Severity

Status

4. Field Reports

Create a field reporting page for citizens and officials.

Report form

Fields:

Incident type

Location

Description

Severity

Photo upload

Video upload

Reporter name

Contact number

Incident types:

Landslide

Road blockage

Slope crack

Soil movement

Flash flood

Infrastructure damage

Include:

Use current location button

Upload preview

Submit report button

Reports list

Create a table/card list with:

Report ID

Location

Incident type

Severity

Reported by

Date

Status

View details

Use realistic sample reports.

5. Alerts & Notifications

Create an alert management page.

Alert cards

Each alert should show:

Severity

Alert title

Location

Trigger

Time

Status

Acknowledge button

Alert creation panel

Fields:

Select zone

Alert severity

Alert message

Notification channels

Language

Notification channels:

In-app

SMS

Email

Include multilingual preview:

English

Hindi

6. Response Prioritisation

Create an emergency response queue.

Priority table

Columns:

Priority

Zone

Risk score

Incident

Road connectivity

Nearby population

Response team

Status

Use clear priority badges:

Critical

High

Medium

Low

Recommended action panel

Show:

Why this zone is prioritized

Risk factors

Suggested action

Assigned team

Estimated response urgency

7. Data Sources

Create a data-source monitoring page.

Cards for:

Rainfall data

Weather forecast

Soil moisture sensors

Satellite imagery

Terrain/slope data

Historical landslide records

Each card should show:

Source name

Status: Connected / Demo / Pending

Last updated

Data type

Configure button

Clearly distinguish real integrations from demo/sample sources.

8. Settings

Create settings sections for:

Profile

Language

Notification preferences

Alert thresholds

Data source configuration

System preferences

Functional requirements

Use React + TypeScript.

Use reusable components.

Use a clean component structure.

Use responsive layouts.

Use realistic sample data.

Add client-side navigation between pages.

Add working filters, tabs, search, and buttons where appropriate.

Use local state for demo interactions.

Keep the code clean and easy to extend.

Do not build a fake backend.

Do not claim that live APIs, AI models, SMS, or satellite feeds are connected unless they actually are.

Keep the frontend ready for future integration with a Node.js/Express backend and PostgreSQL/PostGIS database.

Final quality bar

The result should look like a real disaster-management SaaS product that can be demonstrated to judges, government stakeholders, or potential customers.

Prioritize:

Excellent dashboard

Excellent GIS map experience

Clear risk analysis

Professional field reporting

Strong emergency response workflow

Consistent visual design

Make the UI polished, practical, and presentation-ready.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/07859a9c-b9a9-43f7-a625-2ea813d6506f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
