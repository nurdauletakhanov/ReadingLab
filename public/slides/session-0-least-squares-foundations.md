---
marp: true
theme: default
paginate: true
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
  .eq { background: #f6ecd6; border-radius: 8px; padding: 12px 20px; text-align: center; font-family: "Cambria Math", "STIX Two Math", serif; font-size: 28px; margin: 12px 0 22px; white-space: pre-wrap; }
  .mono { font-family: Menlo, monospace; font-size: 20px; text-align: left; display: inline-block; }
  .note { color: #6b7280; font-family: Georgia, serif; font-size: 20px; margin-top: 26px; }
  .subtitle { color: #6b7280; font-family: Georgia, serif; font-size: 28px; }
  .side { display: grid; grid-template-columns: 1fr 420px; gap: 36px; align-items: start; }
  .wide { display: grid; grid-template-columns: 640px 1fr; gap: 32px; align-items: start; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
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

<div class="eq">fuelᵢ  =  β₁ · weightᵢ  +  β₂ · horsepowerᵢ  +  εᵢ</div>

- β₁ and β₂ belong to the relationship, not to any single car. They are what we want.
- εᵢ is everything the two measurements miss: driver, tyres, weather, the scale.
- No amount of staring at the table reveals β. We will have to estimate it.

---

<p class="label">Part I · The model</p>

## Five equations become one

<p style="text-align:center">![w:720](https://nurdauletakhanov.github.io/ReadingLab/slides/img/matrix.png)</p>

<div class="eq">Y = Xβ + ε</div>

- Y = Xβ + ε.   X has n = 5 rows, one per car, and p = 2 columns, one per predictor.
- Every paper on the reading list starts from this line.

---

<p class="label">Part I · The model</p>

## The intercept is a question about the origin

<div class="eq">yᵢ = β₀ + β₁xᵢ₁ + β₂xᵢ₂ + εᵢ</div>

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

<div class="eq">x̄ = (1.4, 110),   xᵢⱼ ↦ xᵢⱼ − x̄ⱼ</div>

- Subtract each column's mean from every entry, and do the same to y.
- Every car moves by the same vector, so the cloud slides as one rigid piece.
- Distances, angles, and the shape are untouched. Only the mean has moved, to (0, 0).

</div>
</div>

---

<p class="label">Part I · The model</p>

## What centring buys us

<div class="eq">β̂₀ = ȳ − β̂₁x̄₁ − β̂₂x̄₂</div>

- The average car is now the origin, and its predicted fuel is the average fuel: the intercept is exactly zero.
- So we fit only the slopes, on centred data, from  Y = Xβ + ε  with no β₀ in sight.
- The intercept comes back for free afterwards. For the cars: β̂₁ = 2.83, β̂₂ = 0.027, β̂₀ = 0.52.
- Ridge regression shrinks slopes, never the intercept. Centring is what keeps the two apart.

---

<p class="label">Part II · The geometry of correlation</p>

## Predictors are vectors

<div class="eq">X = [ x₁  x₂ ],   x₁, x₂ ∈ ℝ⁵,   XᵀX = ⎛x₁ᵀx₁  x₁ᵀx₂⎞ ⎝x₂ᵀx₁  x₂ᵀx₂⎠</div>

- Read X by columns: weight is one vector in ℝ⁵, horsepower is another.
- XᵀX collects their dot products. It is p × p, so rows and columns now index predictors, not cars.
- The whole story of this session and the next lives inside that small matrix.

---

<p class="label">Part II · The geometry of correlation</p>

## Correlation is an angle

<div class="side">
<div>

<div class="eq">x₁ᵀx₂ = ‖x₁‖ ‖x₂‖ cos θ = cos θ = r</div>

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

## XᵀX is the correlation matrix

<div class="eq">XᵀX = ⎛ 1   r ⎞ ⎝ r   1 ⎠ = ⎛ 1      0.913 ⎞ ⎝ 0.913   1  ⎠</div>

- On the diagonal: squared column lengths, all equal to 1.
- Off the diagonal: the pairwise correlations.
- The trace is p, so the eigenvalues always add up to p. They share a fixed budget.

---

<p class="label">Part II · The geometry of correlation</p>

## Eigenvalues: where the information is

<div class="side">
<div>

<div class="eq">XᵀX = PΛPᵀ,   XᵀX pⱼ = λⱼ pⱼ</div>

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

<div class="eq">E[ε | X] = 0,        Cov(ε | X) = σ² I</div>

- Nothing systematic is left over: on average the model is right.
- Every car has the same error variance, and no two errors are linked.
- That is all. Normality is not needed for anything today.

---

<p class="label">Part III · What makes an estimate good</p>

## Least squares: make the leftovers small

<div class="eq">β̂ = arg min ‖Y − Xβ‖²   ⟹   XᵀX β̂ = XᵀY   ⟹   β̂ = (XᵀX)⁻¹ XᵀY</div>

- The objective is the squared length of the residual vector in ℝ⁵.
- Its gradient is −2XᵀY + 2XᵀXβ. Setting it to zero gives the normal equations.
- If XᵀX can be inverted, the solution is unique and explicit.
- Everything about β̂ is decided by that inverse.

---

<p class="label">Part III · What makes an estimate good</p>

## When can XᵀX be inverted?

<div class="eq">vᵀ XᵀX v = (Xv)ᵀ(Xv) = ‖Xv‖² ≥ 0</div>

- So XᵀX is positive semidefinite for any X.
- If the columns are linearly independent, Xv ≠ 0 whenever v ≠ 0, the quadratic form is strictly positive, and the inverse exists.
- Nearly dependent columns keep the inverse but make it enormous. That is the ridge paper's whole subject.

---

<p class="label">Part III · What makes an estimate good</p>

## The estimate is a random variable

<div class="eq">β̂ = (XᵀX)⁻¹Xᵀ(Xβ + ε) = β + (XᵀX)⁻¹Xᵀ ε</div>

- β and X are fixed. Redraw the noise, and the estimate moves.
- An estimator therefore has a distribution, and we can ask two questions of it:
- where is its centre, and how wide is its spread?

---

<p class="label">Part III · What makes an estimate good</p>

## Unbiased, with covariance σ²(XᵀX)⁻¹

<div class="eq">E[β̂ | X] = β,        Cov(β̂ | X) = σ² (XᵀX)⁻¹</div>

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

<div class="eq">MSE(β̃) = E‖β̃ − β‖² = tr Cov(β̃) + ‖bias(β̃)‖²</div>

- Player A is centred on the bullseye but scatters widely. Player B aims a little off and clusters tightly.
- Every single dart of B lands closer. Mean squared error scores both players on the same scale.

</div>
</div>

---

<p class="label">Part III · What makes an estimate good</p>

## Gauss–Markov, read carefully

<div class="eq">Cov(β̃ | X) − Cov(β̂ | X) ⪰ 0   for every β̃ that is linear in Y and unbiased</div>

- Among linear unbiased estimators, least squares has the smallest covariance.
- Two qualifiers. Drop “unbiased” and the theorem says nothing at all.
- That gap is the door ridge regression walks through.

---

<p class="label">Part III · What makes an estimate good</p>

## Where this leaves us

<div class="eq">β̂ = (XᵀX)⁻¹XᵀY        β̂(k) = (XᵀX + kI)⁻¹XᵀY,  k > 0</div>

- In the eigenvector basis, every 1/λⱼ becomes 1/(λⱼ + k). The small eigenvalue can no longer explode.
- The price is bias. Session 1 proves that for some k > 0 the trade lowers the mean squared error, always.
- Bring the centred model, the eigenvalues, and the bias–variance split. The paper assumes all three.

---

<p class="label">Closing</p>

## Exercises

<div class="two">
<div>

1.  Show that XᵀX is positive semidefinite.

2.  Show it is invertible exactly when the columns of X are linearly independent.

3.  For centred, unit-length columns, show that the dot product is the correlation and lies in [−1, 1].

4.  Show that the eigenvalues of XᵀX sum to p under that scaling.

</div>
<div>

5.  Derive the normal equations and the least squares solution.

6.  Prove that least squares is unbiased and derive its covariance.

7.  Prove  E‖β̃ − β‖² = tr Cov(β̃) + ‖bias‖².

8.  For β̃ = cβ̂ with 0 ≤ c ≤ 1, find the c that minimises the MSE. Is it 1?

</div>
</div>

<p class="note">Work in pairs. Mark the line where each assumption about ε is used.</p>

---

<p class="label">Closing</p>

## Before Session 1 you should be able to prove

<div class="two">
<div>

1. XᵀX is positive semidefinite, and positive definite under full column rank.
2. For centred unit-length columns, a dot product is a correlation.
3. The eigenvalues of XᵀX sum to p.
4. The normal equations give the unique least squares solution.

</div>
<div>

5. Least squares is unbiased with covariance σ²(XᵀX)⁻¹.
6. Vector MSE = total variance + squared bias.
7. Gauss–Markov compares only linear unbiased estimators.
8. A biased estimator can have a lower MSE.

</div>
</div>

<p class="note">Next: Hoerl & Kennard (1970), “Ridge Regression: Biased Estimation for Nonorthogonal Problems”.</p>
