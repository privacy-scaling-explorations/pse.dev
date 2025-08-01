---
authors: ["Moven Tsai"]
title: "Metal MSM v2: Exploring MSM Acceleration on Apple GPUs"
image: "/articles/mopro-metal-msm-v2/cover.webp"
tldr: "Metal MSM v2 delivers GPU acceleration improvements for Multi-Scalar Multiplication on Apple devices, laying groundwork for efficient mobile proving in privacy-preserving applications."
date: "2025-07-28"
tags: ["metal", "msm", "gpu", "client-side proving", "zkp"]
projects: ["mopro"]
---

## Key Takeaways

- Hybrid CPU-GPU approaches are essential for fully exploiting limited hardware such as mobile devices, improving MSM computation and accelerating proof generation.
- To unify GPU acceleration efforts, [WebGPU's](https://www.w3.org/TR/webgpu/) vendor-agnostic API and [WGSL](https://www.w3.org/TR/WGSL/) offer promising solutions that compile to native formats like [SPIR-V](https://registry.khronos.org/SPIR-V/) (for Vulkan on Android) and [MSL](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf) (for Metal on Apple devices).
- GPU acceleration for post-quantum proving systems could enable their widespread adoption.

## Introduction

GPU acceleration harnesses the massive parallelism of Graphics Processing Units (GPUs) to dramatically speed up tasks that would otherwise overwhelm traditional CPUs. Because GPUs can execute thousands of threads simultaneously, they have become indispensable for compute-intensive workloads such as machine-learning model training and modern cryptographic algorithms.

This technology plays a crucial role in advancing privacy-preserving applications, as zero-knowledge proofs (ZKPs) currently face a significant bottleneck due to the high computational cost of their core operations. By accelerating these operations, we can generate proofs more quickly and cost-effectively, which is essential for the broader adoption of privacy-focused solutions across Ethereum and other blockchain platforms.

Currently, research on GPU acceleration for cryptography remains fragmented, with each platform relying on its own framework: [Metal](https://developer.apple.com/metal/) on Apple devices, [Vulkan](https://developer.nvidia.com/vulkan) on Android, and [CUDA](https://en.wikipedia.org/wiki/CUDA) on NVIDIA hardware. Aside from CUDA, most GPU frameworks lack mature ecosystems of cryptographic libraries (e.g., NVIDIA's [cuPQC](https://github.com/NVIDIA/CUDALibrarySamples/tree/master/cuPQC) and [cuFFT](https://github.com/NVIDIA/CUDALibrarySamples/tree/master/cuFFT)).

Therefore, [Mopro](https://github.com/zkmopro/mopro) is investing in GPU acceleration through related grants ([Issue #21](https://github.com/zkmopro/mopro/issues/21), [Issue #22](https://github.com/zkmopro/mopro/issues/22), and [Issue #153](https://github.com/zkmopro/mopro/issues/153)), as it advances our mission to make mobile proving both accessible and practical.

## A Primer on Multi-Scalar Multiplication

[Multi-Scalar Multiplication (MSM)](https://hackmd.io/@drouyang/SyYwhWIso) is an essential primitive in elliptic curve cryptography, particularly in pairing-based proving systems widely used for privacy-preserving applications. MSM involves computing a sum of the form $Q = \sum_{i=1}^{n}(k_i \cdot P_i)$, where $k_i$ are scalars and $P_i$ are points on an elliptic curve, such as [BN254](https://hackmd.io/@jpw/bn254). This computationally intensive operation is ideal for GPU acceleration.

[Metal MSM v2](https://github.com/zkmopro/gpu-acceleration/tree/v0.2.0) is an open-source implementation, licensed under MIT and Apache 2.0, that optimizes MSM on Apple GPUs using the Metal Shading Language (MSL). Building on its predecessor, Metal MSM v2 offers significant performance improvements through algorithmic and GPU-specific optimizations, laying the foundation for further research into mobile proving acceleration with GPUs.

## Recap on Metal MSM v1

[The first version of Metal MSM](https://github.com/zkmopro/gpu-acceleration/releases/tag/v0.1.0) (v1) was an initial attempt to bring MSM computations on the BN254 curve to Apple GPUs, leveraging parallelism and optimizations like precomputation from the EdMSM paper by Bootle et al.[^1]. While it showed the potential for GPU acceleration, profiling result revealed key limitations:

- **Low GPU Occupancy:** At only 32%, the GPU was underutilized, leading to inefficient computation.
- **High Memory Footprint:** Peak VRAM usage was excessive, causing GPU hang errors on real mobile devices for instance sizes ≥ 2^14.
- **Performance Bottlenecks:** For an input size of 2^20 points, v1 took 41 seconds on an M1 Pro MacBook, indicating substantial room for improvement.

These challenges drove the development of a newer version, which introduces targeted optimizations to address these issues. For full context, refer to the detailed [Metal MSM v1 Summary Report](https://hackmd.io/Q6c2LUxzTzGlEcZF1NBRpA) and [Metal MSM v1 Profiling Report](https://hackmd.io/@moven0831/profiling-metal-msm).

## Metal MSM v2: What's New

Metal MSM v2 introduces key enhancements over v1, significantly improving performance and resource efficiency. It adopts the sparse matrix approach from the cuZK paper by Lu et al.[^2], treating MSM elements as sparse matrices to reduce memory usage and convert operations described in [Pippenger's algorithm](https://dl.acm.org/doi/10.1109/SFCS.1976.21) into efficient sparse matrix algorithms.

The implementation draws inspiration from [Derei and Koh's WebGPU MSM implementation](https://github.com/z-prize/2023-entries/tree/main/prize-2-msm-wasm/webgpu-only/tal-derei-koh-wei-jie) for [ZPrize 2023](https://www.zprize.io/#2023). However, targeting the BN254 curve (unlike the BLS12-377 curve used by Zprize 2023) required different optimization strategies, particularly for Montgomery multiplications and for using Jacobian coordinates instead of projective or extended twisted Edwards coordinates.

Due to differences between shading languages (CUDA for cuZK, WGSL for WebGPU, and MSL for Metal), additional GPU programming efforts were necessary. For instance, dynamic kernel dispatching, which is straightforward in CUDA, required workarounds in Metal through host-side dispatching at runtime.

Key improvements include:
- **Dynamic Workgroup Sizing**: Workgroup sizes are adjusted based on input size and GPU architecture using a `scale_factor` and `thread_execution_width`. These parameters were optimized through experimentation to maximize GPU utilization as mentioned in [PR #86](https://github.com/zkmopro/gpu-acceleration/pull/86).
- **Dynamic Window Sizes**: A [window_size_optimizer](https://github.com/zkmopro/gpu-acceleration/commit/f5c3fcd2dd1e32766e5713a5d8e6e19ebe00f6f6) calculates optimal window sizes using a cost function from the cuZK paper, with empirical adjustments for real devices, as detailed in [PR #87](https://github.com/zkmopro/gpu-acceleration/pull/87).
- **MSL-Level Optimizations**: Loop unrolling and explicit access qualifiers, implemented in [PR #88](https://github.com/zkmopro/gpu-acceleration/pull/88), enhance kernel efficiency, with potential for further gains via SIMD refactoring.

Benchmarks on an M3 MacBook Air with 24GB memory show 40x–100x improvements over v1 and ~10x improvement over [ICME Labs' WebGPU MSM](https://github.com/ICME-Lab/msm-webgpu) on BN254, adapted from Derei and Koh's BLS12-377 work. While still slower than CPU-only [Arkworks MSM](https://github.com/arkworks-rs) on small & medium input sizes, v2 lays the groundwork for a future CPU+GPU hybrid approach.

## How Metal MSM v2 Works

The general flow follows [Koh's technical writeup](https://hackmd.io/HNH0DcSqSka4hAaIfJNHEA). We pack affine points and scalars on the CPU into a locality-optimized byte format, upload them to the GPU, and encode points into Montgomery form for faster modular multiplications. Scalars are split into [signed chunks](https://hackmd.io/@drouyang/signed-bucket-index) to enable the [Non-Adjacent Form (NAF)](https://hackmd.io/HkVWGwsRTM2HeBL1VN0lAw) method, halving both bucket count and memory during accumulation.

Next, we apply a parallel sparse-matrix transposition (adapted from Wang et al.'s work[^3]) to identify matching scalar chunks and group points into buckets. Then, using a sparse-matrix–vector product (SMVP) and the `pBucketPointsReduction` algorithm (Algorithm 4 in the cuZK paper[^2]), we split buckets among GPU threads, compute each thread's running sum, and scale it by the required factor.

After GPU processing, we transfer each thread's partial sums back to the CPU for final aggregation. Since the remaining point count is small and [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method) is sequential and efficient on the CPU, we perform the final sum there.

The use of sparse matrices is a key innovation in Metal MSM v2, reducing memory requirements and boosting parallelism compared to previous approaches.

## Understanding the Theoretical Acceleration Upper Bound

In the Groth16 proving system, Number Theoretic Transform (NTT) and MSM account for 70–80% of the proving time. According to [Amdahl's Law](https://en.wikipedia.org/wiki/Amdahl%27s_law), the maximum speedup is limited by unoptimized components:

$$
\text{Speedup}_{\text{overall}} = \dfrac{1}{(1 - \text{time}_{\text{optimized}}) + \dfrac{\text{time}_{\text{optimized}}}{\text{speedup}_{\text{optimized}}}}
$$

If 80% of the prover time is optimized with infinite speedup, the theoretical maximum is 5x. However, data I/O overhead reduces practical gains. For more details, see [Ingonyama's blog post on Hardware Acceleration for ZKP](https://medium.com/@ingonyama/revisiting-paradigms-hardware-acceleration-for-zero-knowledge-proofs-5dffacdc24b4).

## Benchmark Results

Benchmarks conducted on an M3 MacBook Air compare Metal MSM v2 with the Arkworks v0.4.x CPU implementation across various input sizes.

![Metal MSM v2 Benchmark Results](/articles/mopro-metal-msm-v2/metal-msm-v2-benchmark.webp)

<table>
  <thead>
    <tr>
      <th rowspan="2" style={{textAlign: "center"}}>Scheme</th>
      <th colspan="7" style={{textAlign: "center"}}>Input Size (ms)</th>
    </tr>
    <tr>
      <th style={{textAlign: "center"}}>2<sup>12</sup></th>
      <th style={{textAlign: "center"}}>2<sup>14</sup></th>
      <th style={{textAlign: "center"}}>2<sup>16</sup></th>
      <th style={{textAlign: "center"}}>2<sup>18</sup></th>
      <th style={{textAlign: "center"}}>2<sup>20</sup></th>
      <th style={{textAlign: "center"}}>2<sup>22</sup></th>
      <th style={{textAlign: "center"}}>2<sup>24</sup></th>
    </tr>
  </thead>
  <tbody style={{textAlign: "center"}}>
    <tr>
      <th style={{textAlign: "center"}}><a href="https://github.com/arkworks-rs">Arkworks v0.4.x</a><br/>(CPU, Baseline)</th>
      <td>6</td>
      <td>19</td>
      <td>69</td>
      <td>245</td>
      <td>942</td>
      <td>3,319</td>
      <td>14,061</td>
    </tr>
    <tr>
      <th style={{textAlign: "center"}}><a href="https://github.com/zkmopro/gpu-acceleration/tree/v0.1.0">Metal MSM v0.1.0</a><br/>(GPU)</th>
      <td>143<br/>(-23.8x)</td>
      <td>273<br/>(-14.4x)</td>
      <td>1,730<br/>(-25.1x)</td>
      <td>10,277<br/>(-41.9x)</td>
      <td>41,019<br/>(-43.5x)</td>
      <td>555,877<br/>(-167.5x)</td>
      <td>N/A</td>
    </tr>
    <tr>
      <th style={{textAlign: "center"}}><a href="https://github.com/zkmopro/gpu-acceleration/tree/v0.2.0">Metal MSM v0.2.0</a><br/>(GPU)</th>
      <td>134<br/>(-22.3x)</td>
      <td>124<br/>(-6.5x)</td>
      <td>253<br/>(-3.7x)</td>
      <td>678<br/>(-2.8x)</td>
      <td>1,702<br/>(-1.8x)</td>
      <td>5,390<br/>(-1.6x)</td>
      <td>22,241<br/>(-1.6x)</td>
    </tr>
    <tr>
      <th style={{textAlign: "center"}}><a href="https://github.com/ICME-Lab/msm-webgpu">ICME WebGPU MSM</a><br/>(GPU)</th>
      <td>N/A</td>
      <td>N/A</td>
      <td>2,719<br/>(-39.4x)</td>
      <td>5,418<br/>(-22.1x)</td>
      <td>17,475<br/>(-18.6x)</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <th style={{textAlign: "center"}}><a href="https://github.com/moven0831/icicle/tree/bn254-metal-benchmark">ICICLE-Metal v3.8.0</a><br/>(GPU)</th>
      <td>59<br/>(-9.8x)</td>
      <td>54<br/>(-2.8x)</td>
      <td>89<br/>(-1.3x)</td>
      <td>149<br/>(+1.6x)</td>
      <td>421<br/>(+2.2x)</td>
      <td>1,288<br/>(+2.6x)</td>
      <td>4,945<br/>(+2.8x)</td>
    </tr>
     <tr>
      <th style={{textAlign: "center"}}>
        <a href="https://github.com/ElusAegis/metal-msm-gpu-acceleration">ElusAegis' Metal MSM</a><br/>(GPU)
      </th>
      <td>58<br/>(-9.7x)</td>
      <td>69<br/>(-3.6x)</td>
      <td>100<br/>(-1.4x)</td>
      <td>207<br/>(+1.2x)</td>
      <td>646<br/>(+1.5x)</td>
      <td>2,457<br/>(+1.4x)</td>
      <td>11,353<br/>(+1.2x)</td>
    </tr>
    <tr>
      <th style={{textAlign: "center"}}>
        <a href="https://github.com/ElusAegis/metal-msm-gpu-acceleration">ElusAegis' Metal MSM</a><br/>(CPU+GPU)
      </th>
      <td>13<br/>(-2.2x)</td>
      <td>19<br/>(-1.0x)</td>
      <td>53<br/>(+1.3x)</td>
      <td>126<br/>(+1.9x)</td>
      <td>436<br/>(+2.2x)</td>
      <td>1,636<br/>(+2.0x)</td>
      <td>9,199<br/>(+1.5x)</td>
    </tr>
  </tbody>
</table>

> Negative values indicate slower performance relative to the CPU baseline. The performance gap narrows for larger inputs.

Notes:
- For ICME WebGPU MSM, input size 2^12 causes M3 chip machines to crash; sizes not listed on the project's GitHub page are shown as "N/A"
- For Metal MSM v0.1.0, the 2^24 benchmark was abandoned due to excessive runtime.

While Metal MSM v2 isn't faster than CPUs across all hardware configurations, its open-source nature, competitive performance relative to other GPU implementations, and ongoing improvements position it well for continued advancement.

## Profiling Insights

Profiling on an M1 Pro MacBook provides detailed insights into the improvements from v1 to v2:

| metric | v1 | v2 | gain |
|---|---|---|---|
| end-to-end latency | 10.3 s | **0.42 s** | **24x** |
| GPU occupancy | 32 % | **76 %** | +44 pp |
| CPU share | 19 % | **&lt;3 %** | –16 pp |
| peak VRAM | 1.6 GB | **220 MB** | –7.3× |

These metrics highlight the effectiveness of v2's optimizations:

- **Latency Reduction:** A 24-fold decrease in computation time for 2^20 inputs.
- **Improved GPU Utilization:** Occupancy increased from 32% to 76%, indicating better use of GPU resources.
- **Reduced CPU Dependency:** CPU share dropped below 3%, allowing the GPU to handle most of the workload.
- **Lower Memory Footprint:** Peak VRAM usage decreased from 1.6 GB to 220 MB, a 7.3-fold reduction.

Profiling also identified buffer reading throughput as a primary bottleneck in v1, which v2 mitigates through better workload distribution and sparse matrix techniques. See detailed profiling reports: [v1 Profiling Report](https://hackmd.io/@yaroslav-ya/rJkpqc_Nke) and [v2 Profiling Report](https://hackmd.io/@yaroslav-ya/HyFA7XAQll).

## Comparison to Other Implementations

Metal MSM v2 is tailored for Apple's Metal API, setting it apart from other GPU-accelerated MSM implementations:

- **Derei and Koh's WebGPU MSM on BLS12**: Designed for WebGPU, this implementation targets browser-based environments and may not fully leverage Apple-specific hardware optimizations.
- **ICME labs WebGPU MSM on BN254**: Adapted from Derei and Koh's WebGPU work for the BN254 curve, it is ~10x slower than Metal MSM v2 for inputs from 2^16 to 2^20 on M3 MacBook Air.
- **cuZK**: A CUDA-based implementation for NVIDIA GPUs, operating on a different hardware ecosystem and using different algorithmic approaches.

Metal MSM v2's use of sparse matrices and dynamic workgroup sizing provides advantages on Apple hardware, particularly for large input sizes. While direct benchmark comparisons are limited, internal reports suggest that v2 achieves performance on par with or better than other WebGPU/Metal MSM implementations at medium scales.

It's worth noting that the state-of-the-art Metal MSM implementation is [Ingonyama's ICICLE-Metal](https://medium.com/@ingonyama/icicle-goes-metal-v3-6-163fa7bbfa44) (since ICICLE v3.6). Readers can try it by following:
- [ICICLE Rust MSM example](https://github.com/ingonyama-zk/icicle/tree/main/examples/rust/msm)
- [Experimental BN254 Metal benchmark](https://github.com/moven0831/icicle/tree/bn254-metal-benchmark)

Another highlight is [ElusAegis' Metal MSM implementation](https://github.com/ElusAegis/metal-msm-gpu-acceleration) for BN254, which was forked from version 1 of Metal MSM. To the best of our knowledge, his pure GPU implementation further improves the allocation and algorithmic structure to add more parallelism, resulting in **2x** faster performance compared to Metal MSM v2.

Moreover, by integrating this GPU implementation with optimized MSM on the CPU side from the [halo2curves](https://github.com/privacy-scaling-explorations/halo2curves) library, he developed a hybrid approach that splits MSM tasks between CPU and GPU and then aggregates the results. This strategy achieves an additional **30–40%** speedup over a CPU-only implementation. This represents an encouraging result for GPU acceleration in pairing-based ZK systems and suggests a promising direction for Metal MSM v3.

## Future Work

The Metal MSM team has outlined several exciting directions for future development:
- **SIMD Refactoring:** Enhance SIMD utilization and memory coalescing to further boost performance.
- **Advanced Hybrid Approach:** Integrate with Arkworks 0.5 for a more sophisticated CPU-GPU hybrid strategy.
- **Android Support**: Port kernels to Vulkan compute/WebGPU on Android, targeting Qualcomm Adreno (e.g., Adreno 7xx series) and ARM Mali (e.g., G77/G78/G710) GPUs.
- **Cross-Platform Support:** Explore WebGPU compatibility to enable broader platform support.
- **Dependency Updates:** Transition to newer versions of [objc2](https://github.com/madsmtm/objc2) and [objc2-metal](https://crates.io/crates/objc2-metal), and Metal 4 to leverage the latest [MTLTensor features](https://developer.apple.com/videos/play/wwdc2025/262/), enabling multi-dimensional data to be passed to the GPU.

Beyond these technical improvements, we are also interested in:

- **Exploration of PQ proving schemes:** With the limited acceleration achievable from pairing-based proving schemes, we're motivated to explore PQ-safe proving schemes that have strong adoption potential over the next 3–5 years. These schemes, such as lattice-based proofs, involve extensive linear algebra operations that can benefit from GPUs' parallel computing capabilities.
- **Crypto Math Library for GPU:** Develop comprehensive libraries for cryptographic computations across multiple GPU frameworks, including Metal, Vulkan, and WebGPU, to expand the project's overall scope and impact.

## Conclusion

Metal MSM v2 represents a leap forward in accelerating Multi-Scalar Multiplication on Apple GPUs. By addressing the limitations of v1 through sparse matrix techniques, dynamic thread management, and other novel optimization techniques, it achieves substantial performance gains for Apple M-series chips and iPhones.

However, two challenges remain:
- First, GPUs excel primarily with large input sizes (typically around 2^26 or larger). Most mobile proving scenarios use smaller circuit sizes, generally ranging from 2^16 to 2^20, which limits the GPU's ability to fully leverage its parallelism. Therefore, optimizing GPU performance for these smaller workloads remains a key area for improvement.
- Second, mobile GPUs inherently possess fewer cores and comparatively lower processing power than their desktop counterparts, constraining achievable performance. This hardware limitation necessitates further research into hybrid approaches and optimization techniques to maximize memory efficiency and power efficiency within the constraints of mobile devices.

Addressing these challenges will require ongoing algorithmic breakthroughs, hardware optimizations, and seamless CPU–GPU integration. Collectively, these efforts pave a clear path for future research and practical advancements that enable the mass adoption of privacy-preserving applications.

## Get Involved
We welcome researchers and developers interested in GPU acceleration, cryptographic computations, or programmable cryptography to join our efforts:
- [GPU Exploration Repository](https://github.com/zkmopro/gpu-acceleration/tree/v0.2.0) (latest version includes Metal MSM v2)
- [Mopro](https://github.com/zkmopro/mopro) (Mobile Proving)

For further inquiries or collaborations, feel free to reach out through the project's GitHub discussions or directly via our [Mopro community on Telegram](https://t.me/zkmopro).

## Special Thanks
We extend our sincere gratitude to [Yaroslav Yashin](https://x.com/yaroslav_ya), Artem Grigor, and [Wei Jie Koh](https://x.com/weijie_eth) for reviewing this post and for their valuable contributions that made it all possible.

[^1]: Bootle, J., & Chiesa, A., & Hu, Y. (2022). "Gemini: elastic SNARKs for diverse environments." IACR Cryptology ePrint Archive, 2022/1400: https://eprint.iacr.org/2022/1400

[^2]: Lu, Y., Wang, L., Yang, P., Jiang, W., Ma, Z. (2023). "cuZK: Accelerating Zero-Knowledge Proof with A Faster Parallel Multi-Scalar Multiplication Algorithm on GPUs." IACR Cryptology ePrint Archive, 2022/1321: https://eprint.iacr.org/2022/1321

[^3]: Wang, H., Liu, W., Hou, K., Feng, W. (2016). "Parallel Transposition of Sparse Data Structures." Proceedings of the 2016 International Conference on Supercomputing (ICS '16): https://synergy.cs.vt.edu/pubs/papers/wang-transposition-ics16.pdf
