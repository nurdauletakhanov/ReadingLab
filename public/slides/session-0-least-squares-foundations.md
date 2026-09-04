---
marp: true
theme: default
paginate: true
math: mathjax
size: 16:9
style: |
  section { background: #f7f7f5; color: #24282e; font-family: Arial, Helvetica, sans-serif; font-size: 26px; line-height: 1.35; padding: 54px 72px; }
  h1, h2 { color: #24282e; font-family: Georgia, "Times New Roman", serif; font-weight: 600; }
  h1 { font-size: 60px; line-height: 1.08; }
  h2 { font-size: 40px; margin: 0 0 22px; }
  table { font-size: 22px; }
  th { background: #f6ecd6; }
  ul { padding-left: 1.1em; }
  li { margin-bottom: .35em; }
  li::marker { color: #a8710a; }
  .label { color: #a8710a; font-size: 15px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; margin: 0 0 8px; }
  .eq { background: #f6ecd6; border-radius: 8px; padding: 6px 20px; text-align: center; font-size: 26px; margin: 12px 0 22px; }
  .eq p { margin: 0; }
  .mono { font-family: Menlo, monospace; font-size: 20px; text-align: left; display: inline-block; }
  .note { color: #6b7280; font-family: Georgia, serif; font-size: 20px; margin-top: 26px; }
  .subtitle { color: #6b7280; font-family: Georgia, serif; font-size: 28px; }
  .side { display: grid; grid-template-columns: 1fr 420px; gap: 36px; align-items: start; }
  .wide { display: grid; grid-template-columns: 640px 1fr; gap: 32px; align-items: start; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .dense { font-size: 20px; gap: 34px; }
  .dense li { margin-bottom: .2em; }
  img { background: transparent; }
---

<p class="label">ReadingLab · Session 0</p>

# Least Squares Foundations

<p class="subtitle">Session 0 · what the ridge paper assumes you already know</p>

Nurdaulet Akhanov<br>Friday, 4 September 2026 · 6 pm · Lecture Hall 1

---

<p class="label">Why a Session 0</p>

## Fourteen pages that take five things for granted

Hoerl & Kennard (1970) never explain these. Today we build them from one table of cars:

- the linear model written as  Y = Xβ + ε
- correlation between predictors as an angle
- the eigenvalues of XᵀX, and why a small one is bad news
- least squares: unbiased, with covariance σ²(XᵀX)⁻¹
- error = variance + bias², so unbiased is not the same as accurate

<p class="note">Session 1 uses all five to break least squares, then to fix it.</p>

---

<p class="label">Part I · The model</p>

## Five cars, three numbers each

| Car | Weight (t) | Horsepower | Fuel (L/100 km) |
|---|---:|---:|---:|
| 1 | 1.2 | 95 | 6.4 |
| 2 | 1.4 | 100 | 7.1 |
| 3 | 1.0 | 90 | 5.8 |
| 4 | 1.8 | 150 | 9.6 |
| 5 | 1.6 | 115 | 8.2 |

We want to predict fuel from the other two columns.

Fuel is the response. Weight and horsepower are the predictors.

---

<p class="label">Part I · The model</p>

## From the table to an equation

<div class="eq">

$$
\text{fuel}_i = \beta_1\,\text{weight}_i + \beta_2\,\text{horsepower}_i + \varepsilon_i
$$

</div>

- β₁ and β₂ belong to the relationship, not to any single car. They are what we want.
- εᵢ is everything the two measurements miss: driver, tyres, weather, the scale.
- No amount of staring at the table reveals β. We will have to estimate it.

---

<p class="label">Part I · The model</p>

## Five equations become one

<div class="eq">

$$
\underbrace{\begin{pmatrix}6.4\\7.1\\5.8\\9.6\\8.2\end{pmatrix}}_{Y} = \underbrace{\begin{pmatrix}1.2&95\\1.4&100\\1.0&90\\1.8&150\\1.6&115\end{pmatrix}}_{X} \underbrace{\begin{pmatrix}\beta_1\\ \beta_2\end{pmatrix}}_{\beta} + \underbrace{\begin{pmatrix}\varepsilon_1\\ \varepsilon_2\\ \varepsilon_3\\ \varepsilon_4\\ \varepsilon_5\end{pmatrix}}_{\varepsilon}
$$

</div>

- Y = Xβ + ε.   X has n = 5 rows, one per car, and p = 2 columns, one per predictor.
- Every paper on the reading list starts from this line.

---

<p class="label">Part I · The model</p>

## The intercept is a question about the origin

<div class="eq">

$$
y_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \varepsilon_i
$$

</div>

- A real model has an intercept β₀; it lets the fitted plane sit above or below zero.
- Without β₀ the fit must pass through the origin: a car with zero weight and zero horsepower.
- Carrying β₀ through every formula is a nuisance. The cleaner move is to relocate the origin.

---

<p class="label">Part I · The model</p>

## Centring moves the origin to the average car

<div class="wide">
<div>

![](https://nurdauletakhanov.github.io/ReadingLab/slides/img/centering.png)

</div>
<div>

<div class="eq">

$$
\bar x = (1.4,\,110), \qquad x_{ij} \mapsto x_{ij} - \bar x_j
$$

</div>

- Subtract each column's mean from every entry, and do the same to y.
- Every car moves by the same vector, so the cloud slides as one rigid piece.
- Distances, angles, and the shape are untouched. Only the mean has moved, to (0, 0).

</div>
</div>

---

<p class="label">Part I · The model</p>

## What centring buys us

<div class="eq">

$$
\hat\beta_0 = \bar y - \hat\beta_1 \bar x_1 - \hat\beta_2 \bar x_2
$$

</div>

- The average car is now the origin, and its predicted fuel is the average fuel: the intercept is exactly zero.
- So we fit only the slopes, on centred data, from  Y = Xβ + ε  with no β₀ in sight.
- The intercept comes back for free afterwards. For the cars: β̂₁ = 2.83, β̂₂ = 0.027, β̂₀ = 0.52.
- Ridge regression shrinks slopes, never the intercept. Centring is what keeps the two apart.

---

<p class="label">Part II · The geometry of correlation</p>

## Predictors are vectors

<div class="eq">

$$
X = [\,x_1 \;\; x_2\,], \quad x_1, x_2 \in \mathbb{R}^5, \qquad X^{\top}X = \begin{pmatrix} x_1^{\top}x_1 & x_1^{\top}x_2 \\ x_2^{\top}x_1 & x_2^{\top}x_2 \end{pmatrix}
$$

</div>

- Read X by columns: weight is one vector in ℝ⁵, horsepower is another.
- XᵀX collects their dot products. It is p × p, so rows and columns now index predictors, not cars.
- The whole story of this session and the next lives inside that small matrix.

---

<p class="label">Part II · The geometry of correlation</p>

## Correlation is an angle

<div class="side">
<div>

<div class="eq">

$$
x_1^{\top}x_2 = \|x_1\|\,\|x_2\| \cos\theta = \cos\theta = r
$$

</div>

- Centre both columns and scale each to unit length.
- Their dot product is the cosine of the angle between them, and that is the sample correlation. For the cars, r = 0.913.
- |r| ≤ 1 is Cauchy–Schwarz, nothing more.
- Nearly parallel columns mean nearly redundant predictors.

</div>
<div>

![](https://nurdauletakhanov.github.io/ReadingLab/slides/img/angle.png)

</div>
</div>

---

<p class="label">Part II · The geometry of correlation</p>

## Why standardize? A detour through covariance

<div class="eq">

$$
\operatorname{cov}(u,v) = \frac{1}{n-1}\sum_{i=1}^{n}(u_i-\bar u)(v_i-\bar v), \qquad r = \frac{\operatorname{cov}(u,v)}{\operatorname{sd}(u)\,\operatorname{sd}(v)}
$$

</div>

- Covariance is the crude measure of co-movement: centre, multiply entry by entry, average. For the cars, cov(weight, hp) = 7.0.
- But 7.0 of what? Tonne-horsepower. Measure weight in grams and the same five cars give 7 000 000. The number carries the ruler.
- The standard deviation is the typical distance from the mean, in the variable's own units: sd(u) = √cov(u, u). Here sd(weight) = 0.3162 t and sd(hp) = 24.238.
- Divide by the standard deviations and the ruler cancels: 7.0 / (0.3162 × 24.238) = 0.913, in tonnes or in grams alike.
- Standardizing does that division once, on the data itself. Afterwards a plain dot product already is the correlation, and the ridge paper assumes exactly that.

---

<p class="label">Part II · The geometry of correlation</p>

## XᵀX is the correlation matrix

<div class="eq">

$$
X^{\top}X = \begin{pmatrix} 1 & r \\ r & 1 \end{pmatrix} = \begin{pmatrix} 1 & 0.913 \\ 0.913 & 1 \end{pmatrix}
$$

</div>

- On the diagonal: squared column lengths, all equal to 1.
- Off the diagonal: the pairwise correlations.
- The trace is p, so the eigenvalues always add up to p. They share a fixed budget.

---

<p class="label">Part II · The geometry of correlation</p>

## Eigenvalues: where the information is

<div class="side">
<div>

<div class="eq">

$$
X^{\top}X = P\Lambda P^{\top}, \qquad X^{\top}X\,p_j = \lambda_j\,p_j
$$

</div>

- Each eigenvalue is the spread of the data cloud along its eigenvector.
- For the cars: λ₁ = 1.91 along the diagonal, λ₂ = 0.09 across it. They sum to 2.
- Along the short axis the data barely varies. Whatever the coefficients do in that direction, the data cannot tell.
- Remember the small one. Everything in Session 1 is about 1/λ₂.

</div>
<div>

![](https://nurdauletakhanov.github.io/ReadingLab/slides/img/eigen.png)

</div>
</div>

---

<p class="label">Part II · The geometry of correlation</p>

## What we assume about the noise

<div class="eq">

$$
\mathbb{E}[\varepsilon \mid X] = 0, \qquad \operatorname{Cov}(\varepsilon \mid X) = \sigma^2 I_n
$$

</div>

- `Cov` means covariance. For a random vector, it is a matrix:
  $$\operatorname{Cov}(Z\mid X)=\mathbb E[(Z-\mathbb E[Z\mid X])(Z-\mathbb E[Z\mid X])^{\top}\mid X].$$
- Diagonal entries are variances: $\operatorname{Var}(\varepsilon_i\mid X)=\sigma^2$.
- Off-diagonal entries are pairwise covariances: $\operatorname{Cov}(\varepsilon_i,\varepsilon_j\mid X)=0$ for $i\ne j$.
- Normality is not assumed.

---

<p class="label">Part III · What makes an estimate good</p>

## Least squares: make the leftovers small

<div class="eq">

$$
\hat\beta = \arg\min_{B\in\mathbb R^p} \|Y-XB\|^2 \;\Longrightarrow\; X^{\top}X\hat\beta=X^{\top}Y
$$

</div>

- $\beta$ is the true coefficient vector. It stays fixed and unknown.
- $B$ is a candidate varied during minimization; the winning candidate is named $\hat\beta$.
- The gradient with respect to $B$ is $-2X^{\top}Y+2X^{\top}XB$.
- If $X^{\top}X$ is invertible, $\hat\beta=(X^{\top}X)^{-1}X^{\top}Y$.

---

<p class="label">Part III · What makes an estimate good</p>

## Least squares as orthogonal projection

<div class="side">
<div>

<div class="eq">

$$
\hat Y = X\hat\beta \in \operatorname{Col}(X), \qquad e = Y - \hat Y \perp \operatorname{Col}(X)
$$

</div>

- Every fitted vector has the form XB, so it lies in the column space of X.
- Least squares selects Ŷ = Xβ̂, the point in Col(X) nearest to Y.
- At the nearest point, the residual e = Y − Ŷ is perpendicular to every column of X. Thus Xᵀe = 0, which gives the normal equations.
- Ŷ lives in ℝⁿ. β̂ lives in ℝᵖ and gives the coordinates of Ŷ in the columns of X.

</div>
<div>

![](https://nurdauletakhanov.github.io/ReadingLab/slides/img/projection.png)

</div>
</div>

---

<p class="label">Part III · What makes an estimate good</p>

## When can XᵀX be inverted?

<div class="eq">

$$
v^{\top}X^{\top}Xv = (Xv)^{\top}(Xv) = \|Xv\|^2 \ge 0
$$

</div>

- So XᵀX is positive semidefinite for any X.
- If the columns are linearly independent, Xv ≠ 0 whenever v ≠ 0, the quadratic form is strictly positive, and the inverse exists.
- Nearly dependent columns keep the inverse but make it enormous. That is the ridge paper's whole subject.

---

<p class="label">Part III · What makes an estimate good</p>

## The estimate is a random variable

<div class="eq">

$$
\hat\beta = (X^{\top}X)^{-1}X^{\top}(X\beta + \varepsilon) = \beta + (X^{\top}X)^{-1}X^{\top}\varepsilon
$$

</div>

- β and X are fixed. Redraw the noise, and the estimate moves.
- An estimator therefore has a distribution, and we can ask two questions of it:
- where is its centre, and how wide is its spread?

---

<p class="label">Part III · What makes an estimate good</p>

## Unbiased, with covariance σ²(XᵀX)⁻¹

<div class="eq">

$$
\mathbb{E}[\hat\beta \mid X] = \beta, \qquad \operatorname{Cov}(\hat\beta \mid X) = \sigma^2 (X^{\top}X)^{-1}
$$

</div>

- The centre is exactly right: least squares is unbiased.
- The spread is the inverse of the correlation matrix. Along eigenvector pⱼ the variance is σ²/λⱼ.
- For the cars: σ²/λ₁ = 0.52 σ²  but  σ²/λ₂ = 11.5 σ².
- One direction of the estimate is 22 times noisier than the other, and the data caused it.

---

<p class="label">Part III · What makes an estimate good</p>

## Unbiased is not the same as accurate

<div class="wide">
<div>

![](https://nurdauletakhanov.github.io/ReadingLab/slides/img/dartboard.png)

</div>
<div>

<div class="eq">

$$
\operatorname{MSE}(\tilde\beta) = \mathbb{E}\|\tilde\beta - \beta\|^2 = \operatorname{tr}\operatorname{Cov}(\tilde\beta) + \|\operatorname{bias}(\tilde\beta)\|^2
$$

</div>

- Player A is centred on the bullseye but scatters widely. Player B aims a little off and clusters tightly.
- Every single dart of B lands closer. Mean squared error scores both players on the same scale.

</div>
</div>

---

<p class="label">Part III · What makes an estimate good</p>

## The Gauss–Markov theorem

<div class="eq">

$$
\operatorname{Var}(a^{\top}\hat\beta\mid X) \le \operatorname{Var}(a^{\top}\tilde\beta\mid X)
\qquad \text{for every } a\in\mathbb R^p
$$

</div>

- The comparison class is $\tilde\beta=CY$ with $CX=I$: linear in $Y$ and unbiased for every $\beta$.
- The vector $a$ selects a direction: $\operatorname{Var}(a^{\top}\hat\beta\mid X)=a^{\top}\operatorname{Cov}(\hat\beta\mid X)a$. Setting $a=e_j$ compares coefficient $j$.
- Write $C=(X^{\top}X)^{-1}X^{\top}+D$. Because $DX=0$,
  $$\operatorname{Var}(a^{\top}\tilde\beta\mid X)-\operatorname{Var}(a^{\top}\hat\beta\mid X)=\sigma^2\|D^{\top}a\|^2\ge0.$$
- Ridge is biased, so Gauss–Markov does not compare ridge with least squares.

---

<p class="label">Part III · What makes an estimate good</p>

## Where this leaves us

<div class="eq">

$$
\hat\beta = (X^{\top}X)^{-1}X^{\top}Y \qquad\qquad \hat\beta(k) = (X^{\top}X + kI)^{-1}X^{\top}Y, \quad k > 0
$$

</div>

- In the eigenvector basis, every 1/λⱼ becomes 1/(λⱼ + k). The small eigenvalue can no longer explode.
- The price is bias. Session 1 proves that for some k > 0 the trade lowers the mean squared error, always.
- Bring the centred model, the eigenvalues, and the bias–variance split. The paper assumes all three.

---

<p class="label">Closing</p>

## Exercises I — the matrix XᵀX

<div class="two">
<div>

1.  Prove that XᵀX is symmetric, whatever the shape of X. That is what licenses XᵀX = PΛPᵀ.

2.  Prove that vᵀXᵀXv ≥ 0 for every v, so XᵀX is positive semidefinite and its eigenvalues are ≥ 0.

3.  Prove that a symmetric M with vᵀMv > 0 for every v ≠ 0 is invertible. When does XᵀX qualify?

</div>
<div>

4.  Prove that unit-length u, v have |uᵀv| ≤ 1, with equality only when parallel. Deduce r = cos θ ∈ [−1, 1].

5.  Prove that the eigenvalues of a symmetric matrix sum to its trace. Deduce Σλⱼ = p for standardized columns.

6.  Prove that A⁻¹ keeps the eigenvectors and reciprocates the eigenvalues. Deduce the variance σ²/λⱼ along pⱼ.

</div>
</div>

<p class="note">Work in pairs. Every one of these six is used somewhere in the ridge paper.</p>

---

<p class="label">Closing</p>

## Exercises II — the model

<div class="two">
<div>

7.  Prove that E[εᵢ] = 0, E[εᵢ²] = σ² and E[εᵢεⱼ] = 0 for i ≠ j are exactly Cov(ε) = σ²I. Which assumption is the diagonal, which the off-diagonal?

8.  Derive the normal equations twice: by orthogonal projection, and by differentiating ‖Y − XB‖².

</div>
<div>

9.  Prove that least squares is unbiased and that Cov(β̂ | X) = σ²(XᵀX)⁻¹.

10.  Prove E‖β̃ − β‖² = tr Cov(β̃) + ‖bias‖², and show that the cross-term vanishes.

11.  For β̃ = cβ̂ with 0 ≤ c ≤ 1, prove the best c is B/(B + V). Is it ever 1?

</div>
</div>

<p class="note">Mark the line where each assumption about ε enters.</p>

---

<p class="label">Closing</p>

## Before Session 1 you should be able to prove

<div class="two dense">
<div>

1. XᵀX is symmetric and positive semidefinite; positive definite under full column rank.
2. A symmetric matrix with vᵀMv > 0 for every v ≠ 0 is invertible.
3. Unit-length vectors have |uᵀv| ≤ 1, so a dot product of standardized columns is a correlation.
4. The eigenvalues of a symmetric matrix sum to its trace, hence to p under this scaling.
5. A⁻¹ keeps the eigenvectors and reciprocates the eigenvalues, so the variance along pⱼ is σ²/λⱼ.
6. E[εᵢεⱼ] = 0 for i ≠ j and E[εᵢ²] = σ² are exactly Cov(ε) = σ²I.

</div>
<div>

7. Orthogonal projection gives the normal equations. Full column rank makes the least squares coefficients unique.
8. Least squares is unbiased with covariance σ²(XᵀX)⁻¹.
9. Vector MSE = total variance + squared bias.
10. Gauss–Markov compares only linear unbiased estimators.
11. A biased estimator can have a lower MSE.

</div>
</div>

<p class="note">Next: Hoerl & Kennard (1970), “Ridge Regression: Biased Estimation for Nonorthogonal Problems”.</p>
