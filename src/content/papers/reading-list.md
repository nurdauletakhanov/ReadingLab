---
title: "ML/AI Reading List: Foundations to Frontier"
updated: 2026-08-21
---

## Part 1 — Core Supervised ML

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 1958 | Rosenblatt | The Perceptron | Linear classifier origins |
| 1936 | Fisher | Multiple Measurements in Taxonomic Problems | LDA |
| 1933 | Hotelling | Analysis of a complex of statistical variables | PCA |
| 1967 | Cover & Hart | Nearest Neighbor Pattern Classification | kNN |
| 1970 | Hoerl & Kennard | Ridge Regression | L2 regularization |
| 1981 | Stein | Estimation of the Mean of a Multivariate Normal Distribution | Shrinkage / SURE |
| 1996 | Tibshirani | Regression Shrinkage and Selection via the Lasso | L1 regularization |
| 2004 | Efron, Hastie, Johnstone, Tibshirani | Least Angle Regression | LARS / Lasso solution path |
| 2005 | Zou & Hastie | Regularization and variable selection via the Elastic Net | L1+L2 |
| 1995 | Cortes & Vapnik | Support-Vector Networks ⭐ | SVM |

---

## Part 2 — Trees and Ensembles

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 1986 | Quinlan | Induction of Decision Trees | ID3 |
| 1984 | Breiman et al. | Classification and Regression Trees | CART |
| 1996 | Breiman | Bagging Predictors | Bagging |
| 1997 | Freund & Schapire | A decision-theoretic generalization of on-line learning | AdaBoost |
| 2001 | Friedman | Greedy Function Approximation: A Gradient Boosting Machine | GBM |
| 2001 | Breiman | Random Forests ⭐ | RF |
| 2016 | Chen & Guestrin | XGBoost ⭐ | Gradient boosting at scale |
| 2018 | Prokhorenkova et al. | CatBoost: unbiased boosting with categorical features | CatBoost |

---

## Part 3 — Probabilistic ML and Structured Prediction

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 1977 | Dempster, Laird, Rubin | Maximum Likelihood from Incomplete Data via EM ⭐ | EM Algorithm |
| 1989 | Rabiner | Tutorial on Hidden Markov Models | HMM |
| 2001 | Lafferty, McCallum, Pereira | Conditional Random Fields | CRF |
| 2003 | Blei, Ng, Jordan | Latent Dirichlet Allocation | Topic models |

---

## Part 4 — Optimization and "How to Train"

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 1951 | Robbins & Monro | A Stochastic Approximation Method | SGD origins |
| 2010 | Glorot & Bengio | Understanding the difficulty of training deep feedforward networks | Xavier init |
| 2014 | Srivastava et al. | Dropout | Regularization |
| 2014 | Kingma & Ba | Adam ⭐ | Adaptive optimizer |
| 2015 | He et al. | Delving Deep into Rectifiers | He init |
| 2015 | Ioffe & Szegedy | Batch Normalization ⭐ | BN |
| 2016 | Ba, Kiros, Hinton | Layer Normalization ⭐ | LN |
| 2017 | Loshchilov & Hutter | Decoupled Weight Decay Regularization | AdamW |
| 2019 | Liu et al. | On the Variance of the Adaptive Learning Rate | RAdam |

---

## Part 5 — Deep Learning Vision Backbones

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 1986 | Rumelhart, Hinton, Williams | Learning representations by back-propagating errors ⭐ | Backprop |
| 1998 | LeCun et al. | Gradient-Based Learning Applied to Document Recognition | LeNet |
| 2012 | Krizhevsky, Sutskever, Hinton | AlexNet ⭐ | Modern DL begins |
| 2014 | Simonyan & Zisserman | VGG | Deep convnets |
| 2015 | He et al. | Deep Residual Learning ⭐🔨 | ResNet |
| 2015 | Ronneberger et al. | U-Net 🎵 | Encoder-decoder with skips |
| 2016 | Huang et al. | Densely Connected Convolutional Networks | DenseNet |
| 2017 | Howard et al. | MobileNets | Efficient CNNs |
| 2020 | Dosovitskiy et al. | An Image is Worth 16x16 Words ⭐🔨 | ViT |
| 2021 | Liu et al. | Swin Transformer | Hierarchical ViT |

---

## Part 6 — NLP: Embeddings → Seq2Seq → Transformers

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2003 | Bengio et al. | A Neural Probabilistic Language Model | Origin of neural LMs |
| 2013 | Mikolov et al. | Efficient Estimation of Word Representations ⭐ | word2vec |
| 2014 | Pennington, Socher, Manning | GloVe | Embeddings |
| 1997 | Hochreiter & Schmidhuber | Long Short-Term Memory ⭐ | LSTM |
| 2014 | Cho et al. | Learning Phrase Representations using RNN Encoder-Decoder | GRU |
| 2014 | Sutskever, Vinyals, Le | Sequence to Sequence Learning | Seq2Seq |
| 2014 | Bahdanau, Cho, Bengio | Neural Machine Translation by Jointly Learning to Align and Translate ⭐ | Attention |
| 2017 | Vaswani et al. | Attention Is All You Need ⭐🔨 | Transformer |
| 2018 | Devlin et al. | BERT ⭐ | Bidirectional pretraining |
| 2018 | Radford et al. | Improving Language Understanding by Generative Pre-Training | GPT-1 |
| 2019 | Radford et al. | Language Models are Unsupervised Multitask Learners | GPT-2 |
| 2020 | Brown et al. | Language Models are Few-Shot Learners ⭐ | GPT-3 |
| 2021 | Su et al. | RoFormer | RoPE |
| 2022 | Dao et al. | FlashAttention 🔨 | Memory-efficient attention |
| 2023 | Touvron et al. | LLaMA ⭐ | Open-source frontier |
| 2023 | Touvron et al. | LLaMA 2 | Production model details |

---

## Part 7 — Self-Supervised & Representation Learning

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2015 | Ganin & Lempitsky | Unsupervised Domain Adaptation by Backpropagation ⭐🔨 | Gradient Reversal Layer |
| 2016 | Ganin et al. | Domain-Adversarial Training of Neural Networks ⭐ | DANN (JMLR, extended) |
| 2018 | van den Oord et al. | Representation Learning with Contrastive Predictive Coding | CPC |
| 2020 | He et al. | Momentum Contrast ⭐ | MoCo |
| 2020 | Chen et al. | A Simple Framework for Contrastive Learning ⭐🔨 | SimCLR |
| 2020 | Grill et al. | Bootstrap Your Own Latent | BYOL |
| 2021 | Caron et al. | Emerging Properties in Self-Supervised Vision Transformers | DINO |
| 2021 | He et al. | Masked Autoencoders Are Scalable Vision Learners ⭐🔨 | MAE |
| 2021 | Radford et al. | CLIP ⭐ | Multimodal contrastive |
| 2023 | Oquab et al. | DINOv2 | SOTA self-supervised features |
| 2023 | Assran et al. | I-JEPA ⭐🎵 | Joint embedding predictive |
| 2024 | Bardes et al. | V-JEPA 🎵 | Video JEPA |
| 2024 | Balestriero et al. | LeJEPA 🎵 | Theoretical foundations |

---

## Part 8 — Generative Modeling

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2013 | Kingma & Welling | Auto-Encoding Variational Bayes ⭐🔨🎵 | VAE |
| 2014 | Goodfellow et al. | Generative Adversarial Networks ⭐🔨 | GAN |
| 2015 | Radford, Metz, Chintala | DCGAN | Convolutional GAN |
| 2017 | Arjovsky et al. | Wasserstein GAN | Stable training |
| 2017 | Karras et al. | Progressive Growing of GANs | PGGAN |
| 2017 | van den Oord et al. | Neural Discrete Representation Learning ⭐🎵 | VQ-VAE |
| 2018 | Karras et al. | StyleGAN ⭐🎵 | Style-based generation |
| 2019 | Karras et al. | StyleGAN2 🎵 | Refined version |
| 2020 | Ho, Jain, Abbeel | Denoising Diffusion Probabilistic Models ⭐🔨🎵 | DDPM |
| 2020 | Song et al. | Score-Based Generative Modeling through SDEs ⭐ | Continuous diffusion |
| 2021 | Nichol & Dhariwal | Improved DDPM | Practical refinements |
| 2021 | Song et al. | Denoising Diffusion Implicit Models | DDIM |
| 2022 | Rombach et al. | High-Resolution Image Synthesis with Latent Diffusion ⭐🎵 | Stable Diffusion |
| 2022 | Karras et al. | Elucidating the Design Space of Diffusion-Based Generative Models ⭐ | EDM |
| 2022 | Peebles & Xie | Scalable Diffusion Models with Transformers | DiT |
| 2023 | Song et al. | Consistency Models ⭐🎵 | Single-step generation |
| 2023 | Lipman et al. | Flow Matching for Generative Modeling | Flow-based alternative |

---

## Part 9 — Graph ML

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2016 | Kipf & Welling | Graph Convolutional Networks | GCN |
| 2017 | Veličković et al. | Graph Attention Networks | GAT |
| 2017 | Hamilton et al. | Inductive Representation Learning on Large Graphs | GraphSAGE |

---

## Part 10 — Reinforcement Learning

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 1988 | Sutton | Learning to Predict by the Methods of Temporal Differences | TD learning |
| 1989 | Watkins | Q-learning | Q-learning |
| 1992 | Williams | REINFORCE | Policy gradient origins |
| 2015 | Mnih et al. | Human-level control through deep RL ⭐ | DQN |
| 2016 | Silver et al. | Mastering the game of Go ⭐ | AlphaGo |
| 2017 | Silver et al. | Mastering the game of Go without human knowledge | AlphaGo Zero |
| 2017 | Schulman et al. | Proximal Policy Optimization ⭐ | PPO |
| 2018 | Haarnoja et al. | Soft Actor-Critic | SAC |
| 2018 | Espeholt et al. | IMPALA | Distributed RL |

---

## Part 11 — Scaling and Theory

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2020 | Kaplan et al. | Scaling Laws for Neural Language Models ⭐ | Power-law scaling |
| 2022 | Hoffmann et al. | Training Compute-Optimal Large Language Models ⭐ | Chinchilla |
| 2022 | Wei et al. | Emergent Abilities of Large Language Models | Phase transitions |
| 2024 | Anthropic | Predictability and Surprise in Large Generative Models | Capability research |

---

## Part 12 — Audio ML 🎵

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2016 | van den Oord et al. | WaveNet ⭐ | Autoregressive audio |
| 2017 | van den Oord et al. | Parallel WaveNet | Distillation for speed |
| 2018 | Engel et al. | GANSynth | Audio GAN |
| 2020 | Kong et al. | HiFi-GAN ⭐🔨 | Vocoder, your decoder uses MRF blocks from this |
| 2020 | Kumar et al. | MelGAN | Earlier vocoder |
| 2021 | Caillon & Esling | RAVE | Audio VAE |
| 2021 | Zeghidour et al. | SoundStream | Neural codec |
| 2022 | Défossez et al. | EnCodec ⭐ | Production codec |
| 2023 | Kumar et al. | DAC ⭐ | Your testbed inspiration |
| 2023 | Liu et al. | AudioLDM | Audio latent diffusion |
| 2024 | Pasini & Schlüter | Music2Latent ⭐ | Your direct work |
| 2024 | Evans et al. | Stable Audio Open | Production music gen |
| 2023 | Copet et al. | Simple and Controllable Music Generation | MusicGen |
| 2024 | Tjandra et al. | MAR (Masked Audio Representation) | AR audio variants |
| 2026 | Torres et al. | Learning Linearity in Audio Consistency Autoencoders ⭐ | Your direct competitor |

---

## Part 13 — Music Information Retrieval

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2017 | Choi et al. | Convolutional Recurrent NNs for Music Classification | CRNN |
| 2018 | Pons & Serra | musicnn | Music tagging |
| 2021 | Spijkervet & Burgoyne | CLMR | Contrastive music |
| 2022 | McCallum et al. | MULE | Music understanding |
| 2023 | Li et al. | MERT ⭐ | Current SOTA music representation |
| 2023 | Wu et al. | CLAP | Audio-text contrastive |

---

## Part 14 — Parameter-Efficient Fine-Tuning and Alignment

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2019 | Houlsby et al. | Parameter-Efficient Transfer Learning | Adapters |
| 2021 | Hu et al. | LoRA ⭐🔨 | Low-rank adaptation |
| 2021 | Li & Liang | Prefix-Tuning | Prefix tokens |
| 2021 | Lester et al. | The Power of Scale for Parameter-Efficient Prompt Tuning | Prompt tuning |
| 2023 | Dettmers et al. | QLoRA ⭐ | 4-bit + LoRA |
| 2024 | Liu et al. | DoRA: Weight-Decomposed Low-Rank Adaptation | Decomposed LoRA |
| 2024 | Meng et al. | PiSSA | Principal singular values |
| 2024 | Hayou et al. | LoRA+ | Asymmetric learning rates |
| 2017 | Christiano et al. | Deep Reinforcement Learning from Human Preferences | RLHF foundations |
| 2022 | Ouyang et al. | InstructGPT / RLHF ⭐ | Instruction tuning |
| 2023 | Rafailov et al. | Direct Preference Optimization ⭐🔨 | DPO |
| 2024 | Hong et al. | ORPO | Reference-free preference |
| 2024 | Shao et al. (DeepSeekMath) | GRPO ⭐ | Group relative policy optimization |

---

## Part 15 — Frontier Models and Technical Reports

| Year | Authors | Title | Concept |
|------|---------|-------|---------|
| 2023 | Anthropic | Claude / Constitutional AI | Alignment approach |
| 2024 | Anthropic | Claude 3 Technical Report | Frontier capabilities |
| 2024 | DeepSeek | DeepSeek-V2 ⭐ | MLA + MoE |
| 2024 | DeepSeek | DeepSeek-V3 ⭐ | FP8, auxiliary-loss-free balancing |
| 2025 | DeepSeek | DeepSeek-R1 ⭐ | RL-only reasoning |
| 2024 | Qwen Team | Qwen2 Technical Report | Strong open model |
| 2024 | Qwen Team | Qwen2.5 Technical Report | Updated |
| 2024 | Qwen Team | Qwen2-Audio 🎵 | Audio-capable LLM |
| 2025 | Moonshot | Kimi K1.5 / K2 | Long context |
| 2025 | MiniMax | MiniMax-01 | Lightning attention at scale |
| 2024 | 01.AI | Yi Technical Report | Open frontier model |
| 2024 | Google | Gemini Technical Report | Multimodal frontier |
