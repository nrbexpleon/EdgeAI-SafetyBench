# Architecture

## Boundaries

1. **Domain:** manifests, datasets, metrics, perturbations, drift, gates, comparisons and evidence.
2. **Inference adapter:** converts a runtime-specific model into `infer(features) -> prediction`.
3. **Application:** campaign execution and bounded report retention.
4. **Delivery:** REST API and browser console.

The domain does not import a model runtime. An ONNX, TensorRT or TFLite adapter must return label, confidence, probabilities, latency, and memory metadata without leaking runtime types upward.

## Repeatability

Robustness perturbations are deterministic for an unchanged dataset, seed, perturbation configuration and engine version. Wall-clock inference measurements vary by host and must be interpreted against controlled hardware baselines.

## Decision model

Automated gates reject clearly unsuitable candidates. Passing gates yields `eligible-for-human-review`, never automatic production approval. Policy thresholds are version-controlled engineering inputs.
