---
layout: page
title: Projects
permalink: /projects/
nav: true
order: 4
---

## HCI: MCP-Enhanced Smart Personal Assistant  
**LLM + Multi-Tool Orchestration + Personalized Workflows**  
*(Screenshots & description extracted from uploaded report)* :contentReference[oaicite:1]{index=1}

An intelligent assistant prototype integrating “fast path / slow path” routing, dual-channel memory, and Gaode Map MCP.

**Core Features**
- **Smart routing**:  
  - Simple tasks → fast local LLM response  
  - Complex tasks → multi-tool workflow (search + maps + external APIs)
- **Personalized navigation** integrating Gaode MCP (bike + metro routing).
- **Lifestyle automation** using natural-language “shortcut commands”:  
  - *“It's a new day”*: Daily briefing with weather, schedule, news  
  - *“I really wanna progress”*: Research-focused information push  
  - *“I'm a bit tired”*: Mood-aware content recommendations
- Demonstrates proactive, multimodal, personalized HCI design.

---

## Transportation Network Optimization After the Francis Scott Key Bridge Collapse  
**Python · OpenStreetMap · DBSCAN · Dijkstra**

A data-driven urban mobility optimization workflow analyzing and mitigating real-world infrastructure failure.

**Key Results**
- Modeled pre-/post-collapse traffic networks using OSM road graphs and shortest-path simulation.
- Found **42% increase** in average travel distance and **15%** unreachable OD pairs.
- Redesigned Baltimore’s bus system via DBSCAN-based demand clustering, improving:
  - **Coverage**: 72% → **95%** population within 500m of a bus stop  
  - **Commute time**: −18%  
  - **CO₂ emissions**: −12%  
  - **Annual cost savings**: **$4.2M**
- Proposed optimized routes prioritizing underserved communities.

---

## Multi-Stage Manufacturing Optimization (Genetic Algorithms + Fuzzy Logic)  
**Optimization · GA · Fuzzy Inference · Statistical Quality Control**

An adaptive decision framework for multi-stage production systems under uncertain defect rates.

**Highlights**
- Built hypothesis-test–driven inspection thresholds:
  - 95% confidence rejection: **n = 609**
  - 90% acceptance: **n = 370**
- Developed a multi-phase profitability model achieving **$6,609 per 100 units**, outperforming baseline by **18%**.
- Integrated **triangular fuzzy numbers** with GA to handle defect-rate uncertainty, reaching **97.3% robustness** under ±2% noise.
- Scaled the model from **2 → 8 components**, maintaining **99.2%** consistency across stages.

---

## CLIP Zero-Shot Vision & Text Classification  
**PyTorch · Contrastive Learning · Prompt Engineering**

A comprehensive exploration of CLIP’s zero-shot generalization across vision and text.

**Key Contributions**
- Evaluated CLIP on CIFAR-100, Food101, and Oxford-IIIT Pets, achieving **63–80% accuracy**, and diagnosed failures in fine-grained classes (e.g., Persian vs Maine Coon).
- Performed systematic *prompt engineering* (hierarchical superclasses, task-structured prompts, CHiLS-style templates).
- Designed **CLIPText**, a novel zero-shot *text* classifier reframing NLP tasks as cross-modal matching.  
  → Boosted AGNews accuracy from **18% → 43%** using PROMPT-CLIPText without any training data.
- Tested robustness on stylized anime images (“catgirl” domain), showing **>85% confidence** and strong semantic generalization.


---
