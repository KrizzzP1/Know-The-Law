# ⚖ Know The Law
### An Offline-First Constitutional Rights Navigator for the Rio Grande Valley

> *"Know your rights — because in the RGV, the next checkpoint is never far away."*

---

## The Problem

The **Rio Grande Valley** is one of the most heavily policed corridors in the United States. Residents here navigate a layered law enforcement reality that most Americans never encounter: city and county police, the Texas Department of Public Safety, U.S. Border Patrol, ICE, CBP officers at interior checkpoints — all operating simultaneously across the same communities.

This is not hypothetical friction. It is daily life for the 1.4 million people who call the RGV home.

In this environment, a routine traffic stop can involve federal agents. A walk through a parking lot can trigger a stop-and-identify demand. A detainment at an interior checkpoint — some as far as 70 miles from the border — can escalate quickly when people don't know what they are and are not legally required to do.

**Most residents don't know their rights. And when they need that knowledge, there is no time to Google it.**

---

## What Know The Law Does

**Know The Law** is an interactive, decision-tree-based constitutional rights navigator built for everyday people — not lawyers.

It walks users through real scenarios step by step:

- *"Police want to search my vehicle"* — do I have to let them?
- *"I was just arrested"* — what do I say, and when do I stop talking?
- *"My bail seems too high"* — what are my options?
- *"I'm in holding"* — what rights do I still have?

Each path through the tree delivers a **plain-language explanation** of the relevant constitutional protection, a **bulleted list of rights you can assert right now**, and a **high-visibility "What to say" block** — the exact words to use in a high-stress encounter.

---

## Why the RGV Needs This

### A Community at the Intersection of Jurisdictions

The Rio Grande Valley sits at the convergence of multiple law enforcement authorities with overlapping and sometimes competing mandates:

| Agency | Presence |
|---|---|
| Local PD / Sheriff | City and county-level stops, patrols, detentions |
| Texas DPS / Highway Patrol | Traffic enforcement, narcotics interdiction on major corridors |
| U.S. Border Patrol (USBP) | Interior checkpoints on US-77, US-83, and US-281; roving patrols |
| CBP / ICE | Port of entry operations, immigration enforcement |

For residents, this means the **4th, 5th, 6th, and 8th Amendment** protections that Know The Law covers are not abstract civics concepts — they are the difference between a routine encounter and a life-altering one.

### The Offline Imperative

Rural stretches of Hidalgo, Cameron, Starr, and Willacy counties have **inconsistent cellular coverage**. Know The Law is built with **zero runtime dependencies** — no API calls, no CDN, no internet required. The entire application runs from a single folder of static files. A resident can save it to their phone, their car, or a USB drive and access it anywhere.

This is not a convenience feature. In the RGV, it is a design requirement.

### Bilingual-Ready Architecture

The RGV is one of the most Spanish-dominant regions in the country. Over **90% of residents** speak Spanish at home, and many are more comfortable navigating legal concepts in Spanish than in English. Know The Law's decision-tree data structure is designed for localization — each node's `text`, `rights`, and `advice` fields can be translated without touching the application logic. A Spanish-language layer is the immediate next step.

### Protecting the Most Vulnerable

Rights violations disproportionately impact:

- **Mixed-status families** who may not know which rights apply regardless of immigration status
- **Young people** who have never been taught what a Terry stop is or when police can legally search
- **Elderly residents** who may not speak English fluently and feel compelled to comply with any request
- **Anyone at an interior checkpoint** who doesn't know they can decline to answer questions about citizenship at a roving patrol stop

Know The Law gives these populations the same level of **situational awareness** that legal education has historically reserved for the privileged.

---

## Constitutional Coverage

| Amendment | Scenarios Covered |
|---|---|
| **4th** | Home searches, vehicle stops, street detentions, Terry frisks, phone/device searches |
| **5th** | Miranda rights, custodial interrogation, right to remain silent, compelled evidence, grand jury |
| **6th** | Right to counsel, public defenders, arraignment, speedy trial, right to know charges |
| **8th** | Bail process, excessive bail, bail denial, pre-trial detention rights, rights while in holding |

**Texas-specific nuances** are surfaced inline throughout the app, including:
- Transportation Code § 543.001 — ID requirements during traffic stops
- Penal Code § 38.02 — stop-and-identify obligations during lawful detentions
- Transportation Code § 724.011 — implied consent and DWI blood/breath tests
- Constitution Art. I § 11/11a — bail denial standards for capital and violent offenses
- CCP Art. 15.17 — magistrate hearing requirements after arrest

---

## Technical Architecture

```
Know-The-Law/
├── main.py                   # CLI version (Python 3, zero dependencies)
├── src/
│   ├── display.py            # ANSI terminal output
│   ├── navigator.py          # Decision-tree engine
│   └── amendments/           # 4th, 5th, 6th, 8th Amendment trees
└── website/
    ├── index.html            # Static shell
    ├── style.css             # Dark theme UI
    └── app.js                # All tree data + rendering logic
```

**Guiding constraints:**
- No backend. No database. No cloud.
- No npm, no pip, no build step.
- Works in a browser, a terminal, or saved to a USB drive.
- Decision trees are plain data — non-technical contributors can add scenarios.

---

## Roadmap

- [ ] Spanish-language translation layer
- [ ] 1st Amendment scenarios (protest rights, press freedom)
- [ ] Know Your Rights at checkpoints — dedicated CBP/USBP encounter module
- [ ] Printable PDF rights cards for distribution at community centers
- [ ] Accessible mode (screen reader optimized, high-contrast)

---

## Built For

This project was built for **[Hackathon Name]** with the Rio Grande Valley community in mind — a region whose residents deserve the same access to legal knowledge that money and education have always provided to others.

---

*Know The Law is for educational purposes only and does not constitute legal advice. For legal representation, contact the [Texas RioGrande Legal Aid](https://www.trla.org) or the [American Civil Liberties Union of Texas](https://www.aclutx.org).*
