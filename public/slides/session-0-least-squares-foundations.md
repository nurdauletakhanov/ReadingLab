---
marp: true
theme: default
paginate: true
math: mathjax
size: 16:9
style: |
  section {
    background: #f7f7f5;
    color: #24282e;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 28px;
    line-height: 1.35;
    padding: 58px 72px;
  }
  h1, h2 {
    color: #2b3038;
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 600;
  }
  h1 { font-size: 58px; line-height: 1.08; }
  h2 { font-size: 42px; margin-bottom: 28px; }
  strong { color: #9b6808; }
  table { font-size: 23px; width: 100%; }
  th { background: #efe4c9; }
  blockquote {
    border-left: 5px solid #a8710a;
    color: #3f4650;
    margin: 28px 0 0;
    padding: 8px 0 8px 24px;
  }
  .title { display: flex; flex-direction: column; justify-content: center; }
  .title h1 { max-width: 850px; }
  .subtitle { color: #6b7280; font-size: 28px; }
  .small { color: #6b7280; font-size: 22px; }
  .accent { color: #9b6808; }
  .equation { font-size: 34px; margin: 30px 0; text-align: center; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 46px; align-items: start; }
---

<!-- _class: title -->

# Least Squares Foundations

<p class="subtitle">Session 0 · Preparation for ridge regression</p>

Nurdaulet Akhanov

---

## Learning goals

By the end of the session, you should be able to:

1. Write the linear model and identify its dimensions
2. Derive the least squares estimator
3. Prove its unbiasedness and covariance
4. Interpret correlation through predictor geometry
5. Connect small eigenvalues with unstable coefficients
6. State the exact limit of the Gauss–Markov theorem

---

## Five observations and two predictors

| Car | Weight (t) | Horsepower | Fuel (L/100 km) |
|---:|---:|---:|---:|
| 1 | 1.2 | 95 | 6.4 |
| 2 | 1.4 | 100 | 7.1 |
| 3 | 1.0 | 90 | 5.8 |
| 4 | 1.8 | 150 | 9.6 |
| 5 | 1.6 | 115 | 8.2 |

The response is fuel consumption. Weight and horsepower are the predictors.

---

## The linear model

<div class="equation">

$$Y=X\beta+\varepsilon$$

</div>

If $X\in\mathbb R^{n\times p}$, then

$$Y,\varepsilon\in\mathbb R^n, \qquad \beta\in\mathbb R^p.$$

For the car data, $n=5$ and $p=2$. Therefore $X$ is $5\times2$.

---

## Predictor columns and the Gram matrix

Each predictor is a column of $X$:

$$x_j\in\mathbb R^n.$$

With five cars, the weight and horsepower columns are two vectors in $\mathbb R^5$.

Their pairwise dot products form

$$X'X\in\mathbb R^{p\times p}.$$

Here $X'X$ is $2\times2$, even though each predictor vector has five entries.

---

## Intercept and centering

The usual model includes an intercept:

$$Y=\mathbf 1\beta_0+X\beta+\varepsilon.$$

Center the response and every predictor column by subtracting their means. In the centered coordinates, the fitted intercept is zero.

The ridge paper uses centered variables, so the remaining derivations use

$$Y=X\beta+\varepsilon.$$

---

## Least squares

For a candidate coefficient vector $B$, define the residual vector

$$r(B)=Y-XB.$$

Ordinary least squares chooses the candidate with the smallest residual sum of squares:

$$\hat\beta=\arg\min_B \|Y-XB\|^2.$$

The objective measures distance in observation space $\mathbb R^n$.

---

## The normal equations

$$
\begin{aligned}
\phi(B)
  &= (Y-XB)'(Y-XB) \\
  &= Y'Y-2B'X'Y+B'X'XB, \\
\nabla_B\phi(B)
  &= -2X'Y+2X'XB.
\end{aligned}
$$

At a minimum,

$$X'XB=X'Y.$$

If $X$ has full column rank, $X'X$ is invertible and

$$\boxed{\hat\beta=(X'X)^{-1}X'Y}.$$

---

## Full column rank

For every $v\in\mathbb R^p$,

$$v'X'Xv=(Xv)'(Xv)=\|Xv\|^2\ge 0.$$

Therefore $X'X$ is positive semidefinite.

If the columns of $X$ are linearly independent, then $Xv\ne0$ whenever $v\ne0$. Hence

$$v'X'Xv>0,$$

so $X'X$ is positive definite and invertible.

---

## Why the estimate is random

Substitute the model into the estimator:

$$
\begin{aligned}
\hat\beta
  &= (X'X)^{-1}X'(X\beta+\varepsilon) \\
  &= \beta+(X'X)^{-1}X'\varepsilon.
\end{aligned}
$$

$\beta$ and the observed $X$ stay fixed. A new noise realization produces a new estimate.

> The estimator inherits its randomness from the data.

---

## Noise assumptions

We state the assumptions conditional on the observed design matrix:

$$
\mathbb E[\varepsilon\mid X]=0,
\qquad
\operatorname{Cov}(\varepsilon\mid X)=\sigma^2I_n.
$$

The first condition rules out systematic error. The second gives every observation the same error variance and makes distinct errors uncorrelated.

Normality is unnecessary for the results in this session.

---

## Unbiasedness

$$
\begin{aligned}
\mathbb E[\hat\beta\mid X]
  &= \beta+(X'X)^{-1}X'\mathbb E[\varepsilon\mid X] \\
  &= \beta.
\end{aligned}
$$

Ordinary least squares is conditionally unbiased.

This statement concerns the average over repeated noise realizations. It does not say that one observed estimate equals the true coefficient vector.

---

## Covariance of least squares

Let $A=(X'X)^{-1}X'$. Then $\hat\beta-\beta=A\varepsilon$, so

$$
\begin{aligned}
\operatorname{Cov}(\hat\beta\mid X)
  &=A(\sigma^2I)A' \\
  &=\sigma^2(X'X)^{-1}.
\end{aligned}
$$

<div class="equation">

$$\boxed{\operatorname{Cov}(\hat\beta\mid X)=\sigma^2(X'X)^{-1}}$$

</div>

---

## Correlation as an angle

Center two predictor columns and scale each to unit Euclidean length:

$$\|x_1\|=\|x_2\|=1.$$

Their sample correlation becomes

$$r=x_1'x_2=\|x_1\|\|x_2\|\cos\theta=\cos\theta.$$

The Cauchy–Schwarz inequality gives $|r|\le1$.

This unit-length convention differs from scaling each column to sample variance one by a common factor of $\sqrt{n-1}$.

---

## The matrix $X'X$

With unit-length predictor columns,

$$
X'X=
\begin{pmatrix}
1&r_{12}&\cdots\\
r_{21}&1&\cdots\\
\vdots&\vdots&\ddots
\end{pmatrix}.
$$

The diagonal contains squared column lengths. The off-diagonal entries contain pairwise correlations.

Because $\operatorname{tr}(X'X)=p$, its eigenvalues satisfy

$$\sum_{j=1}^{p}\lambda_j=p.$$

---

## Eigenvalues and coefficient instability

Write the eigendecomposition

$$X'X=P\Lambda P'.$$

Then

$$\operatorname{Cov}(\hat\beta\mid X)=\sigma^2P\Lambda^{-1}P'.$$

Along eigenvector $p_j$, the coefficient variance is

$$\frac{\sigma^2}{\lambda_j}.$$

A small eigenvalue means the data has little variation in that predictor direction. Least squares then amplifies the noise in the same direction.

---

## Vector bias and variance

For any estimator $\tilde\beta$, define

$$\operatorname{Bias}(\tilde\beta)=\mathbb E[\tilde\beta]-\beta.$$

Its scalar mean squared error is

$$
\boxed{
\mathbb E\|\tilde\beta-\beta\|^2
=\operatorname{tr}\!\left(\operatorname{Cov}(\tilde\beta)\right)
+\|\operatorname{Bias}(\tilde\beta)\|^2
}.
$$

The trace converts the covariance matrix into total coefficient variance.

---

## The Gauss–Markov theorem

Under the stated assumptions, ordinary least squares has the smallest covariance among estimators that are both:

1. linear in $Y$
2. unbiased for every $\beta$

For any other linear unbiased estimator $\tilde\beta$,

$$
\operatorname{Cov}(\tilde\beta\mid X)
-\operatorname{Cov}(\hat\beta\mid X)
\succeq0.
$$

The theorem makes no claim about biased estimators.

---

## The question behind ridge regression

When a small eigenvalue makes least squares highly variable, we can allow some bias in exchange for a larger reduction in variance.

Ridge regression replaces $X'X$ with $X'X+kI$:

$$
\hat\beta_k=(X'X+kI)^{-1}X'Y,
\qquad k>0.
$$

In eigen-coordinates, every denominator changes from $\lambda_j$ to $\lambda_j+k$.

Session 1 studies when that trade improves MSE.

---

## Proof problems I

1. Prove that $X'X$ is positive semidefinite.

2. Prove that $X'X$ is invertible exactly when the columns of $X$ are linearly independent.

3. For centered, unit-length columns, prove that correlation equals the cosine of their angle and lies in $[-1,1]$.

4. Prove that the eigenvalues of $X'X$ sum to $p$ under unit-length scaling.

---

## Proof problems II

5. Derive the normal equations and the unique least squares estimator under full column rank.

6. Prove the conditional unbiasedness and covariance of ordinary least squares.

7. Prove the vector bias–variance decomposition, including the trace term.

8. For $\tilde\beta_c=c\hat\beta$, derive its MSE and prove which $c\in[0,1]$ minimizes it.

---

## Before Session 1

You should now be able to prove:

- when the least squares estimator exists uniquely
- why correlated predictors create small eigenvalues
- why small eigenvalues inflate coefficient variance
- what Gauss–Markov does and does not guarantee
- how bias can reduce total MSE

Next: **Ridge Regression from Scratch**

---

## Reading

Arthur E. Hoerl and Robert W. Kennard. “Ridge Regression: Biased Estimation for Nonorthogonal Problems.” *Technometrics* 12(1), 1970.

https://doi.org/10.1080/00401706.1970.10488634

Companion tutorial and video:

https://nurdauletakhanov.github.io/ReadingLab/tutorials/foundations/

https://nurdauletakhanov.github.io/ReadingLab/videos/foundations/

