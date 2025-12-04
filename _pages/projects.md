---
layout: page
title: Projects
permalink: /projects/
nav: true
nav_order: 4
---

# Research Infrastructure & Experiment Systems

## Demand-Driven Modularity Analysis Pipeline (UMich EECS)
**PyTorch · Distributed Training · Activation Analysis · CKA/SVD Pipeline · Causal Ablation**

A full-stack experimental framework for studying **when and why modularity emerges in Transformers**.

**Key Components**
- Multi-task fine-tuning system (Math vs Sentiment, Logic vs Emotion, etc.)
- Layer-wise representation logging for activations & hidden states
- ΔW/W gradient-flow tracking across all training steps
- Low-rank structure analyzer: SVD, CKA similarity curves, PCA curvature
- Causal intervention engine: singular-direction ablation vs neuron ablation
- Visualization suite for modularity trajectories & rank evolution  

**Impact**  
Supports the core findings behind “Demand-Driven Modularity” and enables reproducible, large-scale mechanistic experiments.

---

## Activation-Subspace Rubric System for Reasoning Evaluation (Fudan NLP/IR)
**Sparse Autoencoders · Dictionary Learning · Causal Steering · Representation Geometry**

A toolkit for mapping activation subspaces of LLMs into **interpretable rubrics** for evaluating reasoning quality.

**Features**
- Dictionary learning & SAE-based latent concept extraction  
- Discovery of “reasoning quality” activation directions  
- Causal manipulation (activation injection / suppression)  
- Per-step evaluation on LongWriter / HelloBench  
- Cross-model generalization tests  

**Impact**  
Moves LLM evaluation from “outcome-based” assessment to **process-aware interpretation**.

---

## LongWriter + HelloBench Data Generation & Evaluation Pipeline
**LLM Generation · Long-Context Handling · JSON-Structured Evaluation · Cluster Execution**

A reproducible system for generating and evaluating long-form outputs across 5 benchmark subsets.

**Core Features**
- Multi-GPU distributed inference  
- Automatic long-context prompt assembly  
- Structured scoring for factuality, creativity, reasoning chain quality  
- Error detection for hallucination / formatting issues  
- Batch monitoring & logging system  

**Impact**  
Produces high-quality long-form datasets for evaluating LLM reasoning and creativity.

---

# Engineering & Applied Projects

## HCI: MCP-Enhanced Smart Personal Assistant  
**LLM + Multi-Tool Orchestration + Personalized Workflows**

*(Screenshots & description extracted from uploaded report)* :contentReference[oaicite:1]{index=1}

An intelligent assistant prototype integrating “fast path / slow path” routing, dual-channel memory, and Gaode Map MCP.

**Core Features**
- Smart task routing (local LLM vs multi-tool workflows)  
- Personalized navigation using Gaode MCP  
- Lifestyle automation via natural-language “shortcut commands”

---

## Transportation Network Optimization After the Key Bridge Collapse  
**Python · OpenStreetMap · DBSCAN · Dijkstra**

Urban mobility optimization pipeline analyzing real infrastructure failure.

**Highlights**
- 42% travel distance increase detected post-collapse  
- Bus network redesigned via clustering  
- 18% commute time reduction & \$4.2M annual savings  

---

## Multi-Stage Manufacturing Optimization  
**Genetic Algorithms · Fuzzy Logic · Statistical Quality Control**

An adaptive decision-support system under uncertain defect rates.

**Highlights**
- Hypothesis-test–driven inspection thresholds  
- 18% profitability improvement  
- Robust to ±2% defect-rate noise  

---

## CLIP Zero-Shot Vision & Text Classification  
**PyTorch · Contrastive Learning · Prompt Engineering**

Explored CLIP’s generalization across images & NLP.

**Key Contributions**
- 63–80% accuracy on CIFAR/Food101/Pets  
- Novel “CLIPText” zero-shot NLP classifier  
- Improved AGNews from 18% → 43%  
- Robustness tested on stylized anime images  

---
