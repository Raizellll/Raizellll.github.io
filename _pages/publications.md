---
layout: page
title: "Publications & Writing"
permalink: /publications/
description: "Manuscripts, technical reports, and selected writing samples."
nav: true
nav_order: 3
---

## Manuscripts

### **Demand-Driven Modularity in Fine-Tuned Transformers**  
**Yiran Xu**, Robert P. Dick  
*Manuscript in preparation, targeting ICML 2026.*

A study of when and why modular structure emerges in Transformers.  
Through multi-task fine-tuning experiments (e.g., Math vs. Sentiment), we find that  
modularity does **not** arise from input distribution shifts but emerges only under  
**strong functional conflict**. We also show that optimization favors **shared low-rank  
subspaces**, and modularity is an **efficiency–accuracy tradeoff** rather than  
a natural property of the architecture.

- **PDF:** coming soon  
- **Abstract:** coming soon  
- **Slides:** coming soon  

---

## Technical Reports & Writing Samples

### **Activation Subspace Rubrics for Evaluating Long-Form Reasoning**  
*Technical report draft, 2025.*

An exploration of how **activation geometry** in LLMs can be mapped to  
interpretable rubrics for reasoning quality, process correctness, and creativity.  
We identify latent subspaces consistently correlated with “good reasoning” signals  
and validate them via causal interventions.

- **PDF:** coming soon  
- **Code (private):** available upon request  

---

### **Representation Collapse and Low-Rank Bottlenecks in Transformers**  
*Internal research memo, 2025.*

Empirical evidence of a persistent low-rank bottleneck in final Transformer layers  
(e.g., Layer 12 of DeBERTa-v3-base), where >95% of task variance resides in a  
dominant subspace. Includes CKA, SVD, ΔW/W flow tracking, and causal ablations.

- **PDF:** coming soon  

---

## Selected Presentations

- **Research Overview Slides (Nov 2025)**  
  *Links pending after polishing.*  

---

## Research Notes (optional, can be hidden for now)

These are informal notes or extended analyses from ongoing projects.  
Once your ICML manuscript is closer to submission, you can selectively expose these.

- Notes on Gradient Flow and Early-Layer Feature Sufficiency  
- Notes on Modularity vs. Functional Conflict  
- Notes on Activation Steering for Reasoning Rubrics

---

## Bibliography (optional)

If you want to keep your Jekyll Scholar integration (not required now),  
you can still include it below:

{% include bib_search.liquid %}
<div class="publications">
{% bibliography %}
</div>

