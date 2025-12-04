---
layout: page
title: "Research"
permalink: /research/
---

## Overview

My research aims to understand **how large language models internally organize computation**,  
and why modular reasoning sometimes **emerges**, sometimes **fails to emerge**, and sometimes  
**collapses into low-rank shared subspaces**. I work at the intersection of:

- **Mechanistic interpretability**  
- **Representation geometry & modularity**  
- **Optimization dynamics (gradient flow, efficiency bias)**  
- **Activation-based evaluation of long-form reasoning and creativity**

I am particularly interested in developing a **theory of modularity** that connects  
*optimization behavior*, *representation geometry*, and *task-level functional structure*.

---

## 🔹 1. Demand-Driven Modularity in Transformers  
**with Prof. Robert Dick, University of Michigan (2025– )**

Modularity is often assumed to “naturally emerge” in Transformers, but my multi-task  
experiments reveal a different picture: **modularity only appears when functional conflict  
is sufficiently strong**, not when input distributions differ.

### Key findings
- **Distribution shift alone does not produce modules.**  
  Tasks such as Movie vs. Food sentiment share a dominant low-rank space.

- **Functional conflict induces clear representational separation.**  
  Math vs. Sentiment or Logic vs. Emotion leads to disentangled subspaces.

- **Transformers exhibit an *efficiency bias*.**  
  They reuse shared features aggressively and only separate when forced.

### Methods
- Layer-wise representation geometry (SVD / CKA / PCA curvature)  
- ΔW/W gradient-flow tracking across fine-tuning  
- Task-probing via L0/L12 linear classifiers  
- Causal ablations on singular directions vs. neuron subsets  

### Contribution
This work provides a **unified optimization-based explanation** for why modularity  
emerges selectively, challenging the assumption that modularity is an inherent property  
of LLMs rather than an **optimization outcome**.

### Status
Preparing a manuscript targeting **ICML 2026**.

---

## 🔹 2. Low-Rank Collapse and Representation Bottlenecks

Across diverse task pairs, I consistently observe that the final layers—especially **Layer 12  
in DeBERTa-v3-base**—collapse into a **dominant low-rank subspace** that captures >95% of task  
variance. This low-rank bottleneck often prevents the formation of distinct experts.

### Insights
- A few singular directions encode nearly all task-specific behavior.  
- Large groups of FFN neurons are **functionally redundant**.  
- Removing top singular directions significantly degrades task accuracy,  
  while ablating many neurons barely affects performance.  

These findings support the hypothesis that **LLMs prefer shared, compressed manifolds**  
unless conflict forces expansion into modular subspaces.

---

## 🔹 3. Early-Layer Gradient Starvation Revisited

Existing interpretations attribute early-layer stagnation to vanishing gradients.  
My analysis shows the opposite: early layers achieve **feature sufficiency** early in training.

### Evidence
- L0 probe accuracy reaches **1.0**, indicating “perfect” token-level feature extraction.  
- ΔW/W updates become tiny not due to gradient loss, but because *further feature changes  
do not improve the objective*.  
- Late layers absorb coherent, task-differentiating gradients.

This reframes “gradient starvation” as a **functional, not optimization-failure** phenomenon.

---

## 🔹 4. Activation Subspaces as Evaluation Rubrics  
**with Prof. Yixin Cao, Fudan University (2024– )**

I explore whether **interpretable activation subspaces** can serve as computational rubrics  
for evaluating reasoning, process correctness, and creativity in generative models.

### Goals
- Identify latent activation directions that correspond to reasoning quality  
- Build activation-based rubrics that evaluate *process*, not just final answer  
- Validate causal link via activation steering and ablation  

This line of work connects **interpretability** with **LLM evaluation**, moving beyond token-level  
metrics toward “reasoning-aware” assessment.

---

## Selected Slides & Writing Samples

- 🔗 *Research Slides (Nov 2025)* — [link coming soon]  
- 🔗 *Technical Report Draft* — [link coming soon]  
- 🔗 *ICML 2026 Manuscript (in preparation)* — [abstract coming soon]

---

## Future directions

I plan to pursue a PhD on:

- The causal structure of reasoning in LLMs  
- When and how modular reasoning can be reliably induced  
- Activation geometry as a foundation for interpretable evaluation  
- Designing objectives that promote **functional specialization**  
- Understanding optimization biases that govern emergent structures  

My long-term goal is to build a principled framework for **modular, interpretable,  
and controllable reasoning systems**.

